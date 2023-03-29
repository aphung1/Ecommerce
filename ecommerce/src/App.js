import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { light } from "@mui/material/styles/createPalette";
import SignUp from "./SignUp";
import Login from "./Login";
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="" element={<RequireAuth />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
