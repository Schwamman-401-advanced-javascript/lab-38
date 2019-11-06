import { reducer, initialState } from './details-reducer';
import { toggleDetails } from './details-reducer';

describe('Details Reducer', () => {

  it('can toggleDetails', () => {
    let item = {
      name: 'Testing',
      _id: 12345,
    };

    let updatedDetails = reducer(initialState, toggleDetails(item));
    expect(updatedDetails).toEqual({
      details: item,
      showDetails: true
    });
  });

})