
import { SetPinCodeAction } from '../actions/pinActions';
import { Reducer } from 'redux'

export interface PinState {
    userSetPinCode: number|null;
}

const initialState: PinState = {
    userSetPinCode: null
};

export const pinReducer:Reducer<PinState,SetPinCodeAction> = (state = initialState, action) => {
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