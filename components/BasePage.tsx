import { StatusBar, StyleSheet, View } from 'react-native';
import { PropsWithChildren } from 'react';

type BasePageProps = {
  darkStatusBar?: boolean,
} & PropsWithChildren;

export const BasePage = ({children, darkStatusBar}: BasePageProps) =>  {
  const style = darkStatusBar ? 'dark-content' : 'light-content';
  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle={style} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
    paddingTop: 25,
    backgroundColor: '#fff',
  },
});