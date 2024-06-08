import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { CameraType } from 'expo-camera/build/legacy/Camera.types';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { useWorkstation } from '../WorkstationProvider';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const {fetchWorkstation} = useWorkstation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionDescription}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarcodeScanned = async (scannedData: BarcodeScanningResult) => {
    setLoading(true);
    try {
      await fetchWorkstation(scannedData.data);
      setLoading(false);
      router.push('form'); 
    } catch (error) {
      setLoading(false);
      console.error('Error fetching workstation:', error);
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <CameraView style={styles.camera} facing={CameraType.back} onBarcodeScanned={handleBarcodeScanned}>
          <View style={styles.buttonContainer} />
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    margin: 64,
  },
  permissionDescription: {
    textAlign: 'center'
  },
});