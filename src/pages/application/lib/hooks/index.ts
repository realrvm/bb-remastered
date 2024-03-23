import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ApplicationPages, Months } from "@/shared/lib/types";
import { calcLoanCredit, getOnlyDigits } from "@/widgets/calculator/lib/utils";
import { useActionCreators } from "@/app/providers/rtk";
import { loanActions } from "@/entities/loan";
import { POLLING_INTERVAL } from "@/shared/lib/constants";
import { ReportsRetrieveSchema } from "../../model/types";
import {
  useGetRetrievedReport,
  useInitiateReport,
} from "../../model/api/reportsApi";
import { isPlateTheRequiredLength } from "../utils";
import { useCreateModel, useGetPresign } from "../../model/api/vehiclesApi";

export function useLocationIndex() {
  const pages: ApplicationPages[] = ["calculator", "vehicle", "docs"];

  const location = useLocation();

  const path = location.pathname.split("/").pop();

  const locationIndex = pages.findIndex((el) => el === path) + 1;

  return { locationIndex };
}

export function useApplicationCalculator(
  rangeValue: number,
  activeTerm: Months,
) {
  const navigate = useNavigate();
  const loanAction = useActionCreators(loanActions);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const value = calcLoanCredit(rangeValue);

    const funding = Number(getOnlyDigits(value));

    loanAction.setLoan({ term: activeTerm, funding });

    navigate("/application/vehicle");
  };

  return { handleSubmit };
}

export function useGetAutoData(plate: string, region: string) {
  const [pollingInterval, setPollingInterval] = useState(POLLING_INTERVAL);
  const [autoData, setAutoData] = useState<ReportsRetrieveSchema | undefined>();

  const [
    initiateReport,
    {
      data,
      isFetching: isFetchingInitiateReport,
      isSuccess: isSuccessInitiateReport,
    },
  ] = useInitiateReport();

  const [
    getRetrievedReport,
    {
      data: dataAuto,
      isFetching: isFetchingRetrievedReport,
      isSuccess: isSuccessRetrievedReport,
    },
  ] = useGetRetrievedReport({ pollingInterval });

  useEffect(() => {
    async function fetchAutoData() {
      if (isSuccessInitiateReport && data?.uid) {
        const res = await getRetrievedReport({ id: data?.uid || "" }).unwrap();
        setAutoData(res);
      }
    }

    fetchAutoData();
  }, [data?.uid, isSuccessInitiateReport, getRetrievedReport]);

  useEffect(() => {
    isSuccessRetrievedReport && setPollingInterval(0);
  }, [dataAuto?.uid, isSuccessRetrievedReport]);

  const handleInitiateReport = () => {
    !!pollingInterval && setPollingInterval(POLLING_INTERVAL);

    isPlateTheRequiredLength(plate, region) &&
      initiateReport({ plate: plate + region });
  };

  return {
    handleInitiateReport,
    autoData,
    isFetchingInitiateReport,
    isFetchingRetrievedReport,
  };
}

const usePresign = () => {
  const [, { data: vehicleUid }] = useCreateModel({
    fixedCacheKey: "shared-create-model-post",
  });
  const [getPresign] = useGetPresign();

  function upload(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      retrieveNewURL(file, (file: File, url: string) => {
        uploadFile(file, url);
      });
    }
  }

  async function retrieveNewURL(
    file: File,
    cb: (file: File, url: string) => void,
  ) {
    try {
      if (vehicleUid) {
        const res = await getPresign({
          uid: vehicleUid.id.toString(),
          file_name: file.name,
        }).unwrap();

        if (res) cb(file, res.url);
      }
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }

  async function uploadFile(file: File, url: string) {
    try {
      await fetch(url, { method: "PUT", body: file });
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }

  return { upload };
};

export const usePreviewImage = () => {
  const [previewImage, setPreviewImage] = useState<
    string | ArrayBuffer | null
  >();

  const { upload } = usePresign();

  const handleSelectImage: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const targetFiles = e.target.files;
      const file = targetFiles && targetFiles[0];

      const fileReader = new FileReader();

      fileReader.addEventListener("load", () => {
        setPreviewImage(fileReader.result);
        if (targetFiles) upload(targetFiles);
      });

      if (file) fileReader.readAsDataURL(file);
    },
    [upload],
  );

  return { previewImage, handleSelectImage };
};
