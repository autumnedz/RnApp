
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput} from 'react-native';
import { Overlay } from 'react-native-elements';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/configureStore';
import { ScreenName } from '../rootModule';
import * as Keychain from 'react-native-keychain';
import { setPinCode } from '../store/actions/AuthActions';
import { Alert } from 'react-native';


// todo: figure out biometrics!!

interface Prop{
    navigation: any // this is not nice but cba 
}

export const SetupAuthPage = ({navigation}: Prop) => {
    const [visible, setVisible] = useState(true); // changes visibility of the new pin overlay
    const [newPinCode, setNewPinCode] = useState('') // current value enterd in the textinput for the new pin
    const [useBiometrics, setUseBiometrics] = useState(true)
    const dispatch = useDispatch()

    const toggleOverlay = () => {
        setVisible(!visible);
    }
    const onNewPinTextChange = (inputValue: string) => {
        setNewPinCode(inputValue)
    }
    const checkForBiometrics = async () => {
        const biometryType = await Keychain.getSupportedBiometryType()

        if(biometryType !== null){
            Alert.alert(
                'Biometrics available',
                `${biometryType} is available on your device.\n Do you want to use it as your primary authenttification method?`,
                [
                    {
                        text: 'Confirm',
                        onPress: () => {setUseBiometrics(true)}
                    },
                    {
                        text: 'Decline',
                        onPress: () => {setUseBiometrics(false)}
                    },

                ]
            )
        }
    }
    //lets user set up a new pincode
    const submitNewPinCode = async () => {
        if (isNaN(parseInt(newPinCode))) return // TODO: handle nan case
        // dispatch(
        //     setPinCode(parseInt(newPinCode))
        // )
        setNewPinCode('')
        toggleOverlay()
        
        if (useBiometrics){
            // used to authentificate with biometrics
            await Keychain.setGenericPassword('user', newPinCode,{
            service: 'biometric',
            accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
            accessible:  Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
            })
        }

        // a workaround to allow for a fallback to pincoed in case biometric fail
        await Keychain.setGenericPassword('user', newPinCode,{
            service: 'pincode',
            accessControl: Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD,
            accessible:  Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY
        });
        
        dispatch(
            setPinCode()
        )
        //navigation.replace(ScreenName.LogIn) // when using replace instead of navigate we prevent user going back in the navigation route
    }

    useEffect(() => {
        checkForBiometrics()
    }, [])

  return (
    <Overlay isVisible={visible}>
        <Text style={styles.text}>Set your new pincode :</Text>
        <TextInput 
        value={newPinCode} 
        onChangeText={onNewPinTextChange} 
        onSubmitEditing={submitNewPinCode} 
        placeholder='Pin Code' 
        keyboardType="numeric" 
        style={styles.input} 
        secureTextEntry={true} 
        maxLength={4}
        autoFocus = {true}
        />
        <View style={{marginTop: 20}}>
            <TouchableHighlight  onPress={submitNewPinCode}>
                <View style={styles.buttonStyle}>
                    <Text style={{fontSize: 20}}>Set Pin</Text>
                </View>
            </TouchableHighlight>
        </View>
</Overlay>
  )
}

const styles = StyleSheet.create({
    heading:{
        flex: 1,
     fontWeight: 'bold',
     fontSize: 50,
     
    },    
    text:{
        marginHorizontal: 10,
        fontSize: 20,
     
    },
    container: {
     justifyContent: 'flex-start',
     alignItems: 'center',
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
        borderWidth: 0,
        padding: 10,
        textAlign: 'center'
      },
  });