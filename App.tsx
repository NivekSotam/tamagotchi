import React from 'react';
import Login from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import useUserStore from './src/stores/userStore';
import CreatePet from './src/screens/CreatePet';
import Feedback from './src/components/Feedback';
import {colors} from './src/styles/colors';

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.ternaryContainer,
    secondary: colors.secondary,
    tertiary: colors.tertiary,
    onSurface: colors.tertiary,
    error: colors.error,
    surfaceVariant: colors.onTertiary,
  },
};

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const store = useUserStore();
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ffd9dc',
            },
            contentStyle: {
              backgroundColor: '#ffd9dc',
            },
          }}>
          {store.token ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  title: 'HOME',
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: '#4A60CE',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
              <Stack.Screen
                name="Create Pet"
                component={CreatePet}
                options={{
                  title: 'Create Pet',
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: '#4A60CE',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: 'Login',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#4A60CE',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
          )}
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: 'Register',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#4A60CE',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Feedback />
    </PaperProvider>
  );
}

export default App;
