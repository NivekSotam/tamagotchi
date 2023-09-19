import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Easing,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A60CE',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 5,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF5E5E',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    width: 250,
    height: 40,
    backgroundColor: '#c8cdd3',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#f6ee8d',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginLeft: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tamagotchiImage: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string>('');
  const rotationValue = new Animated.Value(0);

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      rotateImage();
    }, 2000);

    return () => clearInterval(rotationInterval);
  }, []);

  const rotateImage = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotationValue, {
          toValue: 5,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotationValue, {
          toValue: -45,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotationValue, {
          toValue: 45,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]),
      {
        iterations: 4,
      },
    ).start();
  };

  const rotateStyle = {
    transform: [
      {
        rotate: rotationValue.interpolate({
          inputRange: [0, 10, 45, 55],
          outputRange: ['0deg', '10deg', '-45deg', '45deg'],
        }),
      },
    ],
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://tamagochiapi-clpsampedro.b4a.run/login',
        {
          email,
          password,
        },
      );
      console.log('====================================');
      console.log(response);
      console.log('====================================');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Animated.Image
          source={require('../imagens/tamagochi.png')}
          style={[styles.tamagotchiImage, rotateStyle]}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={styles.buttonText}>Registre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
