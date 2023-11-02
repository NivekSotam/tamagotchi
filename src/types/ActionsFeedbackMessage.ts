import {FeedbackMessage} from './FeedbackMessage';

export type ActionsFeedbackMessage = {
  showMessage: (state: FeedbackMessage) => void;
  reset: () => void;
};
