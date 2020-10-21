//Import react
import React, { useState } from "react";

//styles
import "../styles/form.css";

//Custom Hooks
import { useForm } from "../hooks/useForm";

//Custom components
import Input from "../components/Input";

//form values
const initialState = {
  name: "",
  email: "",
  km: "",
};

const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const kmRegex = /^\d+(\.\d{1,2})?(\d+)?$/;

const Home = () => {
  //set custom hook
  const [state, handleChange, reset] = useForm(initialState);

  //creating form message
  const [error, setError] = useState([]);
  const [newClass, setNewClass] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const { name, email, km } = state;

  const inputs = [
    {
      name: "name",
      value: name,
      required: true,
      className: "form_input",
    },
    {
      name: "email",
      value: email,
      required: true,
      className: "form_input",
      type: "email",
    },
    {
      name: "km",
      value: km,
      required: true,
      className: "form_input",
    },
  ];

  const verifyForm = () => {
    let errorArray = [];
    //No empty inputs
    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      km.trim().length === 0
    ) {
      errorArray = [...errorArray, "The fields should not be empty"];
    }

    if (!nameRegex.test(name)) {
      errorArray = [...errorArray, "The name is not valid"];
    }
    if (!emailRegex.test(email)) {
      errorArray = [...errorArray, "The email is not valid"];
    }
    if (!kmRegex.test(km)) {
      errorArray = [...errorArray, "The km is not valid"];
    }

    if (errorArray.length > 0) {
      setError([...errorArray]);
      return true;
    }

    setError([]);
    return false;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const verify = verifyForm();

    if (!verify) {
      setNewClass("activate");
      km > 4
        ? setResultMessage("good_healthy")
        : setResultMessage("bad_healthy");
    }
  };

  const back = () => {
    setNewClass("");
    //reset();
  };

  return (
    <div className="form_container ">
      <form onSubmit={onSubmit} className={`form_content ${newClass}`}>
        <h1 className="form_title">How much do you walk a week?</h1>
        <div className="form_error">
          {error.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
        {inputs.map((input) => (
          <Input
            key={input.name}
            name={input.name}
            onChange={handleChange}
            type={input.type}
            required={input.required}
            value={input.value}
            className={input.className}
          />
        ))}
        <button type="submit" className="form_submit">
          Send
        </button>
      </form>
      <div className={`results ${newClass}`}>
        <p className={`results_message ${resultMessage}`}>
          {km > 4 ? "Congratulations" : "You should walk more"}
        </p>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Weekly km: {km}</p>
        <button className="form_submit back" onClick={back}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Home;
