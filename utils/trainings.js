export const parseExercises = (exercises) => {
    return exercises.map((exercise) => {
        return {
            title: exercise.Title,
            description: exercise.Description,
        };
    });
};
