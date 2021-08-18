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
import { Provider } from 'react-redux';
import { persistor, store } from './core/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './views/Search';
import MyInput from './views/AddCourse';
import CategoryManager from './views/CategoryManage';

ReactDOM.render(
  <BrowserRouter>
    <ToastContainer />
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Switch>
          <Route path="/course/:id" component={CourseDetail} />
          <Route path="/search" component={Search} />
          <Route path="/myprofile" component={Profile} />
          <Route path="/add-course" component={MyInput} />
          <Route path="/category-manager" component={CategoryManager} />
          <Route path="/" component={Home} />
        </Switch>
      </PersistGate>
    </Provider>
    <MessengerCustomerChat pageId="104971585166877" appId="324107322422057" />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
