import { Elixir } from '../types';

export const MOCK_ELIXIR_1 = {
  id: '1',
  effect: 'Test Effect',
  sideEffects: '',
  characteristics: '',
  time: '1 hour',
  name: 'Test Elixir',
  ingredients: [
    { id: '123', name: 'Ingredient 1' },
    { id: '312', name: 'Ingredient 2' },
  ],
  inventors: [
    { id: '1', firstName: 'John', lastName: 'Doe' },
    { id: '2', firstName: 'Jane', lastName: 'Smith' },
  ],
  difficulty: 'Moderate',
  manufacturer: 'Test Manufacturer',
} as Elixir;

export const MOCK_ELIXIR_2 = {
  id: '2',
  effect: 'Another Effect',
  sideEffects: 'Some side effects',
  characteristics: 'Some characteristics',
  time: '2 hours',
  name: 'Another Elixir',
  ingredients: [
    { id: '456', name: 'Ingredient 3' },
    { id: '654', name: 'Ingredient 4' },
  ],
  inventors: [
    { id: '3', firstName: 'Alice', lastName: 'Johnson' },
    { id: '4', firstName: 'Bob', lastName: 'Brown' },
  ],
  difficulty: 'Advanced',
  manufacturer: 'Another Manufacturer',
} as Elixir;

export const MOCK_ELIXIRS = [MOCK_ELIXIR_1, MOCK_ELIXIR_2];

export const MOCK_ELIXIR_FILTER_INPUTS = {
  name: 'Test Elixir',
  difficulty: 'Moderate',
  ingredient: 'Ingredient 1',
  inventorFullName: 'John Doe',
  manufacturer: 'Test Manufacturer',
};
