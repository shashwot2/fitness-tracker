export const Model = (() => {
    class State {
        #goals = [];
        // For observer pattern like in class
        #onChange = () => { };

        constructor() {
            this.#goals = [];
            this.#onChange = () => { };
        }

        get goals() {
            return this.#goals;
        }

        set goals(newGoals) {
            this.#goals = newGoals;
            this.#onChange();
        }
        addGoal(newGoal) {// immutably added 
            this.#goals = [...this.#goals, newGoal];
            this.#onChange();
        }

        toggleGoalAchieved(stringId) {
            // I put stringId here because we use hex for id similar to uuid discussed in class 
            this.#goals = this.#goals.map(goal =>
                String(goal.id) === stringId
                    ? { ...goal, achieved: !goal.achieved } // This toggles the goal satstatus  
                    : goal
            );
            this.#onChange();
            // EDGE CASE: Just in case id is equal find uses first one
            return this.#goals.find(goal => String(goal.id) === stringId);
        }
        subscribe(cb) {
            this.#onChange = cb;
        }
    }

    return {
        State
    };
})();