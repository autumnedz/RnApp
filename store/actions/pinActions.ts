

export interface SetPinCodeAction {
    type: 'SET_PINCODE';
    pinCode: number;
}

export const setPinCode = (newPinCode: number) =>({
    type: 'SET_PINCODE',
    pinCode: newPinCode
})

