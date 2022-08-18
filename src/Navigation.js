import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AddPage from "./pages/AddPage";
import AdminPage from "./pages/AdminPage";
import EditePage from "./pages/EditePage";
import AdminProvider from "./context/AdminProvider";
import UserProvider from "./context/UserProvider";
import LearnPage from "./pages/LearnPage";
import BasketPage from "./pages/BasketPage";
import MyNavbar from "./components/MyNavbar";

function Navigation() {
  return (
    <div>
      <AdminProvider>
        <UserProvider>
          <BrowserRouter>
            <MyNavbar />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/admin/add" element={<AddPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="admin/edit/:id" element={<EditePage />} />
              <Route path="/link" element={<LearnPage />} />
              <Route path="/basket" element={<BasketPage />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </AdminProvider>
    </div>
  );
}

export default Navigation;
