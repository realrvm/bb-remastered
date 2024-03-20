import { FC, memo, useRef } from "react";

import { stages } from "@/shared/lib/variables/main/main-stages";
import { useSwipe } from "@/shared/lib/hooks/useSwipe";
import { cn } from "@/shared/lib/cn";

export const MainStages: FC = () => {
  const refStages = useRef<HTMLDivElement | null>(null);
  useSwipe(refStages);

  return (
    <section className="py-11 mx-auto max-w-7xl desktop:px-0 desktop:py-[1.75rem]">
      <h2 className="heading-3 md:heading-title text-left md:text-center mb-5 md:mb-6 ml-[1.75rem] md:ml-0">
        Как это работает
      </h2>
      <div
        ref={refStages}
        className="desktop:flex desktop:justify-center w-screen desktop:w-[auto] overflow-x-hidden overflow-y-hidden no-scrollbar grid grid-cols-1 justify-[unset]"
      >
        <div className="desktop:flex desktop:justify-center grid grid-cols-[auto_70px]">
          <div className="grid grid-cols-[repeat(4,minmax(280px,304px))] gap-2 translate-x-[30px] desktop:translate-x-0">
            <MainStagesList />
          </div>
        </div>
      </div>
    </section>
  );
};

const MainStagesList: FC = memo(() => {
  return (
    <>
      {stages.map(({ id, title, text }, index, arr) => (
        <div
          key={id}
          className={cn("p-5 md:p-6 rounded-lg bg-brand-light", {
            "mr-[1.85rem] desktop:mr-0": arr.length - 1 === index,
          })}
        >
          <div className="w-9 h-9 rounded-full grid place-items-center text-common-white bg-common-brand heading-5 mb-4">
            {id}
          </div>
          <div className={cn("heading-4 mb-2")}>{title}</div>
          <div>{text}</div>
        </div>
      ))}
    </>
  );
});
