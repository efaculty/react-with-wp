import React, { useContext, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import AppContext from "../context/AppContext";

const Login = () => {
  const [store, setStore] = useContext(AppContext);

  const [loginFields, setLoginFields] = useState({
    username: "",
    password: "",
    userNiceName: "",
    userEmail: "",
    loading: false,
    error: "",
  });

  const createMarkup = (data) => ({
    __html: data,
  });

  const onFormSubmit = (event) => {
    event.preventDefault();

    const siteUrl = "http://localhost/react/"; //clientConfig.siteUrl;

    const loginData = {
      username: loginFields.username,
      password: loginFields.password,
    };

    setLoginFields({ ...loginFields, loading: true });

    axios
      .post(`${siteUrl}/wp-json/jwt-auth/v1/token`, loginData)
      .then((res) => {
        if (undefined === res.data.token) {
          setLoginFields({
            ...loginFields,
            error: res.data.message,
            loading: false,
          });
          return;
        }

        const { token, user_nicename, user_email } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("userName", user_nicename);

        setStore({
          ...store,
          userName: user_nicename,
          token: token,
        });

        setLoginFields({
          ...loginFields,
          loading: false,
          token: token,
          userNiceName: user_nicename,
          userEmail: user_email,
        });
      })
      .catch((err) => {
        setLoginFields({
          ...loginFields,
          error: err.response.data.message,
          loading: false,
        });
      });
  };

  const handleOnChange = (event) => {
    setLoginFields({ ...loginFields, [event.target.name]: event.target.value });
  };

  const { username, password, userNiceName, error, loading } = loginFields;

  if (loading) {
    return <Redirect to="/" />;
  } else {
    return (
      <React.Fragment>
        <div className="text-center login">
          <main className="form-signin">
            {error && (
              <div
                className="alert alert-danger"
                dangerouslySetInnerHTML={createMarkup(error)}
              />
            )}
            <form onSubmit={onFormSubmit}>
              <img
                class="mb-4"
                src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg"
                alt=""
                width="72"
                height="57"
              />
              <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleOnChange}
                  placeholder="username"
                />
                <label for="username">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Password"
                />
                <label for="password">Password</label>
              </div>
              <br />
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Login
              </button>
            </form>
          </main>
        </div>
      </React.Fragment>
    );
  }
};

export default Login;
