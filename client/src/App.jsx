import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import InvoicePage from "./pages/InvoicePage";
import CustomersPage from "./pages/CustomersPage";
import StatisticPage from "./pages/StatisticPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProductPage from "./pages/ProductPage";
import AccountsPage from "./pages/AccountsPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import BlockchainStats from "./pages/BlockchainStats";

function App() {
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/invoices" element={<InvoicePage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/statistics" element={<StatisticPage />} />
        <Route path="/bstatistics" element={<BlockchainStats />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
