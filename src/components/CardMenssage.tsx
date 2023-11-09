import React from 'react';
import {Snackbar} from 'react-native-paper';
import useMenssageStore from '../helpers/config/useMenssageStore';

const CardMenssage = () => {
  const {message, visible, reset} = useMenssageStore();

  const handleDismiss = () => {
    reset();
  };

  return (
    <Snackbar visible={visible} onDismiss={handleDismiss}>
      {message}
    </Snackbar>
  );
};

export default CardMenssage;
