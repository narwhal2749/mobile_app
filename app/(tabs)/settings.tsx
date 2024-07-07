import React, { useMemo } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData, useUser } from '../UserProvider';

export default function SettingsScreen() {
  const { control, handleSubmit, reset } = useForm<UserData>();
  const { userData, setUserData } = useUser();
  
  useMemo(() => {
    reset(userData);
  }, [userData]);

  const handleSave = async (data: UserData) => {
    await AsyncStorage.setItem('firstName', data.firstName);
    await AsyncStorage.setItem('lastName', data.lastName);
    setUserData({ firstName: data.firstName, lastName: data.lastName })
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="firstName"
        rules={{ required: true }}
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
        rules={{ required: true }}
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