import { makeStore } from '../store/makeStore';

interface IInitialState<T, U> {
  nfts: T;
  nftError: U;
}

const nftInitailState: IInitialState<any, any> = {
  nfts: [],
  nftError: null,
};

const nftReducer = async (state: any, action: any) => {
  switch (action.type) {
    case actions.LOADEDE_NFT_SUCCESS:
      return {
        ...state,
        nfts: action.payload,
      };
    case actions.LOADED_NFT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case actions.CLEAR_NFT_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const { Provider, useStore, useDispatch } = makeStore(
  'NFTStore',
  nftInitailState,
  nftReducer,
);

export const actions = {
  LOADEDE_NFT_SUCCESS: 'LOADEDE_NFT_SUCCESS',
  LOADED_NFT_ERROR: 'LOADED_NFT_ERROR',
  CLEAR_NFT_ERROR: 'CLEAR_NFT_ERROR',
};
