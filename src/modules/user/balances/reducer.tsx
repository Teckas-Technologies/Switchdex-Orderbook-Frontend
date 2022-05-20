import { BalancesAction, AssetBalance } from "./actions";
import { BALANCES_DATA, BALANCES_ERROR, BALANCES_FETCH } from "./constants";

export interface BalancesState {
  error?: string;
  loading: boolean;
  success: boolean;
  balances: AssetBalance[];
}

const initialState: BalancesState = {
  loading: false,
  success: false,
  balances: [],
};

export const balancesReducer = (
  state = initialState,
  action: BalancesAction
): BalancesState => {
  switch (action.type) {
    case BALANCES_FETCH:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case BALANCES_DATA:
      return {
        ...state,
        balances: action.payload,
        loading: false,
        success: true,
      };
    case BALANCES_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };
    default:
      return state;
  }
};
