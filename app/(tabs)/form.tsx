import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useWorkstation } from '../WorkstationProvider';
import { useForm } from 'react-hook-form';
import { AnswerTypes } from '../domain/Question';
import { TextQuestion } from '@/components/form/TextQuestion';
import { BooleanQuestion } from '@/components/form/BooleanQuestion';
import { MultipleChoiceQuestion } from '@/components/form/MultipleChoiceQuestion';
import { BasePage } from '@/components/BasePage';

export default function Form() {
  const {workstation} = useWorkstation();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
  };

  const displayName = `${workstation?.code} - ${workstation?.name}`;
  return (
    <BasePage darkStatusBar>
      <Text style={styles.displayName}>{displayName}</Text>
      <ScrollView contentContainerStyle={styles.container}>
        {workstation?.questions?.map((item) => {
          const { possible_answers, ...question } = item;
          return (
            <View key={question.id} style={styles.questionContainer}>
              <Text style={styles.questionTitle}>{question.title}</Text>
              {question.answer_type.toString() === AnswerTypes.TEXT && (
                <TextQuestion control={control} questionId={question.id} />
              )}
              {question.answer_type === AnswerTypes.YES_NO && (
                <BooleanQuestion control={control} questionId={question.id} />
              )}
              {question.answer_type === AnswerTypes.MULTIPLE_CHOICE && (
                <MultipleChoiceQuestion control={control} questionId={question.id} possibleAnswers={possible_answers ?? []} />
              )}
            </View>
          );
        })}
      </ScrollView>

      <View>
        <Button onPress={handleSubmit(onSubmit)} title="Submit" />
      </View>
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