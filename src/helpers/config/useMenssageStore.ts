import {create} from 'zustand';
import {CardMenssage} from '../../types/CardMenssage';
import {ActionsMessage} from '../../types/ActionsMessage';

const initialState: CardMenssage = {
  type: '',
  message: '',
  visible: false,
};

const useMenssageStore = create<CardMenssage & ActionsMessage>(set => ({
  ...initialState,
  showMessage: ({type, message, visible}: CardMenssage) =>
    set({type, message, visible}),
  reset: () => set(initialState),
}));

export default useMenssageStore;
