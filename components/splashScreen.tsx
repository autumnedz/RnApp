import React from 'react';
import { useEffect } from "react";
import { View, Text } from "react-native";
import { ScreenName } from "../rootModule";
import * as Keychain from 'react-native-keychain';

interface Prop{
    navigation: any // this is not nice but cba 
}

/*
    This component serves as crossroads, it decides what is gonna be the starting screen shown to the user
*/

export const SplashScreen = ({navigation}: Prop) => {

    // check if credentials are set for this user, if yes go directly to login page, if not go to setu authentification page
    const checkForCredentials = async () => {
        try {
            // Retrieve the credentials
            const credentials = await Keychain.getGenericPassword();

            if (credentials) {
              console.log( 'Credentials successfully loaded for user ', credentials.username, 'the password is:', credentials.password);

              navigation.navigate(ScreenName.Login, { credentials: credentials })

            } else {
              console.log('No credentials stored');

              navigation.navigate(ScreenName.SetupAuth)              
            }
          } catch (error) {
            console.log("Keychain couldn't be accessed!", error);
          }
    }

    useEffect( () => {
        checkForCredentials()
    }, )

    return(
        <View >
            <Text> Loading ...  </Text>
        </View>
    )

};