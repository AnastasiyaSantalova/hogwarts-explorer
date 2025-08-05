import { Ingredient } from '../ingredients/types';

export type Inventor = {
  id: string;
  firstName: string;
  lastName: string;
};

export type ElixirDifficulty =
  | 'Unknown'
  | 'Advanced'
  | 'Moderate'
  | 'Beginner'
  | 'OrdinaryWizardingLevel'
  | 'OneOfAKind';

export type Elixir = {
  id: string;
  name: string;
  effect: string;
  sideEffects: string;
  characteristics: string;
  difficulty: ElixirDifficulty;
  time: string;
  ingredients: Ingredient[];
  inventors: Inventor[];
  manufacturer: string;
};

export type ElixirFilterInputs = {
  name: string;
  difficulty: string;
  ingredient: string;
  inventorFullName: string;
  manufacturer: string;
};
