import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Users from "./Pages/dashboard pages/users";
import Overview from "./Pages/dashboard pages/overview";
import Devices from "./Pages/dashboard pages/devices";
import NotFound from "./Component/NotFound";
import LoginPage from "./Pages/auth/LoginPage";
import Signup from "./Pages/auth/Signup";
import AdminProfile from "./Pages/dashboard pages/AdminProfile";
import AddAdmin from "./Pages/dashboard pages/AddAdmin";
import UserLogin from "./Pages/auth/UserLogin";
import UserSignup from "./Pages/auth/UserSignup";
import SpecificUser from "./Pages/dashboard pages/SpecificUser";
import SpecificDevice from "./Pages/dashboard pages/SpecificDevice";
import UserOverview from "./Pages/User Dashboard/UserOverview";
import CompareDevices from "./Pages/User Dashboard/CompareDevices";
import TotalEnergy from "./Pages/User Dashboard/TotalEnergy";
import UserProfile from "./Pages/User Dashboard/UserProfile";
import EnergyCost from "./Pages/User Dashboard/EnergyCost";
import PeakUsageTimes from "./Pages/User Dashboard/PeakUsageTimes";
import BAhaa from "./Pages/dashboard pages/BAhaa";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/*ADMIN*/}
          <Route path="/dashboard" element={<Overview />}></Route>
          <Route path="/users-page" element={<Users />} />
          <Route path="/devices-page" element={<Devices />}></Route>
          <Route path="/user/:id" element={<SpecificUser />}></Route>
          <Route path="/device/:id" element={<SpecificDevice />}></Route>
          <Route path="/admin/:id" element={<AdminProfile />}></Route>
          <Route path="/Login" element={<LoginPage />}></Route>
          <Route path="/Signup" element={<AddAdmin />}></Route>
          {/*User*/}
          <Route path="/User-Dashboard" element={<UserOverview />}></Route>
          <Route path="/BAhaa" element={<BAhaa />}></Route>
          <Route path="/TotalEnergy" element={<TotalEnergy />}></Route>
          <Route path="/Energy-Cost" element={<EnergyCost />}></Route>
          <Route path="/CompareDevices" element={<CompareDevices />}></Route>
          <Route path="/PeakUsageTimes" element={<PeakUsageTimes />}></Route>
          <Route path="/userProfile/:id" element={<UserProfile />}></Route>
          <Route path="/User-login" element={<UserLogin />}></Route>
          <Route path="/User-signup" element={<UserSignup />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
