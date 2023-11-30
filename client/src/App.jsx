import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About, Home, Profile, Signin, Signup } from "./pages";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/about"} element={<About />} />
        <Route path={"/signin"} element={<Signin />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path={"/profile"} element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
