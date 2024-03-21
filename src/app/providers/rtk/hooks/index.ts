import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  ActionCreator,
  ActionCreatorsMapObject,
  AsyncThunk,
  bindActionCreators,
} from "@reduxjs/toolkit";

import type { AppDispatch, RootState } from "../types";

export const useAppDispatch = useDispatch<AppDispatch>;
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
  ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>;

type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
    ? BoundAsyncThunk<Actions[key]>
    : Actions[key];
};

export const useActionCreators = <
  Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject,
>(
  actions: Actions,
): BoundActions<Actions> => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch],
  );
};
