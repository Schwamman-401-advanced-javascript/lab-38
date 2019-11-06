export const initialState = [];

export function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case 'toggleComplete':
      return state.map(item => item._id === action.payload ? { ...item, complete: !item.complete, } : item);
    case 'GET':
      return action.payload; 
    case 'POST':
      return state.concat(action.payload);
    case 'PUT': 
      return state.map(item => item._id === action.payload.id ? action.payload.record : item); 
    case 'DELETE': 
      return state.filter(item => item._id !== action.payload);
    default:
      return state;
  }
}

const API = 'https://api-js401.herokuapp.com/api/v1/todo';

export const actions = {};

//Non-Connected Actions

actions.addItem = (item) => {
  return { 
    type: 'POST', 
    payload: item,
  };
};

actions.delete = (id) => {
  return {
    type: 'DELETE',
    payload: id,
  }
};

actions.toggleComplete = (id) => {
  return {
    type: 'toggleComplete',
    payload: id,
  }
};

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

//Connected Actions
actions.loadToDoList = () => {
  return (dispatch) => {
    fetch(API)
      .then(results => results.json())
      .then(body => {
        dispatch(actions.get(body.results));
      })
  }
};

actions.postItem = (item) => {
  return dispatch => {
    fetch(API, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(res => res.json())
      .then(body => {
        dispatch(actions.addItem(body));
      })
  }
}

actions.updateItem = (item) => {
  let id = item._id;
  return dispatch => {
    fetch(`${API}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(res => res.json())
      .then(body => {
        dispatch(actions.put(id, body));
      })
  }
}

actions.deleteItem = (id) => {
  return dispatch => {
    fetch(`${API}/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(body => {
        dispatch(actions.delete(id));
      })
  }
}