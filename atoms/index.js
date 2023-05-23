import { atom } from 'recoil';

export const userDataState = atom({
    key: 'userDataState',
    default: {},
});

export const createdTrainingsState = atom({
    key: 'createdTrainingsState',
    default: [],
});

export const startedTrainingsState = atom({
    key: 'startedTrainingsState',
    default: [],
});

export const selectedTrainingState = atom({
    key: 'selectedTrainingState',
    default: {},
});
