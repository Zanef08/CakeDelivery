import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddCake from "./pages/AddCake/AddCake";
import ListCakes from "./pages/ListCakes/ListCakes";
import ViewOrders from "./pages/ViewOrders/ViewOrders";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const url = "http://localhost:4000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/addCake" element={<AddCake url={url} />} />
          <Route path="/listCakes" element={<ListCakes url={url} />} />
          <Route path="/viewOrders" element={<ViewOrders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
