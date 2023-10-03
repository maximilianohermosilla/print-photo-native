import React, { useState } from 'react'
import {View, Text, Button, Image} from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker';

export default function ImageScreen() {
    const [image, setImage] = useState('https://via.placeholder.com/200');

    const selectImage = () => {
        const options = {
            title: "Selecciona una imagen",
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }

        launchImageLibrary(options, response => {
            console.log("Response = " + response)
        })

    };

    return (<View>
        <Button
            title = "Seleccionar imagen"
            onPress = { selectImage }
        >            
        </Button>

        <Image
            style = {{
                alignSelf: 'center',
                height: 200,
                width: 200,
            }}
            source = {{uri: image}}
        >

        </Image>
    </View>)
}