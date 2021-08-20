
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
import { Alert } from 'react-native';




interface Prop{
    navigation: any // this is not nice but cba 
}

export const PinSetupPage = ({navigation}: Prop) => {
    const [buttonText, setButtonText] = useState('Next')
    const [subtitleText, setSubtitleText] = useState('At first, set your 6-digit PIN')
    const [textInputValue, setTextInputValue] = useState('') 
    const [newPinValue, setNewPinValue] = useState('')
    const [isPinConfirmed, setIsPinConfirmed] = useState(false)

    const RequiredPinLength = 6

    const dispatch = useDispatch()


    const hasBiometrics = async () => {
        const result = await Keychain.getSupportedBiometryType()        
        return (result !== null)
    }

    const onButtonPress = () => {
        if(textInputValue.length !== RequiredPinLength){
            
            Alert.alert(
                'PIN too short!',
                `Your pin must be ${RequiredPinLength} digits`,
                [
                    { text: "OK", onPress: () => {setTextInputValue('')} }
                ]
            )
            return
        }
        if(!isPinConfirmed){
            if(newPinValue === ''){
                setNewPinValue(textInputValue)
                setTextInputValue('')
                setSubtitleText('Confirm your 6-digit PIN')
    
            }else{
                if(textInputValue === newPinValue){
                    setButtonText('Set the password')
                    setIsPinConfirmed(true)
    
                }else{ 
                    // could maybe go all the way back to the beginning in case first pin value was incorrect
                    Alert.alert( 
                        'PINs do not match!',
                        '',
                        [
                            { text: "Try Again", onPress: () => {setTextInputValue('')} }
                        ]
                    )
                    return
                }
            }
        }else{
            submitNewPin()
        }
        
    }

    //lets user set up a new pincode
    const submitNewPin = async () => {
        
        // keychain storage for pincode
        await Keychain.setGenericPassword('user', newPinValue,{
            service: 'pincode',
            accessControl: Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD,
            accessible:  Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY
        });
        console.log('has biometrics? : ', await hasBiometrics());
        
        if (await hasBiometrics()){
            navigation.replace(ScreenName.FingerprintSetup) //change to something else, navigation isnt nice
        }else{
            dispatch(
                setAuth()
            )
        }
        

        setNewPinValue('')
    }



  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Secure your app</Text>
        <Text style={styles.text}>{subtitleText}</Text>

        <TextInput 
        value={textInputValue} 
        onChangeText={setTextInputValue} 
        onSubmitEditing={onButtonPress} 
        placeholder='Pin Code' 
        keyboardType="numeric" 
        style={styles.input} 
        secureTextEntry={true} 
        maxLength={6}
        autoFocus = {false}
        />
        <View style={{marginTop: 20}}>
            <TouchableHighlight  onPress={onButtonPress}>
                <View style={styles.buttonStyle}>
                    <Text style={{fontSize: 20}}>{buttonText}</Text>
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