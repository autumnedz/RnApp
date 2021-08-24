
import React from 'react';
import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Image,
    useColorScheme,
    View,
    Button,
    TouchableHighlight,
  } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { useDispatch } from 'react-redux';
import { resetAuth } from '../store/actions/AuthActions';


export const ContentPage = () => {
    const dispatch = useDispatch()

    const onResetAuthentification = async () => {
        await Keychain.resetGenericPassword({service:'biometric'});
        await Keychain.resetGenericPassword({service:'pincode'});
        dispatch(resetAuth())

    }

    return(
        <View style={styles.container}>
            <Image 
                style={{ width: 350, height: 350 }}
                source={{ uri: 'https://en.meming.world/images/en/thumb/2/2c/Surprised_Pikachu_HD.jpg/300px-Surprised_Pikachu_HD.jpg' }}
            />
            <View style={{ marginTop: 20 }}>
                <TouchableHighlight onPress={onResetAuthentification}>
                    <View style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>reset authentification</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    heading:{
     fontWeight: 'bold',
     fontSize: 50,
     
    },
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        padding: 10,
        justifyContent:'center',
        alignItems:'center'
 
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
  });