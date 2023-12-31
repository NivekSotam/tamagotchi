import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import InputText from '../components/InputText';
import axios from '../axios.config';
import {validatePetName} from '../helpers/validation-helper';
import {Button} from 'react-native-paper';
import usePetsStore from '../helpers/config/config.Pets';
import useMenssageStore from '../helpers/config/useMenssageStore';

const styles = StyleSheet.create({
  cardContainer: {
    margin: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: '#4A60CE',
  },
});

type Input = {
  value: string;
  error: string | undefined;
};

const CreatePet = ({navigation}: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState<Input>({value: '', error: ''});

  const {showMessage} = useMenssageStore();
  const {getPets} = usePetsStore();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const nameError = validatePetName(name.value);

      if (nameError) {
        setName({...name, error: nameError});
        return;
      }

      const body = {
        name: name.value,
      };

      await axios.post('/pet', body);
      showMessage({
        type: 'success',
        message: 'Pet adicionado com sucesso!',
        visible: true,
      });
      getPets();
      navigation.goBack();
    } catch (error: any) {
      showMessage({
        type: 'success',
        message: error?.response?.data?.message,
        visible: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <InputText
          label="Nome"
          mode="outlined"
          value={name?.value}
          error={!!name?.error}
          textError={name?.error}
          onChangeText={text => setName({value: text, error: ''})}
          disabled={loading}
        />
        <View style={styles.actionsContainer}>
          <Button disabled={loading} mode="contained" onPress={handleSubmit}>
            Salvar
          </Button>
          <Button
            disabled={loading}
            mode="contained"
            onPress={() => navigation.goBack()}>
            Cancelar
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreatePet;
