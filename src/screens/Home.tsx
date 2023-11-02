import React, {useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {Avatar, Button, Card, IconButton, Text} from 'react-native-paper';
import {colors} from '../styles/colors';
import axios from '../axios.config';
import {useNavigation} from '@react-navigation/native';
import {PetType} from '../types/PetsType';
import useFeedbackStore from '../helpers/config/feedback';
import {FeedbackMessage} from '../types/FeedbackMessage';
import usePetsStore from '../helpers/config/config.Pets';

const {Title} = Card;
const {Image} = Avatar;

const styles = StyleSheet.create({
  icon: {
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#4A60CE',
  },
  title: {
    marginBottom: 5,
  },
  cardContent: {
    margin: 20,
    padding: 20,
    backgroundColor: 'lightblue',
  },
  addButton: {
    margin: 20,
    backgroundColor: 'lightblue',
  },
  texto: {
    color: 'black',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  playButton: {
    marginTop: 10,
    backgroundColor: colors.secondary,
  },
  titleContainer: {
    alignItems: 'center',
    marginLeft: 90,
  },
});

const ListItem = ({id, name, funLevel, life}: PetType) => {
  const {showMessage} = useFeedbackStore();
  const {getPets} = usePetsStore();
  const {navigate} = useNavigation<any>();

  const handleEdit = () => {
    navigate('Editar Bixinho', {petId: id});
  };

  const handleFoodPress = async () => {
    try {
      await axios.post(`/pet/${id}/food`);
      showMessage({
        type: 'success',
        message: 'Pet almossou com sucesso',
        visible: true,
      });
      getPets();
    } catch (error) {
      console.log(error);
      showMessage({
        type: 'error',
        message: 'Seu pet não quer comer, tente novamente mais tarde!',
        visible: true,
      });
    }
  };

  const handleSleepPress = async () => {
    try {
      await axios.post(`/pet/${id}/rest`);
      showMessage({
        type: 'success',
        message: 'Pet foi dormir',
        visible: true,
      });
      getPets();
    } catch (error) {
      console.log(error);
      showMessage({
        type: 'error',
        message: 'Seu pet não quer dormir, tente novamente mais tarde!',
        visible: true,
      });
    }
  };

  const handlePlayPress = async () => {
    try {
      await axios.post(`/pet/${id}/play`);
      showMessage({
        type: 'success',
        message: 'Iniciando o jogo...',
        visible: true,
      });
      navigate('Jogo', {petName: name, petId: id});
    } catch (error) {
      console.log(error);
      showMessage({
        type: 'error',
        message: 'Erro ao iniciar o jogo. Tente novamente mais tarde.',
        visible: true,
      });
    }
  };

  return (
    <Card mode="contained" style={styles.cardContent}>
      <View style={styles.imageContainer}>
        <Image size={80} source={require('../../imagens/coxinha.png')} />
      </View>
      <View style={styles.titleContainer}>
        <Title
          style={styles.title}
          title={name}
          titleVariant="titleLarge"
          titleStyle={{color: 'black', fontWeight: 'bold'}}
        />
      </View>
      <Text style={styles.texto}>Vida: {life}</Text>
      <Text style={styles.texto}>Diversão: {funLevel}</Text>
      <Button
        icon="play"
        mode="contained"
        onPress={handlePlayPress}
        style={styles.playButton}>
        Jogar
      </Button>

      <View style={styles.iconContainer}>
        <IconButton
          style={styles.icon}
          icon="silverware"
          iconColor={colors.primary}
          onPress={handleFoodPress}
        />
        <IconButton
          style={styles.icon}
          icon="sleep"
          iconColor={colors.primary}
          onPress={handleSleepPress}
        />
        <IconButton
          style={styles.icon}
          icon="pencil"
          iconColor={colors.secondary}
          onPress={handleEdit}
        />
        <IconButton
          style={styles.icon}
          icon="delete"
          iconColor={colors.error}
          onPress={() => handleDelete(id, showMessage, getPets)}
        />
      </View>
    </Card>
  );
};

const handleDelete = async (
  id: number,
  showMessage: (state: FeedbackMessage) => void,
  getPets: () => void,
) => {
  try {
    await axios.delete(`/pet/${id}`);
    showMessage({
      type: 'success',
      message: 'Pet deletado com sucesso',
      visible: true,
    });
    getPets();
  } catch (error) {
    console.log(error);
    showMessage({
      type: 'error',
      message: 'Houve um erro ao deletar o pet, tente novamente mais tarde!',
      visible: true,
    });
  }
};

const Home = ({navigation}: any) => {
  const {pets, getPets} = usePetsStore();

  useEffect(() => {
    getPets();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        style={styles.addButton}
        icon="plus"
        mode="contained"
        onPress={() => navigation.navigate('Criar Bixinho')}>
        Adicionar
      </Button>
      <FlatList
        data={pets}
        renderItem={({item}) => (
          <ListItem
            id={item.id}
            name={item.name}
            funLevel={item.funLevel}
            life={item.life}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default Home;
