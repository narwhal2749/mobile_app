import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AnswerTypes, Question } from '../../domain/Question';
import { TextQuestion } from '@/app/form/components/TextQuestion';
import { BooleanQuestion } from '@/app/form/components/BooleanQuestion';
import { MultipleChoiceQuestion } from '@/app/form/components/MultipleChoiceQuestion';
import { SharedStyles } from '@/app/form/components/styles/SharesStyles';

interface FormQuestionProps {
  question: Question;
  errors: any;
  inGroup?: boolean;
  name: string;
}

export const FormQuestion = ({ question, errors, inGroup, name }: FormQuestionProps) => {
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

const styles = StyleSheet.create({
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
});
