import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useWorkstation } from '../WorkstationProvider';
import { FormProvider, useForm, useFieldArray } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnswerTypes, Question } from '../domain/Question';
import { TextQuestion } from '@/components/form/TextQuestion';
import { BooleanQuestion } from '@/components/form/BooleanQuestion';
import { MultipleChoiceQuestion } from '@/components/form/MultipleChoiceQuestion';
import { BasePage } from '@/components/BasePage';
import { UserData } from './settings';
import { SharedStyles } from '@/components/form/styles/SharesStyles';
import { QuestionGroup } from '../domain/Workstation';

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

interface FormQuestionProps {
  question: Question;
  errors: any;
  inGroup?: boolean;
  name: string;
}

const FormQuestion = ({ question, errors, inGroup, name }: FormQuestionProps) => {
  return (
    <View key={question.id} style={[inGroup ? styles.groupQuestionContainer : styles.questionContainer, errors[name] && SharedStyles.error]}>
      {question.answerType === AnswerTypes.TEXT && (
        <TextQuestion title={question.title} name={name} required={question.required} />
      )}
      {question.answerType === AnswerTypes.BOOLEAN && (
        <BooleanQuestion title={question.title} name={name} required={question.required} />
      )}
      {question.answerType === AnswerTypes.SELECT_ONE && (
        <MultipleChoiceQuestion title={question.title} name={name} required={question.required} possibleAnswers={question.possibleAnswers ?? []} single={true} />
      )}
      {question.answerType === AnswerTypes.SELECT_MULTIPLE && (
        <MultipleChoiceQuestion title={question.title} name={name} required={question.required} possibleAnswers={question.possibleAnswers ?? []} single={false} />
      )}
    </View>
  );
};

interface GroupComponentProps { 
  group: QuestionGroup;
  control: any;
  errors: any;
  register: any 
}

const GroupComponent = ({ group, control, errors, register }: GroupComponentProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `groups[${group.id}]`
  });

  const groupRequired = group.questions.some((question) => question.required);

  const addGroup = useCallback(() => {
    const newGroup = group.questions.reduce((acc, question) => {
      acc[question.id] = '';
      return acc;
    }, {} as Record<string, string>);
    append(newGroup);
    group.questions.forEach((question) => {
      register(`groups[${group.id}][${fields.length}][${question.id}]`, { required: question.required });
    });
  }, [append, group.questions, group.id, register, fields.length]);

  const removeGroup = useCallback((index: number) => {
    if ((!groupRequired && fields.length > 0) || (groupRequired && fields.length > 1)) {
      remove(index);
    }
  }, [remove, groupRequired, fields.length]);

  useEffect(() => {
    if (groupRequired && fields.length === 0){
      addGroup();
    }
  }, [addGroup, groupRequired, fields.length]);

  return (
    <View key={group.id} style={styles.groupContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.questionTitle}>{group.name}</Text>
        <Button onPress={addGroup} title="+" />
      </View>
      {fields.map((field, index) => (
        <View key={field.id} style={styles.groupItemContainer}>
          {group.questions.map((question) => (
            <FormQuestion key={`${field.id}.${question.id}`} question={question} errors={errors} inGroup={true} name={`groups[${group.id}][${index}][${question.id}]`} />
          ))}
          <Button onPress={() => removeGroup(index)} title="Remove Group" />
        </View>
      ))}
    </View>
  );
};

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
  groupItemContainer: {
    marginBottom: 16,
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
