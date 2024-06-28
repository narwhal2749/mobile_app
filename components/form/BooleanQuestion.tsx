import { Controller, useFormContext } from "react-hook-form";
import { View, StyleSheet, Text } from "react-native";
import { RadioButton } from "react-native-paper";
import Title from "./Title";

export const BooleanQuestion = ({ questionId, title, required }: { questionId: string; title: string; required: boolean }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={questionId}
      rules={{ required: required }}
      render={({ field: { onChange, value } }) => (
        <RadioButton.Group onValueChange={onChange} value={value}>
          <View style={styles.container}>
            <Title title={title}/>
            <View style={styles.radioButtonContainer}>
              <View style={styles.radioButtonWrapper}>
                <RadioButton value="yes" />
                <Text>Yes</Text>
              </View>
              <View style={styles.radioButtonWrapper}>
                <RadioButton value="no" />
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
