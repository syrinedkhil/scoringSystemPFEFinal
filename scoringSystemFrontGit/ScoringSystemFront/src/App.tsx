import React from "react";
import {
  createBrowserRouter,
  Route,
  Navigate,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import ScoringArticles from './Pages/ScoringArticles'
import SearchWeb from "./Pages/SearchWeb";

import Feed from "./Pages/Feed";

const App: React.FC = () => {
  const checkSession = () => {
    const accessToken = localStorage.getItem("accessToken");
   
    if (accessToken) {
      
      return <Navigate to="/home" />;
    } else {
      return <Navigate to="/signin" />;
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route >
        <Route path="/" element={<Home />}>
          <Route index path="/home" element={<Dashboard />} />
          <Route path="/score" element={<ScoringArticles />} />
          <Route path="/search" element={<SearchWeb />} />
          <Route path="/feed" element={<Feed />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
