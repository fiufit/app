export const parseExercises = (exercises, session = false) => {
    if (session) {
        return exercises.map((exercise) => {
            return {
                id: exercise.ID,
                title: exercise.Exercise.Title,
                description: exercise.Exercise.Title,
                done: exercise.Done,
            };
        });
    }
    return exercises.map((exercise) => {
        return {
            exerciseOldData: exercise,
            title: exercise.Title,
            description: exercise.Description,
        };
    });
};

export const difficulties = ["Beginner", "Intermediate", "Expert"];

export const getDifficultyIndex = (difficulty) => {
    return difficulties.indexOf(difficulty);
};

export const interests = [
    "Strength",
    "Speed",
    "Endurance",
    "Sports",
    "Lose weight",
    "Gain weight",
];

export const getPercentageDone = (session) => {
    const { ExerciseSessions } = session;
    const totalExercises = ExerciseSessions.length;
    const doneExercises = ExerciseSessions.filter(
        (exercise) => exercise.Done
    ).length;
    return Math.round((doneExercises / totalExercises) * 100).toFixed(0);
};

export const phraseToShow = (session) => {
    const { StepCount, SecondsCount } = session;
    if (session.Done) {
        return "Training done!";
    } else if (getPercentageDone(session) === "100") {
        return "Mark as done!";
    } else if (StepCount === 0 && SecondsCount === 0) {
        return "Start your training!";
    } else {
        return `${StepCount} steps and ${Math.ceil(SecondsCount / 60)} min done`;
    }
};

export const getGoalDescription = (goal) => {
    const { value, type, subtype } = goal;
    switch (type) {
        case "sessions count":
            return `Finish ${value} ${subtype} trainings`;
        case "step count":
            return `Walk ${value} steps`;
        case "minutes count":
            return `Train for ${value} minutes`;
    }
}

export const categoriesType = {
    Trainings: "sessions count",
    Steps: "step count",
    Minutes: "minutes count",
};

export const typesCategory = {
    "sessions count": "Trainings",
    "step count": "Steps",
    "minutes count": "Minutes",
}
