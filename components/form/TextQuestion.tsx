import { Controller, useFormContext } from "react-hook-form"
import { TextInput, StyleSheet } from "react-native"

export const TextQuestion = ({questionId, required}: {questionId: string, required: boolean}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={questionId}
      rules={{ required: required }}
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

  const styles = StyleSheet.create({
    input: {
      marginBottom: 8,
      padding: 8,
      backgroundColor: '#fff',
      borderRadius: 4,
      borderColor: '#ccc',
      borderWidth: 1,
    },
  });