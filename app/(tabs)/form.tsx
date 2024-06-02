import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useWorkstation } from '../WorkstationProvider';
import { Controller, useForm } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import { AnswerTypes, PossibleAnswer } from '../domain/Question';

export default function Form() {
  const {workstation} = useWorkstation();
  const { control, handleSubmit } = useForm();


  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
  };
  console.log('workstation', workstation?.questions);

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {workstation?.questions?.map((item) => {
          const { possible_answers, ...question } = item;
          return (
            <View key={question.id} style={styles.questionContainer}>
              <Text style={styles.questionTitle}>{question.title}</Text>
              {question.answer_type === AnswerTypes.TEXT && (
                <TextQuestion control={control} questionId={question.id} />
              )}
              {question.answer_type === AnswerTypes.YES_NO && (
                <BooleanQuestion control={control} questionId={question.id} />
              )}
              {question.answer_type === AnswerTypes.MULTIPLE_CHOICE && (
                <MultipleChoiceQuestion control={control} questionId={question.id} possibleAnswers={possible_answers ?? []}/>
              )}
            </View>
          );
        })}
          <Button onPress={handleSubmit(onSubmit)} title="Submit" />
      </ScrollView>
    </View>
  );
}

const TextQuestion = ({control, questionId}: {control: any, questionId: string}) => {
  return (
    <Controller
      control={control}
      name={questionId}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          style={styles.input}
        />
      )}
    />
  )
}

const BooleanQuestion = ({control, questionId}: {control: any, questionId: string}) => {
  return (
    <Controller
      control={control}
      name={questionId}
      render={({ field: { onChange, value } }) => (
        <RadioButton.Group
          onValueChange={onChange}
          value={value}
        >
          <View style={styles.radioButtonContainer}>
            <RadioButton value="yes" />
            <Text>Yes</Text>
            <RadioButton value="no" />
            <Text>No</Text>
          </View>
        </RadioButton.Group>
      )}
    />
  )
}

const MultipleChoiceQuestion = ({control, questionId, possibleAnswers}: {control: any, questionId: string,  possibleAnswers: PossibleAnswer[]}) => {
  return (
    <Controller
      control={control}
      name={questionId}
      render={({ field: { onChange, value } }) => (
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker}
        >
          {possibleAnswers.map((answer) => (
            <Picker.Item key={answer.id} label={answer.answer} value={answer.id} />
          ))}
        </Picker>
      )}
    />
  )
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
  questionContainer: {
    marginBottom: 16,
    backgroundColor: '#7f7f7f',
    padding: 16,
    borderRadius: 8,
  },
  questionTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});