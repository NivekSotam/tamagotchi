import {create} from 'zustand';
import axios from '../../axios.config';
import {Pets} from '../../types/Pets';

const usePetsStore = create<Pets>(set => ({
  pets: [],
  getPets: async () => {
    try {
      const {data} = await axios.get('/pets');

      set({pets: data.pets});
    } catch (error) {
      console.log(error);
    }
  },
}));

export default usePetsStore;
