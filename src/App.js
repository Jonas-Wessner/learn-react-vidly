import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import { NoticeContainer } from "./components/notificationService";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render = () => {
    return (
      <React.Fragment>
        <NoticeContainer />
        <NavBar />
        <div className="content">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            {/* :id means that the component will get this part fo the url passed
            in props.match.params as attribute with the name id */}
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  };
}

export default App;
