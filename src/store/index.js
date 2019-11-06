import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from './middleware/logger';
import thunk from './middleware/thunk';

import { reducer as todoList } from './todoList/todoList-reducer';
import { reducer as details } from './details/details-reducer';
import { reducer as item } from './item/item-reducer';

let reducers = combineReducers({
  todoList,
  details,
  item,
});

export default function() {
  return createStore(reducers, composeWithDevTools(applyMiddleware(logger, thunk)));
}