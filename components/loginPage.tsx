
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import { Overlay } from 'react-native-elements';

// TODO: figure out the login page, make it switch to content page on successfull login

export const LoginPage = () => {
    const [visible, setVisible] = useState(false);
    
    const toggleOverlay = () => {
        setVisible(!visible);
    }

    const onButtonPress =() => {
      toggleOverlay()
    }

    return(
        <View style={styles.container}>
            <Text style = {styles.heading}>Welcome</Text>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <Text>Login stuff</Text>
            </Overlay>
            <View style={{flex: 3, justifyContent:'center'}}> 
                <TouchableHighlight  onPress={onButtonPress}>
                    <View style={styles.buttonStyle}>
                        <Text style={{fontSize: 20}}>Login</Text>
                    </View>
                </TouchableHighlight>
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
     backgroundColor: "#DDDDDD",
     padding: 25,
     
    }
  });