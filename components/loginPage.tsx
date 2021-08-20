
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Alert} from 'react-native';
import { ScreenName } from '../rootModule';
import * as Keychain from 'react-native-keychain';
import { useDispatch } from 'react-redux';
import { signIn } from '../store/actions/AuthActions';

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
            Alert.alert( 
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

    // // This prevents the user to return back to the setupAuth or splashScreen, but its not nice because the return button is still available on the screen, just doesnt react
    // navigation.addListener('beforeRemove', (e: any) => {
    //     e.preventDefault(); // Prevent default behavior of leaving the screen
    // })

    return(
        <View style={styles.container}>
            <Text style = {styles.heading}>Welcome</Text>
            <View style={{flex: 3, justifyContent:'center'}}>
                <TextInput 
                value={enteredPinCode} 
                onChangeText={onLoginTextChange} 
                onSubmitEditing={submitPincode} 
                placeholder='Enter Pin' 
                keyboardType="numeric" 
                style={styles.input} 
                secureTextEntry={true} 
                maxLength={6}
                autoFocus = {true}
                />
                <View style={{marginTop: 20}}>
                    <TouchableHighlight  onPress={submitPincode}>
                        <View style={styles.buttonStyle}>
                            <Text style={{fontSize: 20}}>Login</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    heading:{
        flex: 1,
     fontWeight: 'bold',
     fontSize: 50,
     
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