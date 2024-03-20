import { FC, PropsWithChildren, useRef, useState } from "react";

import {
  CardsValue,
  preconditions_captions,
  preconditions_cards,
} from "@/shared/lib/variables/main/main-preconditions";
import { Container } from "@/widgets/container";
import { useSwipe } from "@/shared/lib/hooks/useSwipe";

export const MainPreconditions: FC = () => {
  const [cardsValue, setCardsValue] = useState<CardsValue>("borrower");

  const refPreconditions = useRef<HTMLDivElement | null>(null);
  useSwipe(refPreconditions);

  return (
    <section className="pt-14 pb-[1.75rem] md:pt-[5.5.rem] md:pb-11">
      <h2 className="heading-3 mb-3 text-center md:heading-title">Условия</h2>
      <div className="flex justify-center">
        <div
          className="max-md:w-screen max-md:cursor-grab max-md:grid max-md:grid-cols-1 max-md:overflow-x-auto max-md:overflow-y-hidden max-md:no-scrollbar"
          ref={refPreconditions}
        >
          <div className="place-items-center grid grid-cols-[auto_3.5rem] md:grid-cols-[auto]">
            <div className="max-md:translate-x-[1.75rem] rounded-lg p-0.5 border border-border-gray bg-bg-light-gray mb-6 grid grid-cols-[repeat(3,min-content)] max-w-[26.25rem]">
              <MainPreconditionsBtns
                cardsValue={cardsValue}
                setCardsValue={setCardsValue}
              />
            </div>
          </div>
        </div>
      </div>
      <Container>
        <div className="flex gap-2 justify-between self-stretch flex-wrap">
          <MainPreconditionsCards cardsValue={cardsValue} />
        </div>
      </Container>
    </section>
  );
};

const MainPreconditionsBtns: FC<{
  cardsValue: CardsValue;
  setCardsValue: (value: CardsValue) => void;
}> = ({ cardsValue, setCardsValue }) => {
  return (
    <>
      {preconditions_captions.map((caption) => {
        const [key, value] = Object.entries(caption)[0] as [CardsValue, string];

        return (
          <button
            key={key}
            onClick={() => setCardsValue(key)}
            className={key === cardsValue ? "btn-selected" : "btn-clean"}
          >
            {value}
          </button>
        );
      })}
    </>
  );
};

const MainPreconditionsCards: FC<{ cardsValue: CardsValue }> = ({
  cardsValue,
}) => {
  return (
    <>
      {preconditions_cards[cardsValue].map(({ content }) => (
        <MainPreconditionsCard key={content}>{content}</MainPreconditionsCard>
      ))}
    </>
  );
};

const MainPreconditionsCard: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="max-md:p-6 max-md:h-auto flex-1 grid place-items-center heading-5 rounded-lg border border-border-gray text-center h-[6.25rem] min-w-[300px]">
      {children}
    </div>
  );
};
