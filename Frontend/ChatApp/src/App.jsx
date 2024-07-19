import React,{lazy} from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgetPassword";
import Feedback from "./pages/Feedback";
import LandingPage from "./pages/LandingPage";
import Chatbot from "./pages/Chatbot";


const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/SignUp"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

let user = false;
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<ProtectRoute user={user}/>}>
        <Route path="/home" element={ <Home />}></Route>
        <Route path="/chat/:chatId" element={<Chat />}></Route>
        <Route path="/groups" element={<Groups />}></Route>
       
        </Route>
        <Route element={<ProtectRoute user={!user} redirect="/"/>}>
         <Route path="/" element={<LandingPage></LandingPage>}></Route> 
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/forgetPassword" element={<ForgotPassword/>}></Route>
        <Route path = '/resetPassword/:id/:token' element={<ResetPassword/>}></Route>
        <Route path = '/dashboard'element ={<Dashboard/>} ></Route>
        <Route path = '/chatbot' element = {<Chatbot/>}></Route>
        <Route path = '/feedback' element = {<Feedback/>}></Route>
        </Route>
        <Route path = '*' element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
