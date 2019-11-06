export const initialState = {};

export function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case 'modifyItem':
      return {...state, [action.name]: action.value};
    case 'resetItem':
      return initialState;
    default:
      return state;
  }
}

export function modifyItem(name, value) {
  return {
    type: 'modifyItem',
    name: name,
    value: value,
  };
}

export function resetItem() {
  return {
    type: 'resetItem'
  };
}


