import { Button, StyleSheet, Text, View } from 'react-native';

export default function Form() {

  return (
    <View style={styles.container}>
      <Text style={styles.permissionDescription}>We need your permission to show the camera</Text>
      <Button  title="grant permission" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  permissionDescription: {
    textAlign: 'center'
  },
});