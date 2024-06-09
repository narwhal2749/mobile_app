import { Controller, useFormContext } from "react-hook-form";
import { View, StyleSheet, Text } from "react-native";
import { RadioButton } from "react-native-paper";

export const BooleanQuestion = ({ questionId }: { questionId: string }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={questionId}
      render={({ field: { onChange, value } }) => (
        <RadioButton.Group
          onValueChange={onChange}
          value={value}
        >
          <View style={styles.container}>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 8,
  },
  radioButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  radioButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});