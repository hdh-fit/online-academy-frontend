import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './views/Home';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CourseDetail from './views/CourseDetail';
import MessengerCustomerChat from "react-messenger-customer-chat";
import Profile from './views/Profile';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/course/:id" component={CourseDetail} />
      <Route path="/myprofile" component={Profile} />
      <Route path="/" component={Home} />
    </Switch>
    <MessengerCustomerChat pageId="104971585166877" appId="324107322422057" />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
