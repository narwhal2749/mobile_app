import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { PossibleAnswer } from '@/app/domain/Question';
import { StyleSheet, View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

type MultipleChoiceQuestionProps = {
  questionId: string;
  possibleAnswers: PossibleAnswer[];
  single: boolean;
  required: boolean;
};

export const MultipleChoiceQuestion = ({
  questionId,
  possibleAnswers,
  single,
  required,
}: MultipleChoiceQuestionProps) => {
  const { control } = useFormContext();

  const items = possibleAnswers.map((answer) => ({
    id: answer.id,
    name: answer.answer,
  }));
  return (
    <Controller
      control={control}
      name={questionId}
      rules={{ required: required }}
      render={({ field: { onChange, value } }) => (
        <View style={styles.container}>
          <MultiSelect
            hideTags
            items={items}
            uniqueKey="id"
            onSelectedItemsChange={(selectedItems) => {
              onChange(selectedItems);
            }}
            selectedItems={value || []}
            selectText="Pick Items"
            onChangeInput={ (text)=> console.log(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            itemTextColor="#000"
            hideSubmitButton
            searchInputStyle={styles.searchInput}
            single={single}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  searchInput: {
    display: 'none',
  }
});