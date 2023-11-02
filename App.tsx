import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IconButton, Provider as PaperProvider} from 'react-native-paper';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import CreatePet from './src/screens/CreatePet';
import Feedback from './src/components/Feedback';
import {colors} from './src/styles/colors';
import EditPet from './src/screens/EditPet';
import GamePet from './src/screens/GamePet';
import useUserStore from './src/helpers/config/storeToken';

const Stack = createNativeStackNavigator();
const store = useUserStore();

function App(): JSX.Element {
  return (
    <PaperProvider>
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
                options={({navigation}) => ({
                  title: 'HOME',
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: '#4A60CE',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  headerLeft: () => (
                    <IconButton
                      icon="arrow-left"
                      iconColor={'#FFF'}
                      onPress={() => store.resetToken()}
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="Criar Bixinho"
                component={CreatePet}
                options={{
                  title: 'Criar Bixinho',
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
                name="Editar Bixinho"
                component={EditPet}
                options={{
                  title: 'Editar Bixinho',
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
                name="Jogo"
                component={GamePet}
                options={{
                  title: 'joguinho',
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
