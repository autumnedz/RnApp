import React from 'react';
import { useEffect } from "react";
import { View, Text } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";
import { ScreenName } from "../rootModule";

interface Prop{
    navigation: any // this is not nice but cba 
}
export const SplashScreen = ({navigation}: Prop) => {
    useEffect(() => {
        ReactNativeBiometrics.biometricKeysExist()
        .then((resultObject) => {
            const { keysExist } = resultObject
    
            if (keysExist) {
            console.log('Keys exist')
            //setStartScreen(ScreenName.Login)
            navigation.navigate(ScreenName.Login)
            } else {
            console.log('Keys do not exist or were deleted')
            //setStartScreen(ScreenName.SetupAuth)
            navigation.navigate(ScreenName.SetupAuth)
            }
        })
      }, )

    return(
        <View >
            <Text> Loading ...  </Text>
        </View>
    )

};