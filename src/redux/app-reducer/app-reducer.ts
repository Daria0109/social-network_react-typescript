import {ThunkAction} from 'redux-thunk';
import {AppStateType} from '../redux-store'
import {getAuthUserDataTC} from '../auth-reducer/auth-reducer';

const INITIALIZED_SUCCESS = 'samurai-network/app/INITIALIZED-SUCCESS';

// A c t i o n  C r e a t o r s
export const setInitializedSuccess = () => ({type: INITIALIZED_SUCCESS} as const)
export type AppActionsType = ReturnType<typeof setInitializedSuccess>;

// T h u n k  C r e a t o r s
type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionsType>
export const initializeApp = (): ThunkType => {
  return async (dispatch) => {
    await dispatch(getAuthUserDataTC());
    dispatch(setInitializedSuccess())
  }
}

export type AppInitialStateType = {
  initialized: boolean
}

const initialState: AppInitialStateType = {
  initialized: false
}

const appReducer = (state = initialState, action: AppActionsType): AppInitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      };
    default:
      return state;
  }
}
export default appReducer;