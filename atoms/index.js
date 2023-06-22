import { atom } from "recoil";

export const userDataState = atom({
  key: "userDataState",
  default: {},
});

export const createdTrainingsState = atom({
  key: "createdTrainingsState",
  default: [],
});

export const selectedTrainingState = atom({
  key: "selectedTrainingState",
  default: {},
});

export const expoPushTokenState = atom({
  key: "expoPushTokenState",
  default: "",
});

export const notificationSubscriptionIdState = atom({
  key: "notificationSubscriptionIdState",
  default: "",
});

export const trainingSessionsState = atom({
  key: "trainingSessionsState",
  default: [],
});

export const selectedSessionState = atom({
  key: "selectedSessionState",
  default: {},
});

export const locationState = atom({
  key: "locationState",
  default: {
    latitude: 0,
    longitude: 0,
  },
});

export const sessionVerifiedState = atom({
  key: "sessionVerifiedState",
  default: false,
});

export const goalsState = atom({
  key: "goalsState",
  default: [],
});
