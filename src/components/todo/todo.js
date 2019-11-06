import React from 'react';
import uuid from 'uuid/v4';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux';

import { When } from '../if';
import Modal from '../modal';
import schema from '../../schema.json';

import { actions } from '../../store/todoList/todoList-reducer';
import { toggleDetails } from '../../store/details/details-reducer';
import { resetItem } from '../../store/item/item-reducer';

import './todo.scss';

const formUiSchema = {
  _id: { 'ui:widget': 'hidden' },
  __v: { 'ui:widget': 'hidden' },
  complete: { 'ui:widget': 'hidden' },
}

function toDo(props) {
  const { todoList, details, addItem, deleteItem, toggleComplete, toggleDetails, resetItem } = props;

  let addNewItem = (submitData) => {
    const defaults = { _id: uuid()};
    const newItem = Object.assign({}, submitData.formData, defaults);

    addItem(newItem);
    resetItem();
  };

  let showDetails = (id) => {
    let item = todoList.find(item => item._id === id);

    toggleDetails(item);
  }

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
                <span onClick={() => toggleComplete(item._id)}>
                  {item.text}
                </span>
                <button onClick={() => showDetails(item._id)}>
                  Details
                </button>
                <button onClick={() => deleteItem(item._id)}>
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
    deleteItem: (id) => dispatch(actions.delete(id)),
    toggleComplete: (id) => dispatch(actions.toggleComplete(id)),
    toggleDetails: (item) => dispatch(toggleDetails(item)),
    resetItem: () => dispatch(resetItem()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toDo);
