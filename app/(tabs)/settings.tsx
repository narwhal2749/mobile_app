import React, { useEffect } from 'react';
import { Button, TextInput, View, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserData {
  firstName: string;
  lastName: string;
}

export default function SettingsScreen() {
  const { control, handleSubmit, reset } = useForm<UserData>();

  useEffect(() => {
    const loadData = async () => {
      try {
        const firstName = await AsyncStorage.getItem('firstName');
        const lastName = await AsyncStorage.getItem('lastName');
        if (firstName || lastName) {
          reset({ firstName: firstName || '', lastName: lastName || '' });
        }
      } catch (e) {
        Alert.alert('Error', 'Failed to load data');
      }
    };

    loadData();
  }, [reset]);

  const handleSave = async (data: UserData) => {
    try {
      await AsyncStorage.setItem('firstName', data.firstName);
      await AsyncStorage.setItem('lastName', data.lastName);
    } catch (e: any) {
      Alert.alert('Failed to save data', e);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="First Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Last Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      <Button title="Save" onPress={handleSubmit(handleSave)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});