
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Switch, Button} from 'react-native';
import { Overlay } from 'react-native-elements';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/configureStore';
import { ScreenName } from '../rootModule';
import * as Keychain from 'react-native-keychain';
import { setAuth } from '../store/actions/AuthActions';
import { Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';




interface Prop{
    navigation: any // this is not nice but cba 
}

export const PinSetupPage = ({navigation}: Prop) => {
    const [buttonText, setButtonText] = useState('Next')
    const [subtitleText, setSubtitleText] = useState('At first, set your 6-digit PIN')
    const [textInputValue, setTextInputValue] = useState('') 
    const [newPinValue, setNewPinValue] = useState('')
    const [isPinConfirmed, setIsPinConfirmed] = useState(false)
    const [isBiometricsAvailable, setIsBiometricsAvailable] = useState(true)
    const [isSwitchEnabled, setIsSwitchEnabled] = useState(true)

    const RequiredPinLength = 6

    const dispatch = useDispatch()

    useEffect(() => {
        checkBiometrics()
    }, [])

    const checkBiometrics = async () => {
        try{
            const result = await Keychain.getSupportedBiometryType()        
            setIsBiometricsAvailable(result !== null)
            setIsSwitchEnabled(result !== null)   
        }catch(e){
            console.log(e);
        }
    }

    const toggleSwitch = () => {
        setIsSwitchEnabled(!isSwitchEnabled)        
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
        try{
            // keychain storage for pincode
            await Keychain.setGenericPassword('user', newPinValue,{
                service: 'pincode',
                //accessControl: Keychain.ACCESS_CONTROL.USER_PRESENCE,
                accessible:  Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY
            });
            
            if (isSwitchEnabled){
                await Keychain.setGenericPassword('user', newPinValue,{
                    service: 'biometric',
                    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
                    accessible:  Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
                })
            }

            dispatch(
                setAuth()
            )
            
            setNewPinValue('')
        }catch(e){
            console.log(e);
            
        }
    }



  return (
    <SafeAreaView style={styles.container}>
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

        <View style={{opacity: isBiometricsAvailable? 1 : 0.3}}>
            <Text>
                Sign-in automatically with fingerprint or face scan (You can always change it in settings)
            </Text>
            <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isSwitchEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isSwitchEnabled}
            disabled={!isBiometricsAvailable}
            />
        </View>

        <View style={{marginTop: 20}}>
            <TouchableHighlight  onPress={onButtonPress}>
                <View style={styles.buttonStyle}>
                    <Text style={{fontSize: 20}}>{buttonText}</Text>
                </View>
            </TouchableHighlight>
        </View>
    </SafeAreaView>
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