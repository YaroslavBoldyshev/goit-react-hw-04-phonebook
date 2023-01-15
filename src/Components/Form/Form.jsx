import PropTypes from "prop-types";
import styled from "styled-components";
import { useState } from "react";
import { Button } from "../common/Button/Button";
import { Label } from "../common/Label/Label";

const Form = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(name, number);

    setName("");
    setNumber("");
  };

  return (
    <ContactsForm onSubmit={handleSubmit}>
      <Label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </Label>

      <Label>
        Phone Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={(e) => setNumber(e.currentTarget.value)}
        />
      </Label>

      <Button type="submit">Add contact</Button>
    </ContactsForm>
  );
};

export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func,
};

const ContactsForm = styled.form`
  border: 1px solid black;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  button {
    width: 100px;
  }
`;
