import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useWorkstation } from '../WorkstationProvider';
import { FormProvider, useForm } from 'react-hook-form';
import { AnswerTypes, Question } from '../domain/Question';
import { TextQuestion } from '@/components/form/TextQuestion';
import { BooleanQuestion } from '@/components/form/BooleanQuestion';
import { MultipleChoiceQuestion } from '@/components/form/MultipleChoiceQuestion';
import { BasePage } from '@/components/BasePage';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData } from './settings';
import { SharedStyles } from '@/components/form/styles/SharesStyles';

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

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);

    const submittedData = {
      ...userData,
      date: new Date().toISOString(),
      ...data,
    };

    if(!errors){
      console.log('Form Data:', submittedData);
    } else {
      console.log('Errors:', errors);
      console.log('Form Data with errr:', submittedData);
    }
  };

  const displayName = `${workstation?.code} - ${workstation?.name}`;
  return (
    <BasePage darkStatusBar>
      <Text style={styles.displayName}>{displayName}</Text>
      <FormProvider {...methods}>
        <ScrollView contentContainerStyle={styles.container}>
          {workstation?.questions?.map((question) => (
            <FormQuestion key={question.id} question={question} errors={errors} />
          ))}
          {workstation?.groups?.map((group) => (
            <View key={group.name} style={styles.groupContainer}>
              <Text style={styles.questionTitle}>{group.name}</Text>
              {group.questions.map((question) => (
                <FormQuestion key={question.id} inGroup question={question} errors={errors} />
              ))}
            </View>
          ))}
        </ScrollView>
        <View>
          <Button onPress={handleSubmit(onSubmit)} title="Submit" />
        </View>
      </FormProvider>
    </BasePage>
  );
}

interface FormQuestionProps {
  question: Question;
  errors: any;
  inGroup?: boolean;
}

export const FormQuestion = ({ question, errors, inGroup }: FormQuestionProps) => {
  return (
    <View key={question.id} style={[inGroup ? styles.groupQuestionContainer: styles.questionContainer, errors[question.id] && SharedStyles.error]}>
      {question.answerType.toString() === AnswerTypes.TEXT && (
        <TextQuestion title={question.title} questionId={question.id} required={question.required} />
      )}
      {question.answerType === AnswerTypes.BOOLEAN && (
        <BooleanQuestion title={question.title} questionId={question.id} required={question.required} />
      )}
      {question.answerType === AnswerTypes.SELECT_ONE && (
        <MultipleChoiceQuestion title={question.title} questionId={question.id} required={question.required} possibleAnswers={question.possibleAnswers ?? []} single={true} />
      )}
      {question.answerType === AnswerTypes.SELECT_MULTIPLE && (
        <MultipleChoiceQuestion title={question.title}  questionId={question.id} required={question.required} possibleAnswers={question.possibleAnswers ?? []} single={false} />
      )}
    </View>
  )
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
  groupQuestionContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    zIndex: 1,
  },
  groupContainer: {
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