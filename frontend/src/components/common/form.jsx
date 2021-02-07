import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";
import TextArea from "./textArea";

class Form extends Component {
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label, color = "btn btn-primary") {
    return (
      <button disabled={this.validate()} className={color}>
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        value={data[name]}
        label={label}
        name={name}
        type={type}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }
  renderTextArea(name, label, placeholder, rows, cols) {
    const { data, errors } = this.state;

    return (
      <TextArea
        value={data[name]}
        label={label}
        rows={rows}
        cols={cols}
        name={name}
        placeholder={placeholder}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
