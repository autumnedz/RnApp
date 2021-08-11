
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
    const [imageUrl, setImageUrl] = useState(' ')

    const onButtonPress= () => {
        setImageUrl('https://en.meming.world/images/en/thumb/2/2c/Surprised_Pikachu_HD.jpg/300px-Surprised_Pikachu_HD.jpg')
        setTimeout(() => {
        setImageUrl(' ')
        }, 2000);
    }

    return(
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.heading}>Awesome App</Text>
            </View>
            <TouchableHighlight  onPress={onButtonPress}>
                <View style={styles.buttonStyle}>
                    <Text>Pika?</Text>
                </View>
            </TouchableHighlight>
            <View style={{ marginTop: 20}}>
                <Image 
                    style={{width: 350, height:350}}
                    source={{uri: imageUrl}}
                />
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