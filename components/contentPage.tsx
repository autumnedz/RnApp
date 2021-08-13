
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
  

export const ContentPage = () => {

    return(
        <View style={styles.container}>
            <Image 
                style={{width: 350, height:350}}
                source={{uri: 'https://en.meming.world/images/en/thumb/2/2c/Surprised_Pikachu_HD.jpg/300px-Surprised_Pikachu_HD.jpg'}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    heading:{
     fontWeight: 'bold',
     fontSize: 50,
     
    },
    container: {
     justifyContent: 'center',
     alignItems: "center",
     flex: 1,
     padding: 10
 
    },
    buttonStyle: {
     alignItems: "center",
     backgroundColor: "#DDDDDD",
     padding: 15,
     
    }
  });