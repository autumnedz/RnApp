
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput} from 'react-native';
import { Overlay } from 'react-native-elements';
// TODO: figure out the login page, make it switch to content page on successfull login

interface Prop{
    navigation: any // this is not nice but cba 
}

export const LoginPage = ({navigation}: Prop) => {
    const [visible, setVisible] = useState(false);
    const [enterdPincode, setEnteredPincode] = useState('')
    const [correctPincode, setCorrectPincode] = useState(1234)
    const [isPinSet, setIsPinSet] = useState(false)
    const test = useNavigation()

    const toggleOverlay = () => {
        setVisible(!visible);
    }

    const onButtonPress =() => {
        toggleOverlay()
    }

    const onInputTextChange = (inputValue:string) => {
        console.log(inputValue, typeof(inputValue));
        setEnteredPincode(inputValue)
    }

    const submitPincode = () => {

        if (isNaN(parseInt(enterdPincode))) return // TODO: handle nan case
        if (parseInt(enterdPincode) === correctPincode){
            setEnteredPincode('')
            navigation.navigate('content')
      }
    }

    return(
        <View style={styles.container}>
            <Text style = {styles.heading}>Welcome</Text>
            {/* <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <Text>Login stuff</Text>
                <TouchableHighlight>
                    <View>

                    </View>
                </TouchableHighlight>
            </Overlay> */}

            <View style={{flex: 3, justifyContent:'center'}}>
                <TextInput 
                value={enterdPincode} 
                onChangeText={onInputTextChange} 
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