import React, { useEffect, useState } from 'react'
import {View, Text, Button, Image, StyleSheet} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function ImagePickerPage() {
    const [html, setHtmlPrint] = useState('');
    const [image, setImage] = useState('https://via.placeholder.com/300');
    const [image64, setImage64] = useState('');
    const [selectedPrinter, setSelectedPrinter] = React.useState();

    useEffect(() => {
        setHTML();
    }, [image64])

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          console.log(result);
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
          await setImage64('data:image/jpeg;base64,' + base64)
          await setImage(result.assets[0].uri);
        } else {
            //alert('No ha seleccionado ninguna imagen');
        }
    };

    const takePictureAsync = async () => {
        let result = await ImagePicker.launchCameraAsync({
          //allowsEditing: true,
          quality: 1,
          includeBase64: true
        });
    
        if (!result.canceled) {
          console.log(result);
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
          await setImage64('data:image/jpeg;base64,' + base64)
          await setImage(result.assets[0].uri);
        } else {
          //alert('Captura de imagen cancelada');
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

    const print = async () => {
        //await setHTML();
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        setTimeout(async () => {
            //console.log(html);
            await Print.printAsync({
                html,
                printerUrl: selectedPrinter?.url, // iOS only
            });            
        }, 1000);
    };

    const printToFile = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        const { uri } = await Print.printToFileAsync({ html });
        console.log('File has been saved to:', uri);
        setTimeout(async () => {
            console.log(html);
            await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
        }, 500);
    };

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync(); // iOS only
        setSelectedPrinter(printer);
    };

    const setHTML = async () => {
        let htmlSetted = `
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        </head>
        <body style="text-align: center;">
            <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
                Benidorm
            </h1>
            <div style="display: grid; grid-template-columns: 1fr 1fr;">
                <img src="${image64}" style="width: 100%; height: 100%; object-fit: contain" />
                <p style="padding: 1rem; text-align: start;">
                    Benidorm es un balneario costero en la costa este de España, parte de la famosa Costa Blanca de la región de Valencia. 
                    Fue una pequeña villa pesquera hasta la década de 1960 y actualmente es un popular destino vacacional mediterráneo famoso por su vida nocturna. 
                    Sus dos amplias playas de arena, la playa de Levante y la playa Poniente, están bordeadas de paseos costeros con palmeras, bares y filas de rascacielos.
                </p>
            </div>
            <div style="display: grid; grid-template-columns: 2fr 1fr;">           
                <p style="padding: 1rem; text-align: start;">
                    Benidorm es un balneario costero en la costa este de España, parte de la famosa Costa Blanca de la región de Valencia. 
                    Fue una pequeña villa pesquera hasta la década de 1960 y actualmente es un popular destino vacacional mediterráneo famoso por su vida nocturna. 
                    Sus dos amplias playas de arena, la playa de Levante y la playa Poniente, están bordeadas de paseos costeros con palmeras, bares y filas de rascacielos.
                </p>
                <img src="https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_1920/v1684277293/st7g4mklagcxlxwxokeu.jpg" style="width: 100%; height: 100%; object-fit: contain" />            
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr;">
                <img src="https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_768/v1677008160/post_images/Benidorm/14847369196_6e04f16fb7_k_Cropped.jpg" style="width: 100%; height: 100%; object-fit: contain" />
                <p style="padding: 1rem; text-align: start;">
                    Benidorm es un balneario costero en la costa este de España, parte de la famosa Costa Blanca de la región de Valencia. 
                    Fue una pequeña villa pesquera hasta la década de 1960 y actualmente es un popular destino vacacional mediterráneo famoso por su vida nocturna. 
                    Sus dos amplias playas de arena, la playa de Levante y la playa Poniente, están bordeadas de paseos costeros con palmeras, bares y filas de rascacielos.
                </p>
            </div>
        </body>
        </html>
                `;
        console.log(htmlSetted);
        await setHtmlPrint(htmlSetted);
    }

    return (
    <View  style = {{
        flex: 1,                
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <Text
            style = {{
                fontSize: 30,
                alignSelf: 'center',
                marginBottom: 10,
                color: 'forestgreen',
            }}
        >
            PrinterPhotoApp
        </Text>

        <Button
            title = "Seleccionar imagen"
            onPress = { pickImageAsync }
        >            
        </Button>

        <Image
            style = {{
                alignSelf: 'center',
                height: 300,
                width: 300,
                marginTop: 5,
                marginBottom: 15,
            }}
            source = {{uri: image}}
        >
        </Image>

        {/* <Button
            title = "Cámara"
            onPress = { takePictureAsync }
            leading={props => <Icon name="delete" {...props} />}
        >
        </Button>  */}
          
        <IconButton 
            color = 'white'
            onPress = { takePictureAsync }     
            icon = {props => 
                <Icon name="camera" {...props} size = {30}/>
            }
        />

        <Button title="Imprimir" onPress={print} />

        <View style={styles.spacer} />

        <Button title="Compartir" onPress={printToFile} />
        {Platform.OS === 'ios' && (
            <>
                <View style={styles.spacer} />
                <Button title="Select printer" onPress={selectPrinter} />
                <View style={styles.spacer} />
                {selectedPrinter ? (
                    <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
                ) : undefined}
            </>
        )}


    </View>)
}

const styles = StyleSheet.create({
    containerPrint: {

    },
    spacer: {
        margin: 3,
        top: 0,
    }
});