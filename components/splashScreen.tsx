import React from 'react';
import { useEffect } from "react";
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
            console.log('all services: '+ await Keychain.getAllGenericPasswordServices());
            
            dispatch( 
              checkCredentials(typeof credentials !== 'boolean')
            )
          } catch (error) {
            console.log("Keychain couldn't be accessed!", error);
          }
    }

    useEffect( () => {
        checkForCredentials()
    }, )

    return(
        < >
        </>
    )

};