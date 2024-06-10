import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useWorkstation } from '../WorkstationProvider';
import { FormProvider, useForm } from 'react-hook-form';
import { AnswerTypes, SubQuestion } from '../domain/Question';
import { TextQuestion } from '@/components/form/TextQuestion';
import { BooleanQuestion } from '@/components/form/BooleanQuestion';
import { MultipleChoiceQuestion } from '@/components/form/MultipleChoiceQuestion';
import { BasePage } from '@/components/BasePage';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData } from './settings';
import { GroupQuestion } from '@/components/form/GroupQuestion';
import { SharedStyles } from '@/components/form/SharesStyles';

export default function Form() {
  const {workstation} = useWorkstation();
  const methods = useForm();
  const { handleSubmit, formState: {errors} } = methods;
  const [userData, setUserData] = useState<UserData>({firstName: '', lastName: ''});

  useEffect(() => {
    const loadData = async () => {
      try {
        const firstName = await AsyncStorage.getItem('firstName');
        const lastName = await AsyncStorage.getItem('lastName');
        setUserData({firstName: firstName ?? '', lastName: lastName ?? ''});
      } catch (e: any) {
        Alert.alert('Failed to load data', e);
      }
    };

    loadData();
  }, []);

  const transformGroupData = (data: any, subQuestions: SubQuestion[]) => {
    return data.map((group: any) => {
      const transformedGroup: any = {};
      subQuestions.forEach((subQuestion) => {
        transformedGroup[subQuestion.id] = {id: subQuestion.id, answer: group[subQuestion.id]};
      });
      return transformedGroup;
    });
  };

  const onSubmit = (data: any) => {
    const finalData = { ...data };

    workstation?.questions?.forEach((question) => {
      if (question.answerType === AnswerTypes.GROUP && question.subQuestions) {
        finalData[question.id] = transformGroupData(data[question.id]?.groups || [], question.subQuestions);
      }
    });

    const submittedData = {
      ...userData,
      date: new Date().toISOString(),
      ...finalData,
    };

    if(!errors){
      console.log('Form Data:', submittedData);
    } else {
      console.log('Errors:', errors);
      console.log('Form Data:', submittedData);
    }
  };

  const displayName = `${workstation?.code} - ${workstation?.name}`;
  return (
    <BasePage darkStatusBar>
      <Text style={styles.displayName}>{displayName}</Text>
      <FormProvider {...methods}>
        <ScrollView contentContainerStyle={styles.container}>
          {workstation?.questions?.map((item) => {
            const { possibleAnswers, subQuestions, ...question } = item;
            return (
              <View key={question.id} style={[styles.questionContainer, errors[question.id] && SharedStyles.error]}>
                <Text style={styles.questionTitle}>{question.title}</Text>
                {question.answerType.toString() === AnswerTypes.TEXT && (
                  <TextQuestion questionId={question.id} required={question.required} />
                )}
                {question.answerType === AnswerTypes.BOOLEAN && (
                  <BooleanQuestion questionId={question.id} required={question.required} />
                )}
                {question.answerType === AnswerTypes.SELECT_ONE && (
                  <MultipleChoiceQuestion questionId={question.id} required={question.required} possibleAnswers={possibleAnswers ?? []} single={true} />
                )}
                {question.answerType === AnswerTypes.SELECT_MULTIPLE && (
                  <MultipleChoiceQuestion questionId={question.id} required={question.required} possibleAnswers={possibleAnswers ?? []} single={false} />
                )}
                {question.answerType === AnswerTypes.GROUP && (
                  <GroupQuestion questionId={question.id} required={question.required} subQuestions={subQuestions ?? []}/>
                )}
              </View>
            );
          })}
        </ScrollView>

        <View>
          <Button onPress={handleSubmit(onSubmit)} title="Submit" />
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
  questionContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    zIndex: 1,
  },
  questionTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    flexWrap: 'wrap',
    marginRight: 8,
  },
});