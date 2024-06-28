import { StyleSheet, Text } from 'react-native';

  export default function Title({title}: {title: string}) {
  return (
    <Text style={styles.title}>{title}</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    flexWrap: 'wrap',
    marginRight: 8,
  },
});