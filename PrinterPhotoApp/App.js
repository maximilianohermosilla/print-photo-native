import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ImagePickerPage from './src/screens/ImagePicker';
import ImagePrint from './src/screens/ImagePrint';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ImagePickerPage />
      <StatusBar></StatusBar>
      {/* <ImagePrint></ImagePrint> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D3D3D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
});
