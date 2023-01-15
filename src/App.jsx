import "./App.css";
import styled from "styled-components";
import Form from "./Components/Form/Form";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { ContactsList } from "./Components/ContactsList/ContactsList";
import { SearchField } from "./Components/SearchField/SearchField";

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem("contacts")) ?? []
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const onSubmit = (name, number) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    if (contacts.find((el) => el.name === newContact.name)) {
      Notify.failure(`${newContact.name} is already in contacts`);
      return;
    }
    setContacts((prev) => [...prev, newContact]);
    setFilter("");
  };

  const filtredContacts = () =>
    contacts.filter((el) =>
      el.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );

  const onDelete = (id) => {
    setContacts((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <Section>
      <h1>Phonebook</h1>

      <Form onSubmit={onSubmit} />

      <h2>Contacts</h2>

      <SearchField
        value={filter}
        onChange={(e) => setFilter(e.currentTarget.value)}
      />

      <ContactsList contacts={filtredContacts()} onDelete={onDelete} />
    </Section>
  );
};

export default App;

const Section = styled.div`
  width: 500px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
