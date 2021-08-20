import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput} from 'react-native';
import { Overlay } from 'react-native-elements';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/configureStore';
import { ScreenName } from '../rootModule';
import * as Keychain from 'react-native-keychain';
import { setAuth } from '../store/actions/AuthActions';

interface Prop{
    navigation: any // this is not nice but cba 
}


// ISSUES:  
// fingerprint doesnt prompt on setup
// i dont like how there is two different authentifications (pin and bimetric) storing the same secret
// face scan doesnt work on android

export const FingerprintSetupPage = ({navigation}: Prop) => {
    
    const dispatch = useDispatch()

    const onSkipPress = () => {
        dispatch(
            setAuth()
        )
    }

    const onSetFingerprintPress = async () => {

        const credentials = await Keychain.getGenericPassword({service:'pincode'});

        if(!credentials) return 
        await Keychain.setGenericPassword('user', credentials.password,{
            service: 'biometric',
            accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
            accessible:  Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
        })
        dispatch(
            setAuth()
        )


    }



    return(
        <View style={styles.container}>
            <Text style={styles.heading}>Use your fingerprint</Text>

            <View style={{ marginTop: 20 }}>
                <TouchableHighlight onPress={onSetFingerprintPress}>
                    <View style={styles.buttonStyle}>
                        <Text style={{ fontSize: 20 }}>Set fingerprint</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <View style={{ marginTop: 20 }}>
                <TouchableHighlight onPress={onSkipPress}>
                    <View style={styles.buttonStyle}>
                        <Text style={{ fontSize: 20 }}>Skip</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    heading:{
        marginHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 30,
     
    },    
    text:{
        marginHorizontal: 10,
        fontSize: 20,
     
    },
    container: {
        justifyContent: 'flex-start',
        
        flex: 1,
        padding: 10
 
    },
    buttonStyle: {
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#DDDDDD",
        padding: 15,
     
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textAlign: 'center'
      },
  });