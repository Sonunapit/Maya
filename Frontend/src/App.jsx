import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";
import { ChatProvider } from "./context/ChatContext.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";
import Landing from "./pages/Landing.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Chat from "./pages/Chat.jsx";
import Settings from "./pages/Settings.jsx";
import Profile from "./pages/Profile.jsx";

// login ke baad hi chat/socket start hota hai
function Protected() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/welcome" replace />; // pehle landing page
  return (
    <ChatProvider key={user.email}>
      <MainLayout />
    </ChatProvider>
  );
}

function GuestOnly({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<GuestOnly><Landing /></GuestOnly>} />
      <Route path="/login" element={<GuestOnly><AuthPage /></GuestOnly>} />
      <Route element={<Protected />}>
        <Route path="/" element={<Chat />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}