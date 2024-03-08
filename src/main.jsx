import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PlayersProvider } from './PlayersContext';
import "./index.css";
import RootLayout from "./layout/RootLayout"

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import {
  Question,
  NotFound,
  SingleQuestion,
  Success,
} from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
        <Route index element={<App />} />
        <Route path="question" element={<Question />} />
        <Route path="question/:id" element={<SingleQuestion />} />
      <Route path="finish" element={<Success />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PlayersProvider>
      <RouterProvider router={router} />
    </PlayersProvider>
  </React.StrictMode>
);
