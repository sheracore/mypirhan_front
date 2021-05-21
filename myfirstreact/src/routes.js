import React from "react";
const HomePage = React.lazy(() => import("./Container/Home"));
const NewPage = React.lazy(() => import("./Component/NewPage"));

const routes = [
  { path: "/", exact: true, component: HomePage },
  { path: "/new-page", exact: true, component: NewPage },
];

export default routes;
