import { createStore, combineReducers, applyMiddleware, compose
} from "redux";

//actions
export const DECREMENT = "DECREMENT";
export const INCREMENT = "INCREMENT";
export const INCREMENT_AMOUNT = "INCREMENT_AMOUNT";
export const ZERO = "ZERO";
export const GETNAME = "GETNAME";


// dispatchers
export const decrement = () => {
  return {
    type: DECREMENT
  }
}

export const increment = () => {
  return {
    type: INCREMENT
    // Não passa o payload porque não tem argumentos
  }
}

// disparador de ação deve ter somente o type e o payload (dispatcher)
export const incrementAmount = (amount) => {
  return {
    type: INCREMENT_AMOUNT,
    amount
  }
}

export const zero = () => {
  return {
    type: ZERO
  }
}

export const getName = () => {
  return {
    type: GETNAME
  }
}


//reducers
const counter = (state = 10, action) => {
  switch (action.type) {
    case DECREMENT:
      return state - 1
    case INCREMENT:      
      return state + 1
    case INCREMENT_AMOUNT:
       return state + action.amount
    case ZERO:
       return state = 0
    default:
      return state;
  }
}

const user = (state = "Rony", action) => {
  switch (action.type) {
    case GETNAME:
       return state        
    default:
      return state;
  }
}

const reducers = combineReducers({
  counter, user
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [];
const initialState = {};

// função que foi importada do Redux
const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store
