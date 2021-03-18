import { Fragment, useState } from "react";
import { signup } from "../actions/auth";
const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "test",
    email: "test@gmail.com",
    password: "123456",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });
  const { name, email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };
    signup(user).then((data) => {
      console.log("Data", data);
      if (data && data.error) {
        setValues({ ...values, error: data.error, loading: false});
      } else {
        debugger;
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          loading: false,
          error: "",
          showForm: false,
          message: data.message,
        });
      }
    });

  };
  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      error: false,
      [name]: e.target.value,
    });
    console.log("Handle submit", e.target.value);
  };

  const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : "")
  const showError = () => (error ? <div className="alert alert-danger">{error}</div> : "")
  const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : "")
  const signupForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={name}
          onChange={handleChange("name")}
          className="form-control"
          placeholder="What is your name?"
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          value={email}
          onChange={handleChange("email")}
          className="form-control"
          placeholder="Tell me your email address.."
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          value={password}
          onChange={handleChange("password")}
          className="form-control"
          placeholder="Enter your password"
        />
      </div>
      <div>
        <button className="btn-primary">Signup</button>
      </div>
    </form>
  );

  return (
    <Fragment>
      {showMessage()}
      {showError()}
      {showLoading()}
      {showForm && signupForm()}
    </Fragment>
  );
};

export default SignupComponent;
