import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Alert,
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
  confirmPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  confirmPasswordInput: {
    width: 250,
    height: 40,
    backgroundColor: '#c8cdd3',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
});

const Register = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [hasEmailError, setHasEmailError] = useState(false);
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

  const handleEmailChange = (text: string) => {
    setEmail(text);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    setHasEmailError(!emailRegex.test(text));
  };

  const handleRegister = async () => {
    if (hasEmailError || !email) {
      Alert.alert('Erro', 'O email fornecido não é válido.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const response = await axios.post(
        'https://tamagochiapi-clpsampedro.b4a.run/Register',
        {
          email,
          password,
        },
      );
      console.log(response);
      if (response.status === 200) {
        Alert.alert(
          'Registro Bem-Sucedido',
          'Seu registro foi concluído com sucesso.',
        );

        navigation.navigate('Login');
      } else {
        Alert.alert(
          'Erro',
          'Ocorreu um erro durante o registro. Tente novamente mais tarde.',
        );
      }
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
            onChangeText={handleEmailChange}
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
        <View style={styles.confirmPasswordContainer}>
          <TextInput
            style={styles.confirmPasswordInput}
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;
