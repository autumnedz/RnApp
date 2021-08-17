
import { AuthAction } from '../actions/AuthActions';
import { Reducer } from 'redux'

export interface AuthState {
    userToken: string|null;
    isLoading: boolean;
    isAuthSet: boolean;
}

const initialState: AuthState = {
    userToken: null,
    isLoading: true,
    isAuthSet: false,
    
};

export const authReducer: Reducer<AuthState,AuthAction> = (state = initialState, action) => {
    switch(action.type) {
        case 'SIGN_IN':
            return {
            ...state,
            userToken: action.token
            };
        case 'CHECK_CREDENTIALS':
            return {
            ...state,
            isLoading: false,
            isAuthSet: action.result
            };
        case 'SET_PINCODE':
            return {
                ...state,
                isAuthSet: true
                };
        default:
            return state;
    }
}