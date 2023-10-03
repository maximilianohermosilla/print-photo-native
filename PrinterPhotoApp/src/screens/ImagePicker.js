import React, { useState } from 'react'
import {View, Text, Button, Image} from 'react-native'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerPage() {
    const [image, setImage] = useState('https://via.placeholder.com/200');

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          console.log(result);
          setImage(result.assets[0].uri);
        } else {
          alert('You did not select any image.');
        }
    };

    const takePictureAsync = async () => {
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          console.log(result);
          setImage(result.assets[0].uri);
        } else {
          alert('You did not select any image.');
        }
    };

    const takePicture = async () => {
        const options = {
            title: "Tomar una imagen",
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
            includeBase64: true,
        }

        await ImagePicker.launchCameraAsync(options, response => {
            if(response.errorCode){
                console.log(response.errorMessage)
            }
            else if(response.didCancel){
                console.log("El usuario cancelo la fotografia");
            }
            else{
                const uri = response.assets[0].uri;
                setImage(uri);
            }
        })


    }

    return (<View>
        <Button
            title = "Seleccionar imagen"
            onPress = { pickImageAsync }
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

        <Button
            title = "Cámara"
            onPress = { takePictureAsync }
        >            
        </Button>
    </View>)
}