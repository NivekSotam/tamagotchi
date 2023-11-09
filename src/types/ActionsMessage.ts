import {CardMenssage} from './CardMenssage';

export type ActionsMessage = {
  showMessage: (state: CardMenssage) => void;
  reset: () => void;
};
