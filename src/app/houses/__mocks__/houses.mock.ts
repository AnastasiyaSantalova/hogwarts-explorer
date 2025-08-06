import { House } from '../types';

export const MOCK_HOUSE_GRYFFINDOR: House = {
  id: '1',
  name: 'Gryffindor',
  houseColours: 'Red, Gold',
  founder: 'Godric Gryffindor',
  animal: 'Lion',
  element: 'Fire',
  ghost: 'Nearly Headless Nick',
  commonRoom: 'Gryffindor Common Room',
  heads: [
    {
      id: '1',
      firstName: 'Minerva',
      lastName: 'McGonagall',
    },
  ],
  traits: [
    { id: '1', name: 'Bravery' },
    { id: '2', name: 'Courage' },
    { id: '3', name: 'Chivalry' },
  ],
};

export const MOCK_HOUSE_SLYTHERIN: House = {
  id: '2',
  name: 'Slytherin',
  houseColours: 'Green, Silver',
  founder: 'Salazar Slytherin',
  animal: 'Snake',
  element: 'Water',
  ghost: 'The Bloody Baron',
  commonRoom: 'Slytherin Common Room',
  heads: [
    {
      id: '2',
      firstName: 'Severus',
      lastName: 'Snape',
    },
  ],
  traits: [
    { id: '4', name: 'Cunning' },
    { id: '5', name: 'Ambition' },
    { id: '6', name: 'Resourcefulness' },
  ],
};

export const MOCK_HOUSES: House[] = [
  MOCK_HOUSE_GRYFFINDOR,
  MOCK_HOUSE_SLYTHERIN,
];
