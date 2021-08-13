
import { AuthAction } from '../actions/AuthActions';
import { Reducer } from 'redux'

export interface AuthState {
    userSetPinCode: number|null;
}

const initialState: AuthState = {
    userSetPinCode: null
};

export const pinReducer:Reducer<AuthState,AuthAction> = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_PINCODE':
            return {
            ...state,
            userSetPinCode:action.pinCode
            };
        default:
            return state;
    }
}