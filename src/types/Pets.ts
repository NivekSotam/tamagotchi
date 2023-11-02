import {PetType} from './PetsType';

export type Pets = {
  pets: PetType[];
  getPets: () => void;
};
