import React, { Component } from 'react';
import './App.css';
import TopBar from "./Components/topbar/TopBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TodoList from "./Components/todos/TodoList";
import { Container } from "react-bootstrap";
import LoginPage from "./Components/login/LoginPage";
import InvestmentList from "./Components/investment/InvestmentList";
import PrivateRoute from "./Components/route/PrivateRoute";
import CategoryList from "./Components/categories/CategoryList";

class App extends Component {
  render() {
    return (<div>
      <TopBar />
      <Container fluid style={{ margin: "0", padding: "0" }} >
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} >
              <LoginPage />
            </Route>
            <PrivateRoute exact path={"/houses"}
              component={InvestmentList}
            />
            <PrivateRoute path={"/categories/:t"}
              component={CategoryList}
            />
            <PrivateRoute path={"/category/:t/house/:t/todos"}
              component={TodoList}
            />
          </Switch>
        </BrowserRouter>
      </Container>
    </div>
    );
  }
}

export default App;
