import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";

import { Application, ApplicationTitle } from "../Application";
import { Button } from "@/shared/ui/button";
import { ButtonThemes } from "@/shared/lib/enums";

import { cn } from "@/shared/lib/cn";

import { usePreviewImage } from "../../lib/hooks";

import styles from "./styles.module.css";

type Side = "back" | "side" | "front";

const autoView: Record<Side, string> = Object.freeze({
  back: "Сзади",
  side: "Сбоку",
  front: "Спереди",
});

const ApplicationDocs: FC = () => {
  const navigate = useNavigate();

  return (
    <Application>
      <ApplicationTitle>Прикрепите фотографии автомобиля</ApplicationTitle>
      <form
        className="flex flex-col md:pt-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="md:px-9 pb-9">
          <div className="flex flex-col gap-4">
            {Object.keys(autoView).map((key) => (
              <ApplicationDocsView key={key} view={key as Side} />
            ))}
          </div>
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
          <Button onClick={() => navigate("/application/review")}>
            Продолжить
          </Button>
        </div>
      </form>
    </Application>
  );
};

const ApplicationDocsView: FC<{ view: Side }> = memo(({ view }) => {
  const { previewImage, handleSelectImage } = usePreviewImage();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className={cn(styles["placeholder-img"], styles[view])}></span>
        <span className="heading-5">{autoView[view]}</span>
      </div>
      <div>
        {previewImage ? (
          <label className="relative inline-block">
            <span className={cn("heading-5", styles["file-input"])}>
              Прикрепить
            </span>
            <input
              type="file"
              name="file"
              onChange={handleSelectImage}
              accept="image/*"
              className="absolute -z-1 opacity-0 w-0 h-0"
            />
          </label>
        ) : (
          <div className="w-15 h-15 rounded-lg overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={previewImage as string}
              alt="uploaded image"
            />
          </div>
        )}
      </div>
    </div>
  );
});

export default ApplicationDocs;
