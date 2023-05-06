import { atom } from 'recoil';

export const userDataState = atom({
    key: 'userDataState',
    default: {},
});

export const createdTrainingsState = atom({
    key: 'createdTrainingsState',
    default: [],
});
