import { Controller, useFormContext } from "react-hook-form";
import { View, StyleSheet, Text } from "react-native";
import { RadioButton } from "react-native-paper";
import Title from "./Title";

interface BooleanQuestionProps {
  name: string;
  title: string;
  required: boolean;
}

export const BooleanQuestion = ({ name, title, required }: BooleanQuestionProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required }}
      render={({ field: { onChange, value } }) => (
        <RadioButton.Group onValueChange={onChange} value={value}>
          <View style={styles.container}>
            <Title title={title}/>
            <View style={styles.radioButtonContainer}>
              <View style={styles.radioButtonWrapper}>
                <RadioButton value="1" />
                <Text>Yes</Text>
              </View>
              <View style={styles.radioButtonWrapper}>
                <RadioButton value="0" />
                <Text>No</Text>
              </View>
            </View>
          </View>
        </RadioButton.Group>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  radioButtonContainer: {
    width: '15%',
    flexDirection: 'column',
  },
  radioButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
