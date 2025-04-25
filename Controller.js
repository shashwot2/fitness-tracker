import { API } from "./api.js";
import { Model } from "./Model.js";
import { View } from "./View.js";

export const Controller = ((model, view, api) => {
    const state = new model.State();

    // Handle form submission for adding a goal
    const addGoalHandler = (e) => {
        e.preventDefault();

        const description = view.descriptionInput.value.trim();
        const category = view.categorySelect.value;
        const repetitions = view.repetitionsInput.value.trim();

        if (!description || !category || !repetitions) {
            alert("Please fill in all fields.");
            return;
        }
        const newGoal = {
            description,
            category,
            repetitions,
            achieved: false // Achieved is hardcoded by default because the user just defined it 
        };

        api.addGoal(newGoal).then(addedGoal => {
            state.addGoal(addedGoal);
            view.clearForm();
        }).catch(error => {
            console.error("Error adding goal:", error);
        });
    };

    const updateGoalHandler = (e) => {
        if (e.target.classList.contains("achieve-btn")) {
            const goalId = e.target.dataset.id;

            const updatedGoal = state.toggleGoalAchieved(goalId);

            if (updatedGoal) {
                api.updateGoal(goalId, { achieved: updatedGoal.achieved })
                    .catch(error => {
                        console.error("Error updating goal:", error);
                        // Revert the model state if the API call fails
                        state.toggleGoalAchieved(goalId);
                    });
            }
        }
    };

    const init = () => {
        // Subscribe to state changes to update the UI
        state.subscribe(() => {
            view.renderGoals(state.goals);
        });
        api.getGoals().then(goals => {
            state.goals = goals;
        }).catch(error => {
            console.error("Error fetching goals:", error);
        });


        // Event listeners
        view.formEl.addEventListener("submit", addGoalHandler);
        view.goalsListEl.addEventListener("click", updateGoalHandler);
    };

    return {
        init
    };
})(Model, View, API);
Controller.init();