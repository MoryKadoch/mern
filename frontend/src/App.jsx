import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Logout from "./components/Logout";
import UserList from "./components/UserList";
import EditUserForm from "./components/EditUserForm";
import ProductList from "./components/ProductList";
import EditProductForm from "./components/EditProductForm";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<h1>Accueil</h1>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<PrivateRoute roleRequired="user" />}>
            <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="admin" element={<PrivateRoute roleRequired="admin" />}>
            <Route path="user-list" element={<UserList />} />
            <Route path="edit-user/:id" element={<EditUserForm />} />
            <Route path="product-list" element={<ProductList />} /> 
            <Route path="edit-product/:id" element={<EditProductForm />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
