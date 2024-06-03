import { PossibleAnswer } from "@/app/domain/Question";
import { Picker } from "@react-native-picker/picker";
import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";


export const MultipleChoiceQuestion = ({control, questionId, possibleAnswers}: {control: any, questionId: string,  possibleAnswers: PossibleAnswer[]}) => {
  return (
    <Controller
      control={control}
      name={questionId}
      render={({ field: { onChange, value } }) => (
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            style={styles.picker}
          >
            {possibleAnswers.map((answer) => (
              <Picker.Item key={answer.id} label={answer.answer} value={answer.id} />
            ))}
          </Picker>
        </View>
      )}
    />
  )
}

  const styles = StyleSheet.create({
    pickerWrapper: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 4, 
      overflow: 'hidden', 
    },
    picker: {
      height: 50,
      width: '100%',
    },
  });