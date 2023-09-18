import React from 'react';
import {View, StyleSheet} from 'react-native'; // Importe 'View' do React Native
import Login from './screens/Login';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A60CE',
  },
});

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}

export default App;
