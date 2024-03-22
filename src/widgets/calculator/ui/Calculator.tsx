import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  memo,
  useCallback,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import RangeSlider from "react-range-slider-input";

import { Button } from "@/shared/ui/button";
import { Months } from "@/shared/lib/types";
import { cn } from "@/shared/lib/cn";

import { terms } from "@/shared/lib/variables/common";
import {
  calcLoanCredit,
  calcMonthlyPayment,
  getOnlyDigits,
  getProbabilityOfApproval,
  getProbabilityOfApprovalColor,
  getWithSpaces,
} from "../lib/utils";
import { useHelpText, useLoanCalculator } from "../lib/hooks";

import { useActionCreators } from "@/app/providers/rtk";
import { loanActions } from "@/entities/loan";

import "react-range-slider-input/dist/style.css";

export const Calculator: FC = () => {
  const [rangeValue, setRangeValue] = useState(1);
  const [marketPrice, setMarketPrice] = useState("");
  const [activeTerm, setActiveTerm] = useState<Months>(terms[0]);
  const navigate = useNavigate();

  const loanAction = useActionCreators(loanActions);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const value = calcLoanCredit(rangeValue);

    const funding = Number(getOnlyDigits(value));

    loanAction.setLoan({ term: activeTerm, funding });
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="mb-6">
        <p className="mb-2">Сумма кредита</p>
        <div className="py-4 px-5 rounded-lg flex items-center justify-between border border-border-gray heading-5">
          <span>{calcLoanCredit(rangeValue)}</span>
          <span>₽</span>
        </div>
        <div className="mx-auto w-[90%] -translate-y-0.5">
          <CalculatorRangeSlider setRangeValue={setRangeValue} />
        </div>
      </div>
      <div className="mb-6">
        <p className="mb-2">Срок займа, месяцев</p>
        <div className="p-0.5 rounded-lg border border-border-gray">
          <CalculatorMonthsList
            activeTerm={activeTerm}
            setActiveTerm={setActiveTerm}
          />
        </div>
      </div>
      <div className="mb-6">
        <p className="mb-2">Рыночная стоимость авто</p>
        <div>
          <CalculatorMarketPrice
            marketPrice={marketPrice}
            setMarketPrice={setMarketPrice}
          />
        </div>
      </div>
      <div className="mb-9 border border-border-gray rounded-lg grid grid-cols-1 md:grid-cols-2">
        <div className="py-3 px-4 flex flex-col border-b border-b-border-gray md:border-r md:border-r-border-gray md:border-b-0">
          <CalculatorMonthlyPayment
            rangeValue={rangeValue}
            activeTerm={activeTerm}
          />
        </div>
        <div className="py-3 px-4 flex flex-col">
          <CalculatorResolve
            rangeValue={rangeValue}
            marketPrice={marketPrice}
          />
        </div>
      </div>
      <Button onClick={() => navigate("auth/loan")}>Получить деньги</Button>
    </form>
  );
};

const CalculatorRangeSlider: FC<{
  setRangeValue: (val: number) => void;
}> = memo(({ setRangeValue }) => {
  return (
    <RangeSlider
      className="bb__range-slider"
      min={5}
      max={100}
      defaultValue={[0, 0]}
      thumbsDisabled={[true, false]}
      rangeSlideDisabled={true}
      onInput={(val: number[]) => setRangeValue(val[1])}
    />
  );
});

const CalculatorMonthsList: FC<{
  activeTerm: Months;
  setActiveTerm: (val: Months) => void;
}> = memo(({ activeTerm, setActiveTerm }) => {
  return (
    <ul className="flex gap-x-1 justify-between">
      {terms.map((term) => (
        <li key={term} className="flex-1">
          <button
            className={cn(
              "w-full px-4 py-3",
              activeTerm === term ? "btn-selected" : "btn-clean",
            )}
            onClick={() => setActiveTerm(term)}
          >
            {term}
          </button>
        </li>
      ))}
    </ul>
  );
});

const CalculatorMarketPrice: FC<{
  marketPrice: string;
  setMarketPrice: (val: string) => void;
}> = memo(({ marketPrice, setMarketPrice }) => {
  const handleMarketPrice: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const target = e.target;
      const onlyDigits = getOnlyDigits(target.value);

      const withSpaces = getWithSpaces(Number(onlyDigits));

      setMarketPrice(withSpaces);
    },
    [setMarketPrice],
  );

  return (
    <div className="relative after:content-[url('/rouble.svg')] after:absolute after:top-[13px] after:right-[15px]">
      <input
        className="inline-block w-full h-12 py-2 pr-10 pl-3 border border-border-gray rounded-lg mb-2 placeholder:text-gray hover:border-common-brand focus:border-common-brand outline-none"
        type="text"
        value={marketPrice}
        inputMode="numeric"
        onChange={handleMarketPrice}
        maxLength={12}
        placeholder="Рыночная стоимость"
      />
      <p className="text-small">
        Введите рыночную стоимость авто по вашему мнению
      </p>
    </div>
  );
});

const CalculatorMonthlyPayment: FC<{
  rangeValue: number;
  activeTerm: Months;
}> = memo(({ rangeValue, activeTerm }) => {
  const { rate } = useLoanCalculator();

  return (
    <>
      <span className="text-small whitespace-nowrap">Ежемесячный платёж</span>
      <span className="heading-4 whitespace-nowrap">
        {calcMonthlyPayment(calcLoanCredit(rangeValue), activeTerm, rate)} ₽
      </span>
    </>
  );
});

const CalculatorResolve: FC<{ rangeValue: number; marketPrice: string }> = memo(
  ({ rangeValue, marketPrice }) => {
    const { helpText } = useHelpText(rangeValue, marketPrice);

    return (
      <>
        <span className="text-small whitespace-nowrap">
          Вероятность одобрения
        </span>
        <span
          className={cn(
            "heading-4 whitespace-nowrap",
            getProbabilityOfApprovalColor(helpText),
          )}
        >
          {helpText === "initial" ? "—" : getProbabilityOfApproval(helpText)}
        </span>
      </>
    );
  },
);
