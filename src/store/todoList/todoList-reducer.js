export const initialState = [];

export function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case 'addItem':
      return state.concat(action.payload);
    case 'deleteItem': 
      return state.filter(item => item._id !== action.payload);
    case 'toggleComplete':
      return state.map(item => item._id === action.payload ? { ...item, complete: !item.complete, } : item);
    default:
      return state;
  }
}

const API = 'https://api-js401.herokuapp.com/api/v1/todo';

export const actions = {};

actions.addItem = (item) => {
  return { 
    type: 'addItem', 
    payload: item,
  };
};

actions.deleteItem = (id) => {
  return {
    type: 'deleteItem',
    payload: id,
  }
};

actions.toggleComplete = (id) => {
  return {
    type: 'toggleComplete',
    payload: id,
  }
};

actions.loadToDoList = () => {

  return (dispatch) => {
    fetch(API)
      .then(results => results.json())
      .then(body => {
        console.log(body);
        dispatch(actions.addItem(body.results));
      })

  }
};