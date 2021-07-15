import React, { useState } from 'react';
import { actions, store } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

export const ContactsBook = () => {
  const [currentUser, setCurrentUser] = useState(false);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [pager, setPager] = useState('');

  const dispatch = useDispatch();
  const users = useSelector((state) => state);

  store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  });

  function createNewContact() {
    let newContact = {
      name,
      lastname,
      age,
      pager
    };

    setName('');
    setLastname('');
    setAge('');
    setPager('');
    setCurrentUser(false);

    return newContact;
  }

  function changeState(person) {
    setCurrentUser(true);
    setName(person.name);
    setLastname(person.lastname);
    setAge(person.age);
    setPager(person.pager);
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last name</th>
            <th scope="col">Age</th>
            <th scope="col">Pager</th>
          </tr>
        </thead>
        <tbody>
          {users.map((person) => (
            <tr key={person.pager}>
              <td>{person.name}</td>
              <td>{person.lastname}</td>
              <td>{person.age}</td>
              <td>{person.pager}</td>
              <td><button type='button' className="btn btn-danger mr-1" onClick={() => dispatch(actions.delete(person))}>
                REMOVE
              </button></td>
              <td>
                <button className="btn btn-warning" onClick={() => changeState(person)}>
                  CHANGE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex p-2">
        <form className="form">
          <div class="form-group">
            <label for="name">Enter name</label><br />
            <input id="name" type="text" value={name} onChange={(ev) => { ev.preventDefault(); setName(ev.target.value.trim()) }}></input>
          </div>
          <div class="form-group">
            <label for="lastname">Enter last name</label><br />
            <input id="lastname" type="text" value={lastname} onChange={(ev) => { ev.preventDefault(); setLastname(ev.target.value.trim()) }}></input>
          </div>
          <div class="form-group">
            <label for="lastname">Enter age</label><br />
            <input id="age" type="number" value={age} onChange={(ev) => setAge(ev.target.value)}></input>
           
          </div>
          <div class="form-group">
            <label for="lastname">Enter pager</label><br />
            <input id="age" type="number" value={pager} onChange={(ev) => setPager(ev.target.value)}></input>
          </div>
          <button type='button' className="btn btn-primary mr-1" onClick={() => {
            if (name && lastname && age && pager) {
              dispatch(actions.change(createNewContact()));
            }
          }
          }>
            {currentUser ? 'CHANGE' : 'ADD'}
          </button>


        </form>
      </div>
    </>
  )
}
