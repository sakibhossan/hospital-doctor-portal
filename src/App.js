
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Appointment from './Pages/Appointment/Appointment';
import About from './Pages/Home/About/About';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import RequireAuth from './Pages/Login/RequireAuth';
import SignUp from './Pages/Login/SignUp';
import Navbar from './Pages/Shared/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashborad from './Pages/Dashboard/Dashborad';
import MyAppointments from './Pages/Dashboard/MyAppointments';
import MyReview from './Pages/Dashboard/MyReview';
import MyHistory from './Pages/Dashboard/MyHistory';
import Users from './Pages/Dashboard/Users';
import RequireAdmin from './Pages/Login/RequireAdmin';
import AddDoctor from './Pages/Dashboard/AddDoctor';
import ManageDoctors from './Pages/Dashboard/ManageDoctors';
import Payment from './Pages/Dashboard/Payment';

function App() {
  return (
    <div className='px-12 max-w-7xl mx-auto'>
     <Navbar></Navbar>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/appointment" element={<RequireAuth><Appointment/></RequireAuth>} >
        </Route>
        <Route path="/dashboard" element={<RequireAuth><Dashborad/></RequireAuth>} >
        <Route index  element={<MyAppointments></MyAppointments>}/>
<Route path="review"  element={<MyReview></MyReview>}/>
<Route path="payment/:id"  element={<Payment></Payment>}/>
<Route path="history"  element={<MyHistory></MyHistory>}/>
<Route path="users"  element={<RequireAdmin><Users></Users></RequireAdmin>}/>
<Route path="addDoctor"  element={<RequireAdmin><AddDoctor></AddDoctor></RequireAdmin>}/>
<Route path="manageDoctor"  element={<RequireAdmin><ManageDoctors></ManageDoctors></RequireAdmin>}/>
          </Route>
      </Routes>
      <ToastContainer />
    
    </div>
  );
}

export default App;
