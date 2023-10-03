import React, { useState } from 'react'
import {View, Text, Button, Image, StyleSheet} from 'react-native'
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Benidorm
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

export default function ImagePrint() {
    const [selectedPrinter, setSelectedPrinter] = React.useState();

    const print = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        await Print.printAsync({
            html,
            printerUrl: selectedPrinter?.url, // iOS only
        });
    };

    const printToFile = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        const { uri } = await Print.printToFileAsync({ html });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync(); // iOS only
        setSelectedPrinter(printer);
    };




    return (
        <View style={styles.containerPrint}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    containerPrint: {
    
    },
    spacer: {
        margin: 3,
        top: 0,
    }
  });