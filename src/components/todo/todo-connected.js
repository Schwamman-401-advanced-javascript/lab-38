import React, { useEffect } from 'react';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux';

import { When } from '../if';
import Modal from '../modal';
import schema from '../../schema.json';

import { actions } from '../../store/todoList/todoList-reducer';
import { toggleDetails } from '../../store/details/details-reducer';
import { resetItem } from '../../store/item/item-reducer';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const formUiSchema = {
  _id: { 'ui:widget': 'hidden' },
  __v: { 'ui:widget': 'hidden' },
  complete: { 'ui:widget': 'hidden' },
}

const ToDo = (props) => {
  const { todoList, details, loadToDoList, updateItem, addItem, deleteItem, toggleComplete, toggleDetails, resetItem } = props;

  let handleInputChange = e => {
    let { name, value } = e.target;
    this.setState(state => ({
      item: {...state.item, [name]: value},
    }));
  };

  let callAPI = (url, method='get', body, handler, errorHandler) => {

    return fetch(url, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(data => typeof handler === 'function' ? handler(data) : null )
      .catch( (e) => typeof errorHandler === 'function' ? errorHandler(e) : console.error(e)  );
  };

  let addNewItem = (e) => {

    e.preventDefault();
    e.target.reset();

    const _updateState = newItem =>
      this.setState(state => ({
        todoList: [...state.todoList, newItem],
      }));

    this.callAPI( todoAPI, 'POST', this.state.item, _updateState );

  };

  let removeItem = id => {

    const _updateState = () =>
      this.setState(state => ({
        todoList: state.todoList.filter(item => item._id !== id),
      }));

    this.callAPI( `${todoAPI}/${id}`, 'DELETE', undefined, _updateState );

  };

  let saveItem = updatedItem => {
    updateItem(updatedItem);
  };

  let setCompleted = id => {
    let item = todoList.find(i => i._id === id);
    if (item._id) {
      saveItem({
        ...item,
        complete: !item.complete,
      });
    }
  };

  let showDetails = id => {
    let item = todoList.find(item => item._id === id);
    toggleDetails(item);
  }

  useEffect(() => {
    loadToDoList();
  }, [loadToDoList]);

  return (
    <>
      <header>
        <h2>
          There are
          {todoList.filter( item => !item.complete ).length}
          Items To Complete
        </h2>
      </header>

      <section className="todo">

        <div>
          <h3>Add Item</h3>
          <Form 
            schema={schema}
            uiSchema={formUiSchema}
            onSubmit={addNewItem}
          />
        </div>

        <div>
          <ul>
            { todoList.map(item => (
              <li
                className={`complete-${item.complete.toString()}`}
                key={item._id}
              >
                <span onClick={() => setCompleted(item._id)}>
                  {item.text}
                </span>
                <button onClick={() => showDetails(item._id)}>
                  Details
                </button>
                <button onClick={() => removeItem(item._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <When condition={details.showDetails}>
        <Modal title="To Do Item" close={showDetails}>
          <div className="todo-details">
            <header>
              <span>Assigned To: {details.details.assignee}</span>
              <span>Due: {details.details.due}</span>
            </header>
            <div className="item">
              {details.details.text}
            </div>
          </div>
        </Modal>
      </When>
    </>
  );
}

function mapStateToProps(state) {
  return {
    todoList: state.todoList,
    details: state.details,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addItem: (item) => dispatch(actions.addItem(item)),
    deleteItem: (id) => dispatch(actions.deleteItem(id)),
    toggleComplete: (id) => dispatch(actions.toggleComplete(id)),
    toggleDetails: (item) => dispatch(toggleDetails(item)),
    resetItem: () => dispatch(resetItem()),
    loadToDoList: () => dispatch(actions.loadToDoList()),
    updateItem: (item) => dispatch(actions.updateItem(item)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDo);
