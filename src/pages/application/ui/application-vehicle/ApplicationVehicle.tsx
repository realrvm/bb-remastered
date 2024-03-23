import { FC, FormEventHandler, PropsWithChildren, memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";

import { Application, ApplicationTitle } from "../Application";
import { Button } from "@/shared/ui/button";
import { InputMaskPlate } from "@/shared/ui/input-mask-plate";
import { InputMaskRegion } from "@/shared/ui/input-mask-region";

import { ButtonThemes } from "@/shared/lib/enums";

import { Loader } from "@/shared/ui/loader";
import { CORRECT_PLATE_LENGTH } from "@/shared/lib/constants";
import { useGetAutoData } from "../../lib/hooks";
import { cn } from "@/shared/lib/cn";

import styles from "./styles.module.css";

type ApplicationAutoCheckProps = {
  autoData?: {
    vin: string | null;
    manufacture_year: number;
    model: { name: string };
    make: { name: string };
    body: string;
  };
  setIsManualInput: (val: boolean) => void;
};

const ApplicationVehicle: FC = () => {
  const [plate, setPlate] = useState("");
  const [region, setRegion] = useState("");
  const [isManualInput, setIsManualInput] = useState(false);
  const navigate = useNavigate();

  const {
    handleInitiateReport,
    autoData,
    isFetchingRetrievedReport,
    isFetchingInitiateReport,
  } = useGetAutoData(plate, region);

  const isLoading = isFetchingInitiateReport || isFetchingRetrievedReport;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    navigate("/application/docs");
  };

  return (
    <Application>
      <ApplicationTitle>Введите данные залогового автомобиля</ApplicationTitle>
      <form className="flex flex-col md:mt-2" onSubmit={handleSubmit}>
        <div className="md:px-9">
          <p className="text-text-gray mb-6">
            Мы автоматически заполним данные
          </p>
          <div className="flex flex-col md:flex-row items-center gap-3 mb-9">
            <div className="w-full md:w-[272px] border border-border-gray rounded-lg grid grid-cols-[auto_76px] uppercase focus-within:border-common-brand">
              <InputMaskPlate
                onSetPlate={setPlate}
                className="rounded-lg w-full outline-none uppercase placeholder:uppercase placeholder:text-text-gray border-r border-r-border-gray p-3"
              />
              <div className="pl-3">
                <InputMaskRegion
                  onSetRegion={setRegion}
                  className="rounded-lg w-full border-0 outline-none uppercase placeholder:uppercase placeholder:text-text-gray pt-[5px]"
                  focus={plate.length === CORRECT_PLATE_LENGTH}
                />
                <div className={styles["flag"]}>RUS</div>
              </div>
            </div>
            <Button
              type="button"
              className="w-full md:w-auto btn-medium mt-4 md:mt-0"
              onClick={handleInitiateReport}
            >
              Определить авто
            </Button>
          </div>
          {isLoading ? (
            <Loader className="text-center" />
          ) : (
            <>
              {!isManualInput && autoData?.uid && (
                <ApplicationAutoCheck
                  setIsManualInput={setIsManualInput}
                  autoData={autoData}
                />
              )}
              {isManualInput && <ApplicationManualCheck />}
            </>
          )}
        </div>
        <div className="hidden md:block md:h-px bg-border-gray"></div>
        <div className="py-6 md:p-9 flex justify-between">
          <Button
            type="button"
            variant={ButtonThemes.SECONDARY}
            onClick={() => navigate(-1)}
          >
            Назад
          </Button>
          <Button>Продолжить</Button>
        </div>
      </form>
    </Application>
  );
};

const ApplicationCheckTitle: FC<PropsWithChildren<{ className?: string }>> =
  memo(({ className, children }) => {
    return (
      <div className={cn("mt-6 py-6 border-t border-t-border-gray", className)}>
        <h5 className="heading-5 mb-6">
          Это ваш авто? Проверьте корректность данных
        </h5>
        {children}
      </div>
    );
  });

const ApplicationAutoCheck: FC<ApplicationAutoCheckProps> = memo(
  ({ autoData, setIsManualInput }) => {
    const { make, model, manufacture_year, vin, body } = autoData || {};

    return (
      <>
        <ApplicationCheckTitle>
          <div className="grid grid-cols-2 gap-2">
            <dl>
              <dt className="mb-2">Марка авто</dt>
              <dd>{make?.name}</dd>
            </dl>
            <dl>
              <dt className="mb-2">Модель авто</dt>
              <dd>{model?.name}</dd>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-2 my-4 md:mb-6">
            <dl>
              <dt className="mb-2">Год выпуска</dt>
              <dd>{manufacture_year}</dd>
            </dl>
            <dl>
              <dt className="mb-2">Номер кузова/VIN</dt>
              <dd>{vin ?? body ?? "Не определено"}</dd>
            </dl>
          </div>
          <Button
            type="button"
            variant={ButtonThemes.SECONDARY}
            onClick={() => setIsManualInput(true)}
          >
            Это не моё авто
          </Button>
        </ApplicationCheckTitle>
      </>
    );
  },
);

const ApplicationManualCheck: FC = memo(() => {
  return (
    <>
      <ApplicationCheckTitle className="md:mb-9">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          <div className="flex flex-col gap-2">
            <label>Марка авто</label>
            <div className={styles.bb__applying_select_wrap}>
              <AsyncSelectBrand />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label>Модель авто</label>
            <div className={styles.bb__applying_select_wrap}>
              <AsyncSelectModel />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="id3">Год выпуска</label>
            <div>
              <input
                type="text"
                inputMode="numeric"
                id="id3"
                maxLength={4}
                className="w-full bg-common-white outline-none border border-border-gray py-2 px-3 rounded-lg focus:border-common-brand"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="id4">Номер кузова/VIN</label>
            <div>
              <input
                type="text"
                id="id4"
                className="w-full bg-common-white outline-none border border-border-gray py-2 px-3 rounded-lg focus:border-common-brand"
              />
            </div>
          </div>
        </div>
      </ApplicationCheckTitle>
    </>
  );
});

const AsyncSelectBrand = () => {
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={true}
      placeholder={false}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          border: "1px solid #e2e2e2",
          padding: "2px",
          borderRadius: "8px",
        }),
        indicatorSeparator: (baseStyles) => ({
          ...baseStyles,
          display: "none",
        }),
        noOptionsMessage: (baseStyles) => ({
          ...baseStyles,
          color: "#fff",
          height: 0,
          width: 0,
        }),
      }}
    />
  );
};

const AsyncSelectModel = () => {
  return (
    <AsyncSelect
      cacheOptions
      placeholder={false}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          border: "1px solid #e2e2e2",
          padding: "2px",
          borderRadius: "8px",
        }),
        indicatorSeparator: (baseStyles) => ({
          ...baseStyles,
          display: "none",
        }),
        noOptionsMessage: (baseStyles) => ({
          ...baseStyles,
          color: "#fff",
          height: 0,
          width: 0,
        }),
      }}
    />
  );
};

export default ApplicationVehicle;
