import React, { useState, useEffect } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import { CircularProgress } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

let loaderStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
};

function App(props) {
  let [user, setUser] = useState();
  let [message, setMessage] = useState(false);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/details/")
      .then((res) => res.json())
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      });
  }, []);

  const handleSignUp = async (data) => {
    setLoading(true);
    let res = await fetch("/api/register", {
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(data),
    });
    res = await res.json();
    if (res.error) setMessage(res.error);
    else if (res.data) setMessage("Login with your new account");
    setUser(false);
    setLoading(false);
  };

  const handleSignIn = async (data) => {
    setLoading(true);
    let res = await fetch("/api/login", {
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    res = await res.json();
    if (res.error) setMessage(res.error);
    else setUser(res.data);
    setLoading(false);
  };

  const logOut = async () => {
    setLoading(true);
    let res = await fetch("/api/logout", {
      credentials: "same-origin",
      method: "GET",
    });
    res = await res.json();
    setUser(res.data);
    setLoading(false);
  };

  const invest = async (amount) => {
    let res = await fetch("/api/invest", {
      credentials: "same-origin",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });
    res = await res.json();
    setUser(res.data);
    if (res.data) setMessage(`Invested ${amount} rupees`);
  };

  return (
    <Router>
      <Switch>
        {loading ? (
          <CircularProgress style={loaderStyle} />
        ) : (
          <div>
            <Route path="/login" exact>
              {user ? <Redirect to="/" /> : false}
              <SignIn
                message={message}
                setMessage={setMessage}
                onSubmit={handleSignIn}
              />
            </Route>
            <Route path="/register" exact>
              {user ? <Redirect to="/" /> : false}
              <SignUp
                message={message}
                setMessage={setMessage}
                onSubmit={handleSignUp}
              />
            </Route>
            <Route path="/" exact>
              {!user ? <Redirect to="/login" /> : false}
              <Dashboard
                user={user}
                message={message}
                setMessage={setMessage}
                invest={invest}
                logOut={logOut}
              />
            </Route>
          </div>
        )}
      </Switch>
    </Router>
  );
}

export default App;
