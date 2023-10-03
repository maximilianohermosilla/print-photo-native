import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ImageScreen from './src/screens/ImageScreen';
import ImagePickerPage from './src/screens/ImagePicker';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ImagePickerPage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
