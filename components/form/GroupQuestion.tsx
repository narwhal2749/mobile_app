import { SubQuestion } from '@/app/domain/Question';
import React, { useEffect } from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

type GroupQuestionProps = {
  questionId: string;
  subQuestions: SubQuestion[];
  required: boolean;
}

export const GroupQuestion = ({ questionId, subQuestions, required }: GroupQuestionProps) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${questionId}.groups`
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addGroup = () => {
    append(subQuestions.reduce((acc, subQuestion) => {
      acc[subQuestion.id] = '';
      return acc;
    }, {} as Record<string, string>));
  };
  
  useEffect(() => {
    if (fields.length === 0) {
      addGroup();
    }
  }, [addGroup, fields]);

  return (
    <View>
      {fields.map((field, index) => (
        <View key={field.id} style={styles.groupContainer}>
          {subQuestions.map((subQuestion) => (
            <View key={subQuestion.id} style={styles.subQuestionContainer}>
              <Text>{subQuestion.title}</Text>
              <Controller
                control={control}
                name={`${questionId}.groups[${index}].${subQuestion.id}`}
                rules={{ required: required }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>
          ))}
          <Button title="Remove" onPress={() => remove(index)} />
        </View>
      ))}
      <Button title="Add" onPress={addGroup} />
    </View>
  );
};

const styles = StyleSheet.create({
  groupContainer: {
    marginBottom: 16,
    padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  subQuestionContainer: {
    marginBottom: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
});
