export const initialState = [];

export function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case 'addItem':
      return state.concat(action.payload);
    case 'deleteItem': 
      return state.filter(item => item._id !== action.payload);
    case 'toggleComplete':
      return state.map(item => item._id === action.payload ? { ...item, complete: !item.complete, } : item);
    case 'GET':
      return action.payload; 
    case 'PUT': 
      return state.map(item => item._id === action.payload.id ? action.payload.record : item); 
    default:
      return state;
  }
}

const API = 'https://api-js401.herokuapp.com/api/v1/todo';

export const actions = {};

//Non-Connected Actions

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

//Connected Actions

actions.get = (items) => ({
  type: 'GET',
  payload: items,
});

actions.put = (id, record) => ({
  type: 'PUT',
  payload: {
    id,
    record,
  },
});

actions.loadToDoList = () => {
  return (dispatch) => {
    fetch(API)
      .then(results => results.json())
      .then(body => {
        dispatch(actions.get(body.results));
      })
  }
};

actions.updateItem = (item) => {
  let id = item._id;
  console.log(item);
  return dispatch => {
    fetch(`${API}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(res => res.json())
      .then(body => {
        console.log(body);
        dispatch(actions.put(id, body));
      })
  }
}