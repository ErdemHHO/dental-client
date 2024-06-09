import Homepage from "./pages/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import FormPage from "./pages/FormPage";
import { ToastContainer } from "react-toastify";
import AllQuery from "./pages/AllQuery";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/all-query" element={<AllQuery />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
