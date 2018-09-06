import { createStore, combineReducers, applyMiddleware, compose
} from "redux";
import uuidv1 from "uuid/v1";

//actions
export const CHANGE_ACTIVE_LIST = "CHANGE_ACTIVE_LIST";
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";
export const UNCOMPLETE_TODO = "UNCOMPLETE_TODO";
export const ADD_LIST = "ADD_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const CLEAR_LIST = "CLEAR_LIST";

export const changeActiveList = (activeList) => {
  return { type: CHANGE_ACTIVE_LIST, activeList
  };
};

export const addTodo = (todo, listId) => {
  return { type: ADD_TODO, todo, listId
  };
};

export const deleteTodo = (todo, listId) => {
  return { type: ADD_TODO, todo, listId
  };
}

export const removeTodo = (todoId, listId) => {
  return { type: REMOVE_TODO, todoId, listId
  };
}
export const completeTodo = (todoId, listId) => {
  return { type: COMPLETE_TODO, todoId, listId
  };
}
export const uncompleteTodo = (todoId, listId) => {
  return { type: UNCOMPLETE_TODO, todoId, listId
  };
}
export const addList = (name) => {
  return { type: ADD_LIST, name
  };
}
export const deleteList = listId => {
  return { type: DELETE_LIST, listId
  };
};
export const clearList = (listId) => {
  return { type: CLEAR_LIST, listId
  };
}
//reducers
function lists(state = [],action) {
  switch (action.type) {
    case COMPLETE_TODO:
      return state.map(l => {
        if (l.id === action.listId) return { ...l, todos: l.todos.map(t => {
              if (t.id === action.todoId) return { ...t, done: true
          };
              return t;
        })
      };
        return l;
    });
    case UNCOMPLETE_TODO:
      return state.map(l => {
        if (l.id === action.listId) return { ...l, todos: l.todos.map(t => {
              if (t.id === action.todoId) return { ...t, done: false
          };
              return t;
        })
      };
        return l;
    });
    case ADD_LIST: {
      return state.concat([
        { name: action.name, id: uuidv1(), todos: []
        }
      ]);
    }
    case DELETE_LIST: {
      return state.filter(l => l.id !== action.listId);
    }
    case CLEAR_LIST: {
      return state.map(l => {
        if (l.id === action.listId) return { ...l, todos: []
        };
        return l;
      });
    }
    case ADD_TODO:
      return state.map(l => {
        if (l.id === action.listId) {
          l.todos = l.todos.concat([
          { ...action.todo, id: uuidv1()
          }
        ]);
          return l;
      }
        return l;
    });
    default:
      return state;
  }
}
function activeList(state = null, action) {
  switch (action.type) {
    case CHANGE_ACTIVE_LIST: 
      return action.activeList;
    case CLEAR_LIST:
      return null
    case DELETE_LIST:
      return null
    default:
      return state;
  }
}
function todos(state = [], action) {
  switch (action.type) {
    case COMPLETE_TODO:
      return state.map(t => {
        if (t.id === action.todoId)
          return {
            ...t,
            done: true
      }
        return t
    })
    case UNCOMPLETE_TODO:
      return state.map(t => {
        if (t.id === action.todoId)
          return {
            ...t,
            done: false
      }
        return t
    })
    case CHANGE_ACTIVE_LIST: 
      return action.activeList.todos
    case ADD_TODO:
      return state.concat([
      { ...action.todo, id: uuidv1()
      }
    ])
    case CLEAR_LIST:
      return []
    case DELETE_LIST:
      return []
    default:
      return state;
  }
}
function completed(state = 0, action) {
  switch (action.type) {
    case COMPLETE_TODO:
      return state + 1;
    case UNCOMPLETE_TODO:
      return state - 1;
    case ADD_TODO:
      return action.todo.done ? state + 1 : state;
    default:
      return state;
  }
} 
function totalOfTodos(state = 0, action) {
  switch (action.type) {
    case ADD_TODO:
      return state + 1;
    case REMOVE_TODO:
      return state - 1;
    default:
      return state;
  }
} 
const reducers = combineReducers({
  lists,
  activeList,
  todos,
  completed,
  totalOfTodos
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [];
const initialState = {};

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store
