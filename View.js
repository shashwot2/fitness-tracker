export const View = (() => {
    const formEl = document.getElementById("goal-form");
    const descriptionInput = document.getElementById("description");
    const categorySelect = document.getElementById("category");
    const repetitionsInput = document.getElementById("repetitions");
    const goalsListEl = document.getElementById("goals-list");

    const clearForm = () => {
        formEl.reset();
    };

    const renderGoals = (goals) => {
        goalsListEl.innerHTML = "";
        // I was using innerHTML for everything but i realzied it wasn't secure so contrsucted it manually 
        goals.forEach(goal => {
            const li = document.createElement("li");
            li.className = "goal-item";
            li.id = `goal-${goal.id}`;

            if (goal.achieved) {
                li.classList.add("achieved");
            }

            const goalInfo = document.createElement("div");
            goalInfo.className = "goal-info";

            const description = document.createElement("div");
            description.textContent = goal.description;

            const category = document.createElement("div");
            category.className = "goal-category";
            category.textContent = `- ${goal.category}`;

            const repetitions = document.createElement("div");
            repetitions.className = "goal-repetitions";
            repetitions.textContent = `(${goal.repetitions})`;
            goalInfo.appendChild(description);
            goalInfo.appendChild(category);
            goalInfo.appendChild(repetitions);

            const achieveBtn = document.createElement("button");
            achieveBtn.className = `btn achieve-btn ${goal.achieved ? 'achieved' : ''}`;
            achieveBtn.textContent = goal.achieved ? 'Achieved' : 'Mark as Achieved';
            achieveBtn.dataset.id = goal.id;

            li.appendChild(goalInfo);
            li.appendChild(achieveBtn);
            goalsListEl.appendChild(li);
        });
    };

    return {
        formEl,
        descriptionInput,
        categorySelect,
        repetitionsInput,
        goalsListEl,
        clearForm,
        renderGoals
    };
})();