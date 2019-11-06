export const initialState = [];

export function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case 'addItem':
      return [...state, action.payload];
    case 'deleteItem': 
      return state.filter(item => item._id !== action.payload);
    case 'toggleComplete':
      return state.map(item => item._id === action.payload ? { ...item, complete: !item.complete, } : item);
    default:
      return state;
  }
}

export function addItem(item) {
  return { 
    type: 'addItem', 
    payload: item,
  };
}

export function deleteItem(id) {
  return {
    type: 'deleteItem',
    payload: id,
  }
}

export function toggleComplete(id) {
  return {
    type: 'toggleComplete',
    payload: id,
  }
}