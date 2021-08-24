
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Switch} from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/configureStore';
import { ScreenName } from '../rootModule';
import * as Keychain from 'react-native-keychain';
import { setAuth } from '../store/actions/AuthActions';
import { Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { DismissKeyboard } from './dismissKeyboard'




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
    <DismissKeyboard>
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1}}>
                <Text style={styles.heading}>Secure your app</Text>
                <Text style={styles.text}>{subtitleText}</Text>
            </View>
            <View style={{flex: 1}}>
                <TextInput 
                value={textInputValue} 
                onChangeText={setTextInputValue} 
                onSubmitEditing={onButtonPress} 
                placeholder='Pin Code' 
                keyboardType='number-pad' 
                style={styles.input} 
                secureTextEntry={true} 
                maxLength={6}
                autoFocus = {false}
                />
                <View style={{...styles.switchWithLabel, opacity: isBiometricsAvailable? 1 : 0.3}}>
                    <Text style={{flex:4 }}>
                        Sign-in automatically with fingerprint or face scan (You can always change it in settings)
                    </Text>
                    <Switch
                    style={{flex: 1}}
                    trackColor={{ false: '#8A8A8A', true: '#0007F9' }}
                    thumbColor={'#FFFFFF'}
                    onValueChange={toggleSwitch}
                    value={isSwitchEnabled}
                    disabled={!isBiometricsAvailable}
                    />
                </View>
            </View>
            <View style={{marginTop: 20, flex: 2, justifyContent:'flex-end'}}>
                <TouchableHighlight  onPress={onButtonPress}>
                    <View style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>{buttonText}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    </DismissKeyboard>
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
        backgroundColor: '#ffffff',
        flex: 1,
        padding: 10
 
    },
    buttonStyle: {
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: "#0007F9",
        padding: 15,
    },
    buttonText:{
        fontSize: 20,
        color: '#ffffff'
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        textAlign: 'center'
      },
      switchWithLabel: {
        flexDirection:'row-reverse'
      },
  });