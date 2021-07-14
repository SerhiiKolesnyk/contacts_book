import { createStore } from 'redux';
import contacts from "../api/contacts.json";

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : [...contacts];
// const persistedState = [...contacts];

const ADD = 'ADD';
const CHANGE = 'CHANGE';
const DELETE = 'DELETE';

export const actions = {
  add: (user) => ({ type: ADD, user }),
  change: (user) => ({ type: CHANGE, user }),
  delete: (user) => ({ type: DELETE, user }),
}

const usersReducer = function (users = persistedState, action) {
  switch (action.type) {
    case "ADD":
      return [...users, action.user];
    case "DELETE":
      return users.filter(item => item.pager !== action.user.pager);
    case "CHANGE":
      return [...users.filter(item => (item.name.toLowerCase() !== action.user.name.toLowerCase() && item.lastname.toLowerCase() !== action.user.lastname.toLowerCase())), action.user];
    default:
      return users;
  }
};

export const store = createStore(usersReducer);