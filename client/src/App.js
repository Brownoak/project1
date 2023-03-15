import "./index.css";
import HomePage from "./scenes/homePage";
import HomePageTwo from "./scenes/homePageTwo";
import LoginPage from "./scenes/loginPage";
import NavBar from "./scenes/navBar";
import RegisterPage from "./scenes/registerPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <NavBar/> */}
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="register" element={<RegisterPage />}></Route>
        <Route path="home" element={<HomePage />}></Route>
        <Route path="homee" element={<HomePageTwo />}></Route>
      </Routes>
    </>
  );
}

export default App;
