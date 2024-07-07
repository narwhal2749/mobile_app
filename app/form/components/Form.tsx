import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BasePage } from '@/components/BasePage';
import { Workstation } from '@/app/domain/Workstation';
import { UserData } from '@/app/(tabs)/settings';
import { FormQuestion } from './FormQuestion';
import { GroupComponent } from './GroupComponent';
import { useSubmitForm } from '../hooks/useSubmitForm';
import 'react-native-get-random-values';
import { v4 } from 'uuid';

type FormData = {
  groups: Record<string, any>[];
  [key: string]: any;
}

interface FormProps {
  workstation: Workstation;
}

export default function FormPage({workstation}: FormProps) {
  const methods = useForm<FormData>();
  const { handleSubmit, formState: { errors }, control, register } = methods;
  const [userData, setUserData] = useState<UserData>({ firstName: '', lastName: '' });
  const { submitForm } = useSubmitForm();
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

  const onSubmit = (data: FormData) => {
    const { groups, ...rest } = data;
    try {
      const submittedData = {
        //make sure the id stays the same or prevent multiple submissions
        id: v4(),
        workstationId: workstation.id,
        user: {
          name: `${userData.firstName} ${userData.lastName}`,
        },
        date: new Date().toISOString(),
        questions: Object.entries(rest || {}).map(([key, value]: [string, unknown]) => ({ [key]: value })),
        groups: Object.entries(groups || {}).map(([key, values]: [string, any]) => {
          const formattedValues = Object.entries(values[0] || {}).map(([key, value]: [string, any]) => ({ [key]: value }))
          return { [key]: formattedValues }}),
      };
      submitForm(submittedData);
    } catch (error) {
      console.log("error", error);
    }
  };

  const displayName = `${workstation.code} - ${workstation.name}`;
  return (
    <BasePage darkStatusBar>
      <Text style={styles.displayName}>{displayName}</Text>
      <FormProvider {...methods}>
        <ScrollView contentContainerStyle={styles.container}>
          {workstation.questions?.map((question) => (
            <FormQuestion key={question.id} question={question} errors={errors} name={question.id} />
          ))}
          {workstation.groups?.map((group) => (
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
