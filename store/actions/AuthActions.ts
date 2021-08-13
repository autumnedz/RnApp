

interface SetPinCodeAction {
    type: 'SET_PINCODE';
    pinCode: number;
}

export type AuthAction = SetPinCodeAction

export const setPinCode = (newPinCode: number) =>({
    type: 'SET_PINCODE',
    pinCode: newPinCode
})

