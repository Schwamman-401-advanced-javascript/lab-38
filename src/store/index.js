import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer as todoList } from './todoList/todoList-reducer';
import { reducer as details } from './details/details-reducer';
import { reducer as item } from './item/item-reducer';

let reducer = combineReducers({
  todoList,
  details,
  item,
});

export default function() {
  return createStore(reducer, composeWithDevTools());
}