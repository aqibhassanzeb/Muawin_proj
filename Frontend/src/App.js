import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./componenets/pages/register";
import Login from "./componenets/pages/login";
import Dashboard from "./componenets/pages/dashboard";
import Contact from "./componenets/pages/contact";
import ForgotPassword from "./componenets/pages/forgot_password";
import RecoverPassword from "./componenets/pages/recover_password";
import Profile from "./componenets/pages/profile";
import Reports from "./componenets/pages/reports";
import MemberManagement from "./componenets/pages/member_management";
import Lockscreen from "./componenets/pages/lockscreen";
import MemberDirectory from "./componenets/pages/member_directory";
import Addevent from "./componenets/pages/addevent";
import Updateevent from "./componenets/pages/updateevent";
import Eventdetails from "./componenets/pages/eventdetails";
import Eventdirectory from "./componenets/pages/eventdirectory";
import Compose from "./componenets/pages/compose";
import Read from "./componenets/pages/read";
import Inbox from "./componenets/pages/inbox";
import Donations from "./componenets/pages/donations";
import Literature from "./componenets/pages/literature";
import Configuration from "./componenets/pages/configuration";
import Terms from "./componenets/pages/terms";
import { Toaster } from "sonner";
import VerifyOTP from "./componenets/pages/verifyotp";
import ResetPassword from "./componenets/pages/reset_password";
import UnderConstruction from "./componenets/pages/underconstruction";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/recover" element={<RecoverPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/membermanagement" element={<MemberManagement />} />
          <Route path="/lock" element={<Lockscreen />} />
          <Route path="/directory" element={<MemberDirectory />} />
          <Route path="/addevent" element={<Addevent />} />
          <Route path="/updateevent" element={<Updateevent />} />
          <Route path="/eventdetails" element={<Eventdetails />} />
          <Route path="/eventdirectory" element={<Eventdirectory />} />
          <Route path="/compose" element={<Compose />} />
          <Route path="/read" element={<Read />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/literature" element={<Literature />} />
          <Route path="/config" element={<Configuration />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/under-construction" element={<UnderConstruction />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
