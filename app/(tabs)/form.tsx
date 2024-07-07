import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useWorkstation } from '../WorkstationProvider';
import { FormProvider, useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BasePage } from '@/components/BasePage';
import { UserData } from './settings';
import { GroupComponent } from '../form/GroupComponent';
import { FormQuestion } from '../form/FormQuestion';

export default function Form() {
  const { workstation } = useWorkstation();
  const methods = useForm();
  const { handleSubmit, formState: { errors }, control, register } = methods;
  const [userData, setUserData] = useState<UserData>({ firstName: '', lastName: '' });

  useEffect(() => {
    const loadData = async () => {
      try {
        const firstName = await AsyncStorage.getItem('firstName');
        const lastName = await AsyncStorage.getItem('lastName');
        setUserData({ firstName: firstName ?? '', lastName: lastName ?? '' });
      } catch (e: any) {
        Alert.alert('Failed to load data', e.message);
      }
    };

    loadData();
  }, []);

  const onSubmit = (data: any) => {
    const { groups, ...rest } = data;
    let submittedData: any;
    try {
       submittedData = {
        ...userData,
        date: new Date().toISOString(),
        questions: Object.entries(rest || {}).map(([key, value]: [string, unknown]) => ({ [key]: value })),
        groups: Object.entries(groups || {}).map(([key, values]: [string, any]) => {
          const formattedValues = Object.entries(values[0] || {}).map(([key, value]: [string, any]) => ({ [key]: value }))
          return { [key]: formattedValues }}),
      };
    } catch (error) {
      console.log("error", error);
    }

    if (!Object.keys(errors).length) {
      console.log('submitted:', submittedData.groups);
    } else {
      console.log('Errors:', errors);
      console.log(' with errors:', submittedData);
    }
  };

  const displayName = `${workstation?.code} - ${workstation?.name}`;
  return (
    <BasePage darkStatusBar>
      <Text style={styles.displayName}>{displayName}</Text>
      <FormProvider {...methods}>
        <ScrollView contentContainerStyle={styles.container}>
          {workstation?.questions?.map((question) => (
            <FormQuestion key={question.id} question={question} errors={errors} name={question.id} />
          ))}
          {workstation?.groups?.map((group) => (
            <GroupComponent key={group.id} group={group} control={control} errors={errors} register={register} />
          ))}
        </ScrollView>
        <View>
          <Button onPress={handleSubmit(onSubmit)} title="Submit" disabled={!!Object.keys(errors).length}/>
        </View>
      </FormProvider>
    </BasePage>
  );
}

const styles = StyleSheet.create({
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  container: {
    paddingBottom: 16,
  },
});
