import { FC } from "react";
import RangeSlider from "react-range-slider-input";

import { Button } from "@/shared/ui/button";

import "react-range-slider-input/dist/style.css";
import { Months } from "@/shared/lib/types";
import { cn } from "@/shared/lib/cn";
import { terms } from "@/shared/lib/variables/common";

export const Calculator: FC = () => {
  return (
    <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
      <div className="mb-6">
        <p className="mb-2">Сумма кредита</p>
        <div className="py-4 px-5 rounded-lg flex items-center justify-between border border-border-gray heading-5">
          <span>1111111</span>
          <span>₽</span>
        </div>
        <div className="mx-auto w-[90%] -translate-y-0.5">
          <CalculatorRangeSlider setRangeValue={() => {}} />
        </div>
      </div>
      <div className="mb-6">
        <p className="mb-2">Срок займа, месяцев</p>
        <div className="p-0.5 rounded-lg border border-border-gray">
          <CalculatorMonthsList />
        </div>
      </div>
      <div className="mb-6">
        <p className="mb-2">Рыночная стоимость авто</p>
        <div>
          <CalculatorMarketPrice />
        </div>
      </div>
      <div className="mb-9 border border-border-gray rounded-lg grid grid-cols-1 md:grid-cols-2">
        <div className="py-3 px-4 flex flex-col border-b border-b-border-gray md:border-r md:border-r-border-gray md:border-b-0">
          <CalculatorMonthlyPayment />
        </div>
        <div className="py-3 px-4 flex flex-col">
          <CalculatorResolve />
        </div>
      </div>
      <Button>Получить деньги</Button>
    </form>
  );
};

const CalculatorRangeSlider: FC<{
  setRangeValue: (val: number) => void;
}> = ({ setRangeValue }) => {
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
};

const CalculatorMonthsList: FC<{ activeTerm?: Months }> = ({
  activeTerm = "24",
}) => {
  return (
    <ul className="flex gap-x-1 justify-between">
      {terms.map((term) => (
        <li key={term} className="flex-1">
          <button
            className={cn(
              "w-full px-4 py-3",
              activeTerm === term ? "btn-selected" : "btn-clean",
            )}
          >
            {term}
          </button>
        </li>
      ))}
    </ul>
  );
};

const CalculatorMarketPrice: FC = () => {
  return (
    <div className="relative after:content-[url('/rouble.svg')] after:absolute after:top-[13px] after:right-[15px]">
      <input
        className="inline-block w-full h-12 py-2 pr-10 pl-3 border border-border-gray rounded-lg ouline-none mb-2 placeholder:text-gray hover:border-brand-hover focus:border-common-brand"
        type="text"
        value={111}
        inputMode="numeric"
        onChange={() => {}}
        maxLength={12}
        placeholder="Рыночная стоимость"
      />
      <p className="text-small">
        Введите рыночную стоимость авто по вашему мнению
      </p>
    </div>
  );
};

const CalculatorMonthlyPayment: FC = () => {
  return (
    <>
      <span className="text-small whitespace-nowrap">Ежемесячный платёж</span>
      <span className="heading-4 whitespace-nowrap">{"2222"} ₽</span>
    </>
  );
};

const CalculatorResolve: FC = () => {
  return (
    <>
      <span className="text-small whitespace-nowrap">
        Вероятность одобрения
      </span>
      <span className="heading-4 whitespace-nowrap">Низкая</span>
    </>
  );
};
