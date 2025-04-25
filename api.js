export const API = (() => {
    const baseURL = "http://localhost:3000/goals";
  
    const getGoals = () => {
      return fetch(baseURL)
        .then(response => response.json());
    };
  
    const addGoal = (goal) => {
      return fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(goal)
      })
        .then(response => response.json());
    };
  
    const updateGoal = (id, updates) => {
      return fetch(`${baseURL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updates)
      })
        .then(response => response.json());
    };
  
    return {
      getGoals,
      addGoal,
      updateGoal,
    };
  })();