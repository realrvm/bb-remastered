import { useRef, memo, FC, useEffect } from "react";

export const InputMask: FC<{ setCard: (card: string) => void }> = memo(
  ({ setCard }) => {
    const [inputCard, handleChange] = useInputMask(setCard);

    return (
      <div className="relative w-full md:w-auto">
        <span className="absolute top-[13px] left-3">+7</span>
        <input
          type="tel"
          ref={inputCard}
          onChange={handleChange}
          placeholder="(000) 000-00-00"
          className="w-full py-3 pr-3 pl-[38px] mb-6 rounded-lg outline-none border border-border-gray hover:border-brand-hover focus:hover-common-brand placholder:text-text-gray"
        />
      </div>
    );
  },
);

function useInputMask(setCard: (card: string) => void) {
  const inputCard = useRef<HTMLInputElement | null>(null);

  const handleChange = () => {
    const cardValue = inputCard.current?.value
      .replace(/\D/g, "")
      .match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    if (cardValue) {
      (inputCard.current as HTMLInputElement).value = !cardValue[2]
        ? cardValue[1]
        : `(${cardValue[1]}) ${cardValue[2]}${`${
            cardValue[3] ? `-${cardValue[3]}` : ""
          }`}${`${cardValue[4] ? `-${cardValue[4]}` : ""}`}`;
    }

    const numbers = inputCard.current?.value.replace(/(\D)/g, "") as string;

    setCard(numbers);
  };

  useEffect(() => {
    inputCard?.current?.focus();
  }, []);

  return [inputCard, handleChange] as const;
}
