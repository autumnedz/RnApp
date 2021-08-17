

interface SingInAction {
    type: 'SIGN_IN';
    token: string;
}
interface SetPinCodeAction {
    type: 'SET_PINCODE';
}
interface CheckCredentialsAction {
    type: 'CHECK_CREDENTIALS';
    result: boolean;
}

export type AuthAction = SingInAction | CheckCredentialsAction | SetPinCodeAction


export const signIn = (userToken: string) =>({
    type: 'SIGN_IN',
    token: userToken
})

export const setPinCode = () =>({
    type: 'SET_PINCODE',
})

export const checkCredentials = (foundCredentials: boolean) =>({
    type: 'CHECK_CREDENTIALS',
    result: foundCredentials
})

