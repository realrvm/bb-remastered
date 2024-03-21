import { MAX_LOAN_VALUE, MIN_LOAN_VALUE } from "@/shared/lib/constants";
import { Months } from "@/shared/lib/types";

type Step = { amounts: number };

type GetMap = {
  help_text: string;
  value: number;
};

const pow = Math.pow.bind(Math);

export function calcLoanCredit(percent: number): string {
  const step: Step = { amounts: (MAX_LOAN_VALUE / 100) * percent };

  const { amounts } = new Proxy(step, {
    get(target: Step, prop: keyof Step) {
      if (target[prop] < MIN_LOAN_VALUE) {
        return getWithSpaces(MIN_LOAN_VALUE);
      } else if (target[prop] > MAX_LOAN_VALUE) {
        return getWithSpaces(MAX_LOAN_VALUE);
      } else return getWithSpaces(target[prop]);
    },
  });

  return amounts.toString();
}

export function getOnlyDigits(sum: string): string {
  return sum.replace(/\D/g, "");
}

export function getWithSpaces(num: number): string {
  return num.toLocaleString().replace(/[,. ]/g, " ");
}

export function calcMonthlyPayment(sum: string, period: Months, rate = 18) {
  const amount = getOnlyDigits(sum);

  const term = Number(period);

  const monthlyRate = rate / 12 / 100;

  const annuityCoefficient =
    (monthlyRate * pow(1 + monthlyRate, term)) /
    (pow(1 + monthlyRate, term) - 1);

  return (Number(amount) * annuityCoefficient).toFixed();
}

function getMap(data: GetMap[]) {
  return data.reduce((prev, next) => {
    const { help_text, value } = next;

    return { ...prev, [value]: help_text };
  }, {});
}

export function getHelpText(val: number, data: GetMap[]): string {
  if (!val) return "initial";

  const obj: Record<number | string, string> = getMap(data);

  const points: number[] = Object.keys(obj)
    .map(Number)
    .sort((a, b) => a - b)
    .reduceRight((acc, point, i, arr) => {
      if (val <= point) {
        acc.push(point);
        return acc;
      }
      if (i === arr.length - 1) {
        acc.push(arr[i + 1]);
      }
      return acc;
    }, [] as number[]);

  if (points.length === 0) return "low";

  return obj[points[points.length - 1]];
}

export function calcPercents(sum: string, price: string): number {
  if (!sum) return 0;
  const amount = getOnlyDigits(price);

  const approvalPercents = (Number(amount) / Number(sum || "1")) * 100;

  return approvalPercents < 100 ? approvalPercents : 100;
}

export function getProbabilityOfApprovalColor(approval: string): string {
  switch (approval) {
    case "very high":
    case "очень высокая":
    case "high":
    case "высокая":
      return "text-special-green";
    case "average":
    case "средняя":
      return "text-special-orange";
    case "initial":
      return "text-text-gray";
    default:
      return "text-special-red";
  }
}

export function getProbabilityOfApproval(approval: string): string {
  switch (approval) {
    case "very high":
    case "очень высокая":
      return "Очень высокая";
    case "high":
    case "высокая":
      return "Высокая";
    case "average":
    case "средняя":
      return "Средняя";
    default:
      return "Низкая";
  }
}
