import { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";

import { createReduxStore } from "../config/root";
import { Schema } from "../config/schema";

type StoreProviderProps = {
  initialState?: Schema;
};

export const StoreProvider: FC<PropsWithChildren<StoreProviderProps>> = ({
  children,
  initialState,
}) => {
  const store = createReduxStore(initialState);

  return <Provider store={store}>{children}</Provider>;
};
