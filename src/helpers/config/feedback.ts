import {create} from 'zustand';
import {FeedbackMessage} from '../../types/FeedbackMessage';
import {ActionsFeedbackMessage} from '../../types/ActionsFeedbackMessage';

const initialState: FeedbackMessage = {
  type: '',
  message: '',
  visible: false,
};

const useFeedbackStore = create<FeedbackMessage & ActionsFeedbackMessage>(
  set => ({
    ...initialState,
    showMessage: ({type, message, visible}: FeedbackMessage) =>
      set({type, message, visible}),
    reset: () => set(initialState),
  }),
);

export default useFeedbackStore;
