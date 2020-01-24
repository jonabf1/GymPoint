import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";

import Home from "../pages/home";
import SignIn from "../pages/SignIn";
import StudentList from "../pages/Students/List";
import StudentForm from "../pages/Students/Form";
import PlanList from "../pages/Plans/List";
import PlanForm from "../pages/Plans/Form";
import EnrollmentsList from "../pages/Enrollments/List";
import EnrollmentsForm from "../pages/Enrollments/Form";
import HelpOrder from "../pages/HelpOrder";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/home" component={Home} isPrivate />

      <Route path="/students/list" exact component={StudentList} isPrivate />
      <Route
        path="/students/edit/:id"
        exact
        component={StudentForm}
        isPrivate
      />
      <Route path="/students/new" exact component={StudentForm} isPrivate />

      <Route path="/plans/list" exact component={PlanList} isPrivate />
      <Route path="/plans/edit/:id" exact component={PlanForm} isPrivate />
      <Route path="/plans/new" exact component={PlanForm} isPrivate />

      <Route
        path="/enrollments/list"
        exact
        component={EnrollmentsList}
        isPrivate
      />
      <Route
        path="/enrollments/edit/:id"
        component={EnrollmentsForm}
        isPrivate
      />
      <Route path="/enrollments/new" component={EnrollmentsForm} isPrivate />

      <Route path="/help-orders" exact component={HelpOrder} isPrivate />
    </Switch>
  );
}
