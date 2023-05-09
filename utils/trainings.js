export const parseExercises = (exercises) => {
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
    return difficulty.indexOf(difficulty);
};
