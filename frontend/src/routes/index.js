import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";

import Home from "../pages/home";
import SignIn from "../pages/SignIn";
import StudentList from "../pages/Students/List";
import StudentForm from "../pages/Students/Form";
import PlanList from "../pages/Plans/List";
import PlanForm from "../pages/Plans/Form";
import HelpOrder from "../pages/HelpOrder";
import Enrollments from "../pages/Enrollments";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/home" component={Home} isPrivate />

      <Route path="/students/list" component={StudentList} isPrivate />
      <Route path="/students/edit/:id/" component={StudentForm} isPrivate />
      <Route path="/students/new" component={StudentForm} isPrivate />

      <Route path="/plans/list" component={PlanList} isPrivate />
      <Route path="/plans/edit/:id" component={PlanForm} isPrivate />
      <Route path="/plans/new" component={PlanForm} isPrivate />

      <Route path="/enrollments" component={Enrollments} isPrivate />
      <Route path="/help-orders" component={HelpOrder} isPrivate />

      <Route path="/" component={() => <h1>Página não encontrada</h1>} />
    </Switch>
  );
}
