const initialState = { tasks: [], total: 0 };

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK": {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    }
    case "REMOVE_TASK": {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id != action.payload),
      };
    }
    case "TOGGLE_TASK": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    }
    case "CALCULATE_TOTAL_TASKS": {
      const total = state.tasks.length;

      if (total === 0) {
        return {
          ...state,
          total: 0,
        };
      }

      return {
        ...state,
        total,
      };
    }
  }
};

export default taskReducer;
