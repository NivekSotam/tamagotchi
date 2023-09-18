import React from 'react';
import Login from './screens/Login';
import {NavigationContainer} from '@react-navigation/native';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
}

export default App;
