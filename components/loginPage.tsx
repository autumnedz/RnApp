
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, SafeAreaView} from 'react-native';
import { ScreenName } from '../rootModule';
import * as Keychain from 'react-native-keychain';
import { useDispatch } from 'react-redux';
import { resetAuth, signIn } from '../store/actions/AuthActions';
import { DismissKeyboard } from './dismissKeyboard';
import { CodeInput } from './codeInput';

interface Prop{
    navigation: any // this is not nice but cba
}



export const LoginPage = ({navigation}: Prop) => {
    const [enteredPinCode, setEnteredPinCode] = useState('') // current value entered in the textinput for pin login
    const dispatch = useDispatch()
    
    useEffect(() => {
        loginWithBiometrics()
    },[])

    const loginWithBiometrics = async () => {
        
        if (await Keychain.getSupportedBiometryType() !== null){
            try{
                const credentials = await Keychain.getGenericPassword({service:'biometric', authenticationPrompt: {title: 'To continue please authenticate'}}); // fetch credentials from the keychain
                if (credentials){
                    dispatch(
                        signIn(credentials.password)
                    )
                }
            }catch(err){
                console.log('fall back to pincode');
                
            }
        }
    }

    const onLoginTextChange = (inputValue:string) => {
        setEnteredPinCode(inputValue)
    }



    // lets user enter the app if entered pin code is correct 
    const submitPincode = async() => { 
        const credentials = await Keychain.getGenericPassword({service:'pincode'}); // fetch credentials from the keychain

        //if pincode is correct sign in to the content page
        if (credentials && (enteredPinCode === credentials.password)){
            dispatch(
                signIn(credentials.password)
            )
        }else{
            Alert.alert(  //to be replaced with a regular alert message in the page instead of a popup
                'Incorrect PIN',
                '',
                [
                    { text: "Try Again", onPress: () => {setEnteredPinCode('')} }
                ]
            )
            return
        }

      setEnteredPinCode('')
    }

    const onResetAuthentification = async () => {
        await Keychain.resetGenericPassword({service:'biometric'});
        await Keychain.resetGenericPassword({service:'pincode'});
        dispatch(resetAuth())

    }

    return(
        <DismissKeyboard>
            <SafeAreaView style={styles.container}>
                <Text style = {styles.heading}>Welcome</Text>
                <View style={{flex: 3, justifyContent:'center'}}>
                    <CodeInput
                    codeLength={6}
                    code={enteredPinCode}
                    setCode={onLoginTextChange}
                    />
                    {/* <TextInput 
                    value={enteredPinCode} 
                    onChangeText={onLoginTextChange} 
                    onSubmitEditing={submitPincode} 
                    placeholder='Enter Pin' 
                    keyboardType='number-pad' 
                    style={styles.input} 
                    secureTextEntry={true} 
                    maxLength={6}
                    autoFocus = {true}
                    /> */}
                    <View style={{marginTop: 20}}>
                        <TouchableOpacity  onPress={submitPincode}>
                            <View style={styles.buttonStyle}>
                                <Text style={styles.buttonText}>Login</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 20}}>
                        <TouchableOpacity  onPress={onResetAuthentification}>
                            <View style={ { alignItems: "center", justifyContent: 'center', padding: 15, }}>
                                <Text style={{fontSize: 20, color: '#0007F9', textDecorationLine: 'underline'}}>reset authentification</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
        margin: 15
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