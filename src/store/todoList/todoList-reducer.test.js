import { reducer } from './todoList-reducer';
import { addItem, deleteItem, toggleComplete } from './todoList-reducer';

describe('TodoList Reducer', () => {
  it('can add an item', () => {
    const state = [];
    Object.freeze(state);
    const item = { name: "item1"}
    let action = addItem(item);

    let updatedState = reducer(state, action);

    expect(updatedState).toEqual([{ name: "item1" }]);
  });

  it('can delete an item by _id', () => {
    const state = [];
    Object.freeze(state);
    const item = { 
      name: "item1",
      _id: 12345,
    }
    let add = addItem(item);
    let deleteID = deleteItem(12345);

    let addedState = reducer(state, add);
    expect(addedState).toEqual([{ name: "item1", _id: 12345 }]);
    
    let deletedState = reducer(addedState, deleteID)
    expect(deletedState).toEqual([]);
  });

  it('can toggle if an item has been completed', () => {

    const state = [{ 
        name: "item1",
        _id: 12345,
        complete:false,
      },
      { 
        name: "item2",
        _id: 55555,
        complete:true,
      }];
    Object.freeze(state);

    let updatedState = reducer(state, toggleComplete(12345));
    let updatedState2 = reducer(state, toggleComplete(55555));

    expect(updatedState[0].complete).toEqual(true);
    expect(updatedState[1].complete).toEqual(true);
    expect(updatedState2[0].complete).toEqual(false);
    expect(updatedState2[1].complete).toEqual(false);
  })

})