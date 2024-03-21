import { FC } from "react";

import { cn } from "@/shared/lib/cn";
import { useWindowWidth } from "@/shared/lib/hooks/useWindowWidth";
import { DESKTOP_WIDTH, NOTEBOOK_WIDTH } from "@/shared/lib/constants";
import { main_proposals } from "@/shared/lib/variables/main/main-intro";
import { Calculator } from "@/widgets/calculator";

import styles from "./styles.module.css";

export const MainIntro: FC = () => {
  const { width } = useWindowWidth();

  return (
    <section className="pt-0 px-0 pb-[1.75rem] mt-20 md:pt-[4.5rem] md:pb-10 md:mt-0 lg:pb-[4.5rem] bg-brand-light ">
      <div className="md:container md:max-w-7xl h-full">
        <div className="flex justify-between gap-5">
          <div
            className={cn(
              "flex flex-col flex-1 min-h-[10.25rem] md:min-h-[37rem]",
              styles["intro"],
            )}
          >
            <h1 className="w-1/2 md:w-auto mt-[1.75rem] text-3xl mb-3 font-bold md:heading-1 md:mt-0">
              Займы под залог ПТС
            </h1>
            <p className="mb-5 text-small md:mb-[8.375rem] md:text-medium">
              Выдаём деньги онлайн, на любые цели:
              <br />
              быстро, без комиссий и страховок
            </p>
            {width > DESKTOP_WIDTH ? <MainIntroFooter /> : null}
          </div>
          {width > NOTEBOOK_WIDTH ? (
            <div
              className={cn(
                "basis-[32rem] py-5 px-[1.75rem] md:p-9 rounded-xl bg-common-white",
                styles["calculator-wrapper"],
              )}
            >
              <Calculator />
            </div>
          ) : null}
        </div>
        {width < NOTEBOOK_WIDTH ? (
          <div
            className={cn(
              "basis-[32rem] py-5 px-[1.75rem] md:p-9 rounded-xl bg-common-white",
              styles["calculator-wrapper"],
            )}
          >
            <Calculator />
          </div>
        ) : null}
        {width < DESKTOP_WIDTH ? (
          <div className="flex justify-center">
            <MainIntroFooter className="gap-2 md:gap-10" />
          </div>
        ) : null}
      </div>
    </section>
  );
};

const MainIntroFooter: FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={cn(styles["intro-footer"], className)}>
      {main_proposals.map(({ dd, dt }) => (
        <dl key={dt}>
          <dt className="heading-5 md:heading-4 text-common-brand">{dt}</dt>
          <dd className="text-small md:text-medium md:whitespace-nowrap">
            {dd}
          </dd>
        </dl>
      ))}
    </div>
  );
};
