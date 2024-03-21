import { useEffect, useState } from "react";

import {
  useGetConfigApprovalProb,
  useGetConfigRate,
} from "../../model/api/configApi";
import { calcLoanCredit, calcPercents, getHelpText } from "../utils";

export function useLoanCalculator() {
  const { data: rate } = useGetConfigRate(
    { count: 5 },
    { refetchOnMountOrArgChange: true },
  );
  const { data: approvalProb } = useGetConfigApprovalProb();

  return { rate, approvalProb };
}

export function useHelpText(rangeValue: number, marketPrice: string) {
  const [helpText, setHelpText] = useState("initial");

  const { approvalProb } = useLoanCalculator();

  useEffect(() => {
    const marketPriceWithoutSpaces = marketPrice.replace(/\s/g, "");

    const percents = calcPercents(
      marketPriceWithoutSpaces,
      calcLoanCredit(rangeValue),
    );

    const text = getHelpText(percents, approvalProb || []);
    setHelpText(text);
  }, [marketPrice, rangeValue, approvalProb]);

  return { helpText };
}
