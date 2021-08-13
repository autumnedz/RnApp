
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput} from 'react-native';
import { ScreenName } from '../rootModule';
import * as Keychain from 'react-native-keychain';


interface Prop{
    navigation: any // this is not nice but cba
}

export const LoginPage = ({navigation}: Prop) => {
    const [enterdPinCode, setEnteredPinCode] = useState('') // current value entered in the textinput for pin login


    const onLoginTextChange = (inputValue:string) => {
        //console.log(inputValue, typeof(inputValue));
        setEnteredPinCode(inputValue)
    }



    // lets user enter the app if entered pin code is correct 
    const submitPincode = async() => { 

        const credentials = await Keychain.getGenericPassword(); // fetch credentials from the keychain

        if (isNaN(parseInt(enterdPinCode)) || !credentials) return 

        // if pincode is correct navigate to the content page
        if (parseInt(enterdPinCode) === parseInt(credentials.password)){
            navigation.navigate(ScreenName.Content)
      }

      setEnteredPinCode('')
    }

    // This prevents the user to return back to the setupAuth or splashScreen, but its not nice because the return button is still available on the screen, just doesnt react
    navigation.addListener('beforeRemove', (e: any) => {
        e.preventDefault(); // Prevent default behavior of leaving the screen
    })

    return(
        <View style={styles.container}>
            <Text style = {styles.heading}>Welcome</Text>
            <View style={{flex: 3, justifyContent:'center'}}>
                <TextInput 
                value={enterdPinCode} 
                onChangeText={onLoginTextChange} 
                onSubmitEditing={submitPincode} 
                placeholder='Enter Pin' 
                keyboardType="numeric" 
                style={styles.input} 
                secureTextEntry={true} 
                maxLength={4}
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