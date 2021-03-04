import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./App.module.css";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import ContactForm from "./ContactForm/ContactForm";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Title from "./Title/Title";
import Alert from "./Alert/Alert";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
    error: false,
  };

  addContact = (task) => {
    const searchSameName = this.state.contacts
      .map((cont) => cont.name)
      .includes(task.name);

    if (searchSameName) {
      this.setState(() => ({
        error: true,
      }));

      setTimeout(
        () =>
          this.setState(() => ({
            error: false,
          })),
        500
      );
    }
    // else if (task.name.length === 0) {
    //   alert("Fields must be filled!");
    // }
    else {
      const contact = {
        ...task,
        id: uuidv4(),
      };

      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter, contacts, error } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        {error ? <Alert title="Already exist" /> : <></>}

        <Title title="Phonebook" />

        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <CSSTransition
          in={contacts.length >= 1}
          classNames={styles}
          timeout={250}
          unmountOnExit
        >
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        </CSSTransition>
        <CSSTransition
          in={visibleContacts.length > 0}
          classNames={styles}
          timeout={250}
          unmountOnExit
        >
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        </CSSTransition>
      </div>
    );
  }
}
