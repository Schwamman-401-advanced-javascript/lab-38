import { reducer, initialState } from './item-reducer';
import { resetItem, modifyItem } from './item-reducer';

describe('Item reducer', () => {
  it('can modify an item', () => {
    const state = {};
    Object.freeze(state);
    let action = modifyItem('name', 'testing');

    let modifiedItem = reducer(state, action);

    expect(modifiedItem).toEqual({ name: 'testing'})
  });

  it('can reset the item', () => {
    const state = {
      name: 'testing',
      _id: 41234,
    };
    Object.freeze(state);

    let blankItem = reducer(state, resetItem());

    expect(blankItem).toEqual(initialState);
  });
  
})