import Home from '../pages/Home'
import Login from '../pages/Login'
import Services from '../pages/Services'
import Signup from '../pages/Signup'
import Contact from '../pages/Contact'
import Doctors from '../pages/Doctors/Doctors'
import DoctorDetails from '../pages/Doctors/DoctorDetails'
import CheckoutSuccess from '../pages/CheckoutSuccess'
import { Routes, Route } from 'react-router-dom'
// import MyAccount from '../Dashboard/user-account/MyAccount'
// import Dashboard from '../Dashboard/doctor-account/Dashboard'
import ProtectedRoute from "./ProtectedRoute"
import Appointments from '../Dashboard/doctor-account/Appointments'
import ScheduledAppointments from '../Dashboard/doctor-account/ScheduledAppointments'
import ScheduleTest from '../Dashboard/doctor-account/ScheduleTests'
import ShowScheduledTests from '../Dashboard/user-account/ShowScheduledTests'
import CreatePrescription from '../Dashboard/doctor-account/CreatePrescription'
import MyPrescriptions from '../Dashboard/user-account/MyPrescriptions'
import ViewPrescriptions from '../Dashboard/user-account/MyPrescriptions'
import AdminPanel from '../Dashboard/admin-account/Admin'
import Feedback from '../Dashboard/user-account/Feedback'
import PatientScheduledAppointments from '../Dashboard/user-account/PatientScheduledAppointments'
import AddMedicine from '../Dashboard/admin-account/AddMedicine'

const Routers = () => {
  return <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/home' element={<Home />} />
    <Route path='/doctors' element={<Doctors />} />
    <Route path='/doctors/:id' element={<DoctorDetails />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Signup />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/services' element={<Services />} />
    <Route path='/checkout-success' element={<CheckoutSuccess />} />

    <Route path='/appointments' element={
        <ProtectedRoute allowedRoles={["patient"]}>
          <Appointments/>
        </ProtectedRoute>
      } />
          <Route path='/scheduledAppointments' element={
        <ProtectedRoute allowedRoles={["doctor"]}>
          <ScheduledAppointments />
        </ProtectedRoute>
      } />
    
<Route
  path="/admin/panel"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminPanel />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/add-medicine"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AddMedicine />
    </ProtectedRoute>
  }
/>



<Route
      path="/users/my-prescriptions"
      element={
        <ProtectedRoute allowedRoles={["patient"]}>
          <ViewPrescriptions/>
        </ProtectedRoute>
      }
    />

<Route
      path="/users/feedback"
      element={
        <ProtectedRoute allowedRoles={["patient"]}>
          <Feedback/>
        </ProtectedRoute>
      }
    />

<Route
      path="/users/get-Appointments"
      element={
        <ProtectedRoute allowedRoles={["patient"]}>
          <PatientScheduledAppointments />
        </ProtectedRoute>
      }
    />

    <Route
      path="/users/showScheduled-tests"
      element={
        <ProtectedRoute allowedRoles={["patient"]}>
          <ShowScheduledTests/>
        </ProtectedRoute>
      }
    />
    
    <Route
      path="/doctors/schedule-tests"
      element={
        <ProtectedRoute allowedRoles={["doctor"]}>
          <ScheduleTest />
        </ProtectedRoute>

      }
    />
    <Route
      path="/doctors/create-prescription"
      element={
        <ProtectedRoute allowedRoles={["doctor"]}>
          <CreatePrescription />
        </ProtectedRoute>

      }
    />
  </Routes>
};

export default Routers;