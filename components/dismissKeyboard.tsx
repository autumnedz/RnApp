import React from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
interface Prop{
    children: any;
}

export const DismissKeyboard = ({children}:Prop) => {
    return(
        <TouchableWithoutFeedback onPress ={() => { Keyboard.dismiss() }}>
            {children}
        </TouchableWithoutFeedback>
    )
}