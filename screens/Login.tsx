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

const styles = StyleSheet.create({
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
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    width: 250,
    height: 40,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#FF5E5E',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string>('');
  const rotationValue = new Animated.Value(0);

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      rotateImage();
    }, 2000);

    return () => clearInterval(rotationInterval);
  }, []);
  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

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

  return (
    <View>
      <View style={styles.card}>
        <Animated.Image
          source={require('../imagens/tamagochi.png')}
          style={[styles.tamagotchiImage, rotateStyle]}
        />
        <Text style={styles.title}>Faça Seu Login</Text>
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
