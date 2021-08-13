
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput} from 'react-native';
import { Overlay } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux'
import { setPinCode } from '../store/actions/AuthActions'
import { RootState } from '../store/configureStore';
import ReactNativeBiometrics from 'react-native-biometrics'
import { useEffect } from 'react';
import { ScreenName } from '../rootModule';

// TODO: setup navigation to the login page
// todo: figure out biometrics!!

interface Prop{
    navigation: any // this is not nice but cba 
}

export const SetupAuthPage = ({navigation}: Prop) => {
    const [visible, setVisible] = useState(true); // changes visibility of the new pin overlay
    const [newPinCode, setNewPinCode] = useState('') // current value enterd in the textinput for the new pin

    const dispatch = useDispatch()
    const userSetPinCode = useSelector((state: RootState) => state.pin.userSetPinCode)

    const toggleOverlay = () => {
        setVisible(!visible);
    }
    const onNewPinTextChange = (inputValue: string) => {
        setNewPinCode(inputValue)
    }

    //lets user set up a new pincode
    const submitNewPinCode = () => {
        if (isNaN(parseInt(newPinCode))) return // TODO: handle nan case
        //setCorrectPinCode(parseInt(newPinCode))
        dispatch(
            setPinCode(parseInt(newPinCode))
        )
        setNewPinCode('')
        toggleOverlay()
        navigation.navigate(ScreenName.Login)
    }

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