import { Controller, useFormContext } from "react-hook-form"
import { TextInput, StyleSheet, View } from "react-native"
import Title from "./Title";

interface TextQuestionProps {
  name: string;
  required: boolean;
  title: string;
}
export const TextQuestion = ({name, required, title}: TextQuestionProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View>
          <Title title={title}/>
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        </View>
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