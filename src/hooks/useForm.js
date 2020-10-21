import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [state, setState] = useState(initialState);

  const reset = () => setState(initialState);

  const handleChange = ({ target }) => {
    const { value, name } = target;

    if (name === "name" || name === "lastName") {
      const splitName = value.split(" ");
      const firstUpper = splitName.map(
        (word) => `${word.trim().charAt(0).toUpperCase()}${word.substring(1)}`
      );
      const newValue = firstUpper.join(" ");
      setState({ ...state, [name]: newValue });
      return;
    }

    setState({ ...state, [name]: value });
  };

  return [state, handleChange, reset];
};
