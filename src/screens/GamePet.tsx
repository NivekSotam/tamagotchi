import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {IconButton, Button, useTheme, Card} from 'react-native-paper';
import {colors} from '../styles/colors';

interface Choice {
  name: string;
  icon: string;
}

const choices: Choice[] = [
  {name: 'Pedra', icon: 'cube-outline'},
  {name: 'Papel', icon: 'file-outline'},
  {name: 'Tesoura', icon: 'content-cut'},
];

const GamePet = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  const [result, setResult] = useState('');
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const handlePress = (choice: Choice) => {
    if (userScore < 3 && computerScore < 3) {
      const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];
      setUserChoice(choice.name);
      setComputerChoice(computerChoice);

      if (choice.name === computerChoice.name) {
        setResult('Empate!');
      } else if (
        (choice.name === 'Pedra' && computerChoice.name === 'Tesoura') ||
        (choice.name === 'Papel' && computerChoice.name === 'Pedra') ||
        (choice.name === 'Tesoura' && computerChoice.name === 'Papel')
      ) {
        setResult('Você ganhou!');
        setUserScore(userScore + 1);
      } else {
        setResult('Você perdeu!');
        setComputerScore(computerScore + 1);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Seu placar: {userScore}</Text>
      <Text style={styles.result}>{result}</Text>
      <Card style={styles.card}>
        <Card.Content style={styles.header}>
          <View style={styles.imageContainer}>
            <Card style={styles.imageCard}>
              <Image
                style={styles.image}
                source={require('../../imagens/tamagochi.png')}
              />
            </Card>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.score}>
              Placar do computador: {computerScore}
            </Text>
            <View style={styles.choiceContainer}>
              {computerChoice && (
                <>
                  <Text>
                    O computador escolheu: {computerChoice.name}{' '}
                    <IconButton
                      icon={computerChoice.icon}
                      iconColor={colors.secondary}
                      size={20}
                    />
                  </Text>
                </>
              )}
            </View>
          </View>
        </Card.Content>
      </Card>
      <Text style={styles.choice}>Você escolheu: {userChoice}</Text>
      <View style={styles.actionsContainer}>
        {choices.map(choice => (
          <View key={choice.name} style={styles.choiceContainer}>
            <IconButton
              icon={choice.icon}
              size={20}
              iconColor={colors.secondary}
              onPress={() => handlePress(choice)}
            />
            <Text>{choice.name}</Text>
          </View>
        ))}
      </View>
      <Button
        mode="contained"
        color="lightblue"
        onPress={() => navigation.goBack()}
        contentStyle={{height: 50}}>
        Voltar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A60CE',
    padding: 20,
  },
  card: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'lightblue',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageCard: {
    backgroundColor: colors.secondary,
    borderRadius: 50,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  textContainer: {
    flexShrink: 1,
  },
  result: {
    fontSize: 24,
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    marginBottom: 10,
  },
  choiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  choice: {
    fontSize: 18,
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
});

export default GamePet;
