export type CardsValue = "borrower" | "auto" | "docs";

export type Btn = Record<CardsValue, string>;

const borrower = [
  { content: "Собственник автомобиля" },
  { content: "Возраст от 18 до 55 лет" },
  { content: "С любой кредитной историей" },
];

const auto = [
  { content: "Машина в исправном состоянии" },
  { content: "Не имеет ограничений" },
  { content: "Старше 2000г." },
];

const docs = [
  { content: "Паспорт" },
  { content: "ПТС" },
  { content: "Банковская карта" },
];

export const preconditions_captions = [
  { borrower: "Для заемщика" } as Btn,
  { auto: "Для автомобиля" } as Btn,
  { docs: "Для документов" } as Btn,
];

export const preconditions_cards = { borrower, auto, docs };
