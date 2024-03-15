import React from 'react';
import { Route } from 'react-router-dom';
import { LoginPage, Register } from '../components/user';
const admin = JSON.parse(localStorage.getItem("admin"));

export  const  routes =  [
  <Route path="/register" component={Register} exact key="create" />,
  <Route path="/login" component={LoginPage} exact strict key="login" />
];