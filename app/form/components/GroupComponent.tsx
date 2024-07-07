import React, { useCallback, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useFieldArray } from 'react-hook-form';
import { QuestionGroup } from '../../domain/Workstation';
import { FormQuestion } from './FormQuestion';

interface GroupComponentProps { 
  group: QuestionGroup;
  control: any;
  errors: any;
  register: any 
}

export const GroupComponent = ({ group, control, errors, register }: GroupComponentProps) => {
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
