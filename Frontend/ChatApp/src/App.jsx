import React, { lazy, Suspense, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Backdrop, createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import ProtectRoute from "./components/auth/ProtectRoute";
import Loader from "./components/Layout/Loader";
import { userExist, userNotExist } from "./Redux/reducers/auth";
import { SocketProvider } from "./socket";

// Non-Lazy Loaded Components (direct imports)
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgetPassword";
import Feedback from "./pages/Feedback";
import LandingPage from "./pages/LandingPage";
import Chatbot from "./pages/Chatbot";
import HomePage from "./pages/HomePage";
import Profile from "./pages/ChatSystem/Specific/Profile";
import { themeSettings } from "./theme";

// Lazy-loaded components
const Home = lazy(() => import("./pages/ChatSystem/Home"));
const Survey = lazy(() => import("./pages/Ai powered Assessment/survey"));
const Results = lazy(() => import("./pages/Ai powered Assessment/Results"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/SignUp"));
const Chat = lazy(() => import("./pages/ChatSystem/Chat"));
const Groups = lazy(() => import("./pages/ChatSystem/Groups"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Admin = lazy(() => import("./pages/Admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const FeedbackManagement = lazy(() =>
  import("./pages/Admin/FeedbackManagement")
);
const RequestsApproval = lazy(() => import("./pages/Admin/RequestsApproval"));
const ChatManagement = lazy(() => import("./pages/Admin/ChatManagement"));
const UserManagement = lazy(() => import("./pages/Admin/UserManagement"));
const Messages = lazy(() => import("./pages/Admin/MessageManagement"));
const RemoteCounselling = lazy(() =>
  import("./pages/Remote Counselling/RemoteCounselling")
);
const Contact = lazy(() => import("./pages/Remote Counselling/Contact"));
const DoctorDetailts = lazy(() =>
  import("./pages/Remote Counselling/DoctorDetailts")
);
const Services = lazy(() => import("./pages/Remote Counselling/Services"));
const Doctors = lazy(() => import("./pages/Remote Counselling/Doctors"));
const DoctorDashboard = lazy(() =>
  import("./pages/Remote Counselling/DoctorDashboard")
);
const UpdateProfile = lazy(() =>
  import("./pages/Remote Counselling/UpdateProfile")
);
const NotFound = lazy(() => import("./pages/NotFound"));
import { questions } from "./Constants/questionnaire.js";
import Appointments from "./pages/Remote Counselling/Appointments.jsx";
import MindwellHomeScreen from "./pages/Interactive Exercises/MeditationHomeScreen.jsx";
import MindfulnessVideo from "./pages/Interactive Exercises/Mindfulness_Video.jsx";
import MindfulnessAudio from "./pages/Interactive Exercises/Mindfulness_audio.jsx";
import MindfulnessMeditationPage from "./pages/Interactive Exercises/mindfulness_meditation.jsx";
import BreathingAudio from "./pages/Interactive Exercises/breathing_audio.jsx";
import BreathingVideo from "./pages/Interactive Exercises/breathing_video.jsx";
import BreathingExercisePage from "./pages/Interactive Exercises/breathing_exercise.jsx";
import JournalingPromptsPage from "./pages/Interactive Exercises/journaling_prompts.jsx";
import VideoCounselling from "./pages/Remote Counselling/VideoCounselling.jsx";
import VideoCallRoom from "./pages/Remote Counselling/VideoCallRoom.jsx";
import MyAppointment from "./pages/Remote Counselling/MyAppointment.jsx";
import DoctorAppointment from "./pages/Remote Counselling/DoctorAppointment.jsx";
import EducationalGame from "./pages/Mindful games/EducationalGame.jsx";
import MindGames from "./pages/Mindful games/MindGames.jsx";
import MoodManagementGame from "./pages/Mindful games/MoodManagementGame.jsx";
import GameSelection from "./pages/Mindful games/MindfulGames.jsx";
import Patient from "../../../Backend/Models/PaitentSchema.js";
import PatientDetail from "./pages/Remote Counselling/PatientDetail.jsx";
import EmotionMatchingGame from "./pages/Mindful games/EmotionMatchingGame.jsx";

export default function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (user?.role.toLowerCase() === "doctor") {
      axios
        .get("http://localhost:5000/api/doctor/get/myprofile", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then(({ data }) => {
          if (data) {
            dispatch(userExist(data.doctor));
          }
        })
        .catch(() => {
          dispatch(userNotExist());
        });
    }
    axios
      .get("http://localhost:5000/api/get/myprofile", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        if (data) {
          dispatch(userExist(data.patient));
        }
      })
      .catch(() => {
        dispatch(userNotExist());
      });
  }, [dispatch]);

  return (
    <BrowserRouter>
      {/* Suspense Boundary for Fallback */}
      <Suspense
        fallback={
          <Backdrop open>
            <Loader />
          </Backdrop>
        }
      >
        <Routes>
          {/* Protected Routes for Patient */}
          <Route
            element={
              <SocketProvider>
                <ProtectRoute isProtected={true} />
              </SocketProvider>
            }
          >
            <Route path="/survey" element={<Survey questions={questions} />} />
            <Route
              path="/results"
              element={<Results />}
            />
            <Route path="/groups" element={<Groups />} />
            <Route path="/chatinbox" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/remote-counselling" element={<RemoteCounselling />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctor/:id" element={<DoctorDetailts />} />
            <Route path="/interactive-exercises" element={<MindwellHomeScreen/>}/>
            <Route path = '/mindfulness_video' element = {<MindfulnessVideo/>}/>
            <Route path = '/mindfulness_audio' element = {<MindfulnessAudio/>}/>
            <Route path = '/mindfulness_meditation' element = {<MindfulnessMeditationPage/>}/>
            <Route path = "/breathing_exercises" element = {<BreathingExercisePage/>}/>
            <Route path = "/breathing_audio" element = {<BreathingAudio/>}/>
            <Route path = "/breathing_video" element = {<BreathingVideo/>}/>
            <Route path = '/video-counselling/:meetingCode' element = {<VideoCounselling/>}/>
            <Route path = "/room/:roomId" element = {<VideoCallRoom/>}/>
            <Route path = 'remote-counselling/appointments' element = {<MyAppointment/>}/>
            <Route path = "/journaling_prompts" element = {<JournalingPromptsPage/>}/>
            <Route path = 'assessment' element = {<Survey/>}/>
            <Route path = 'results' element = {<Results/>}/>
            <Route path = 'educational-game' element = {<EducationalGame/>}/>
            <Route path = 'memory-game' element = {<MindGames/>}/>
            <Route path = 'mindful-games/mood-management' element={<EmotionMatchingGame/>}/>
            <Route path = 'mindful-games' element ={<GameSelection/>}/>

            <Route path="/services" element={<Services />} />
            <Route path="/profile" element={<Profile />}>
            
            </Route>
            <Route path="/mind-well" element={<HomePage />}>
              {" "}
            </Route>
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor/update-profile" element={<UpdateProfile />} />
            <Route path = "/doctor/registered-patients" element = {<Appointments/>}/>
            <Route path="/doctor/appointments" element={<DoctorAppointment/>} />
            <Route path = '/doctor/patient/:id/:appointmentId' element = {<PatientDetail/>}/>
          </Route>

          {/* Public Routes */}
          <Route element={<ProtectRoute isProtected={false} />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/forgetPassword" element={<ForgotPassword />} />
            <Route
              path="/resetPassword/:id/:token"
              element={<ResetPassword />}
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/chats" element={<ChatManagement />} />
            <Route path="/admin/feedback" element={<FeedbackManagement />} />
            <Route
              path="/admin/approval-requests"
              element={<RequestsApproval />}
            />
            <Route
              path="/admin/users-management"
              element={<UserManagement />}
            />
            <Route path="/admin/messages" element={<Messages />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {/* Toast notifications */}
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}
