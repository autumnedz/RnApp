

interface SingInAction {
    type: 'SIGN_IN';
    token: string;
}
interface SetAuthAction {
    type: 'SET_AUTH';
}
interface ResetAuthAction {
    type: 'RESET_AUTH';
}
interface CheckCredentialsAction {
    type: 'CHECK_CREDENTIALS';
    result: boolean;
}

export type AuthAction = SingInAction | CheckCredentialsAction | SetAuthAction | ResetAuthAction


export const signIn = (userToken: string) =>({
    type: 'SIGN_IN',
    token: userToken
})

export const setAuth = () =>({
    type: 'SET_AUTH',
})

export const resetAuth = () =>({
    type: 'RESET_AUTH',
})

export const checkCredentials = (foundCredentials: boolean) =>({
    type: 'CHECK_CREDENTIALS',
    result: foundCredentials
})

