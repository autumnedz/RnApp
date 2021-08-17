import React from 'react';
import { useEffect } from "react";
import { View, Text } from "react-native";
import { ScreenName } from "../rootModule";
import * as Keychain from 'react-native-keychain';
import { useDispatch } from 'react-redux';
import { checkCredentials } from '../store/actions/AuthActions';


export const SplashScreen = () => {
  const dispatch = useDispatch() 

    // check if credentials are set for this user, if yes go directly to login page, if not go to setu authentification page
    const checkForCredentials = async () => {
        try {
            // Retrieve the credentials
            const credentials = await Keychain.getGenericPassword({service: 'pincode'});
            console.log('Authetification is set: ', typeof credentials !== 'boolean');
            
            dispatch( 
              checkCredentials(typeof credentials !== 'boolean') 
            )
            // if (credentials) {
            //   console.log( 'Credentials successfully loaded for user ', credentials.username, 'the password is:', credentials.password);
              
            //   //navigation.replace(ScreenName.LogIn)

            // } else {
            //   console.log('No credentials stored');

            //   //navigation.replace(ScreenName.SetupAuth)              
            // }
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