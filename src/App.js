//Import react
import React, { useState } from "react";

//Custom Hooks
import { useForm } from "./hooks/useForm";

//Custom components
import Input from "./components/Input";

//form values
const initialState = {
  name: "",
  email: "",
  km: "",
};

const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const kmRegex = /\d+(\.\d{1,2})?/;

const App = () => {
  //set custom hook
  const [state, handleChange, reset] = useForm(initialState);

  //creating form message
  const [message, setMessage] = useState("");

  const { name, email, km } = state;

  const inputs = [
    {
      name: "name",
      value: name,
      required: true,
    },
    {
      name: "email",
      value: email,
      required: true,
      type: "email",
    },
    {
      name: "km",
      value: km,
      required: true,
    },
  ];

  const verifyForm = () => {
    //No empty inputs
    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      km.trim().length === 0
    ) {
      setMessage("The fields should not be empty");
      return true;
    }

    if (!nameRegex.test(name)) {
      setMessage("The name is not valid");
      return true;
    }
    if (!emailRegex.test(email)) {
      setMessage("The email is not valid");
      return true;
    }
    if (!kmRegex.test(km)) {
      setMessage("The km is not valid");
      return true;
    }

    return false;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const verify = verifyForm();

    if (!verify) {
      reset();
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {inputs.map((input) => (
          <Input
            key={input.name}
            name={input.name}
            onChange={handleChange}
            type={input.type}
            required={input.required}
            value={input.value}
          />
        ))}
        <button type="submit">Enviar</button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default App;
