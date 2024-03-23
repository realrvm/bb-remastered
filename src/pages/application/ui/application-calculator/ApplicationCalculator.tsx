import { FC, useState } from "react";

import { Button } from "@/shared/ui/button";

import {
  CalculatorMonthsList,
  CalculatorRangeSlider,
} from "@/widgets/calculator";
import { Months } from "@/shared/lib/types";
import { terms } from "@/shared/lib/variables/common";
import {
  calcLoanCredit,
  calcMonthlyPayment,
} from "@/widgets/calculator/lib/utils";
import { useLoanCalculator } from "@/widgets/calculator/lib/hooks";
import { Application, ApplicationTitle } from "../Application";
import { useApplicationCalculator } from "../../lib/hooks";

import styles from "./styles.module.css";

const ApplicationCalculator: FC = () => {
  const [rangeValue, setRangeValue] = useState(1);
  const [activeTerm, setActiveTerm] = useState<Months>(terms[0]);

  const { handleSubmit } = useApplicationCalculator(rangeValue, activeTerm);

  return (
    <Application>
      <ApplicationTitle>Введите сумму займа</ApplicationTitle>
      <form className="flex flex-col md:pt-6" onSubmit={handleSubmit}>
        <div className="md:px-9">
          <div className="mb-6">
            <p className="mb-2">Сумма займа</p>
            <div className="flex items-center justify-between py-4 px-5 rounded-lg border border-border-gray heading-5">
              <span>{calcLoanCredit(rangeValue)}</span>
              <span>₽</span>
            </div>
            <div className="w-[90%] mx-auto -translate-y-[2px]">
              <CalculatorRangeSlider setRangeValue={setRangeValue} />
            </div>
          </div>
          <div className="mb-[38px]">
            <p className="mb-2">Срок займа, месяцев</p>
            <div className="p-0.5 border border-border-gray rounded-lg">
              <CalculatorMonthsList
                activeTerm={activeTerm}
                setActiveTerm={setActiveTerm}
              />
            </div>
          </div>
          <div className="flex gap-1 flex-col mb-9">
            <ApplicationObligatoryPayment
              rangeValue={rangeValue}
              activeTerm={activeTerm}
            />
          </div>
        </div>
        <div className="hidden md:block md:h-px bg-border-gray"></div>
        <div className="py-6 md:p-9 flex justify-end">
          <Button>Продолжить</Button>
        </div>
      </form>
    </Application>
  );
};

const ApplicationObligatoryPayment: FC<{
  rangeValue: number;
  activeTerm: Months;
}> = ({ rangeValue, activeTerm }) => {
  const { rate } = useLoanCalculator();

  return (
    <>
      <div className="flex gap-2">
        Обязательный платёж
        <div className={styles["obligatory-payment"]}>
          <span className={styles["obligatory-payment--icon"]}></span>
        </div>
      </div>
      <span className="heading-3">
        от {calcMonthlyPayment(calcLoanCredit(rangeValue), activeTerm, rate)} ₽
      </span>
    </>
  );
};

export default ApplicationCalculator;
