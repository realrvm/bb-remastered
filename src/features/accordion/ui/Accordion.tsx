import { FC, memo, useCallback, useRef, useState } from "react";

import { AccordionType } from "@/shared/lib/variables/main/main-faq";
import { cn } from "@/shared/lib/cn";
import { MAX_ACCORDION_INDEX } from "@/shared/lib/constants";

type AccordionItemType = {
  accordionItem: number;
  handleToggle: (id: number) => void;
  faq: AccordionType;
  isLastChild: boolean;
};

export const Accordion: FC<{ faqs: AccordionType[] }> = ({ faqs }) => {
  const [accordionItem, handleToggle] = useAccordionToggle();

  return (
    <ul>
      {faqs.map((faq, index, arr) => {
        const { id } = faq;
        const isLastChild = index === arr.length - 1;

        return (
          <AccordionItem
            key={id}
            accordionItem={accordionItem}
            handleToggle={handleToggle}
            faq={faq}
            isLastChild={isLastChild}
          />
        );
      })}
    </ul>
  );
};

const AccordionItem: FC<AccordionItemType> = memo(
  ({ faq, accordionItem, handleToggle, isLastChild }) => {
    const { id, answer, question } = faq;
    const isActiveAccordionItem = id === accordionItem;

    const ref = useRef<HTMLDivElement | null>(null);

    return (
      <li
        onClick={() => handleToggle(id)}
        className={cn(
          "p-4 md:p-6 rounded-lg cursor-pointer border border-border-gray",
          { "mb-2": !isLastChild },
        )}
      >
        <div className="flex justify-between items-between">
          <span className="heading-5 md:heading-4">{question}</span>
          <AccordionChevrons isActiveAccordionItem={isActiveAccordionItem} />
        </div>
        <div
          className="h-0 overflow-hidden transition-height ease duration-200"
          ref={ref}
          style={
            isActiveAccordionItem
              ? { height: ref.current?.scrollHeight }
              : { height: "0px" }
          }
        >
          <div className="md:font-large pt-3">{answer}</div>
        </div>
      </li>
    );
  },
);

const AccordionChevrons: FC<{ isActiveAccordionItem: boolean }> = memo(
  ({ isActiveAccordionItem }) => {
    return (
      <>
        {!isActiveAccordionItem ? (
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
              fill="#969696"
            />
          </svg>
        ) : (
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.29289 0.292893C6.68342 -0.0976311 7.31658 -0.0976311 7.70711 0.292893L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L7 2.41421L1.70711 7.70711C1.31658 8.09763 0.683417 8.09763 0.292893 7.70711C-0.0976311 7.31658 -0.0976311 6.68342 0.292893 6.29289L6.29289 0.292893Z"
              fill="#969696"
            />
          </svg>
        )}
      </>
    );
  },
);

function useAccordionToggle() {
  const [accordionItem, setAccordionItem] = useState(MAX_ACCORDION_INDEX);

  const handleToggle = useCallback(
    (id: number) => {
      return accordionItem === id
        ? setAccordionItem(MAX_ACCORDION_INDEX)
        : setAccordionItem(id);
    },
    [accordionItem],
  );
  return [accordionItem, handleToggle] as const;
}
