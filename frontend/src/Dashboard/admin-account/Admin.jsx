import { useState, useEffect, useContext } from 'react';
import { BASE_URL } from '../../config';
import { authContext } from '../../context/AuthContext'; // Adjust path if needed

const AdminPanel = () => {
  const { user } = useContext(authContext); // This gives you logged-in user info
  console.log(user.UserID)
  const [doctorForm, setDoctorForm] = useState({ userId: '', specialization: '', qualification: '' });
  const [adminForm, setAdminForm] = useState({ userId: '', position: '', experience: '' });
  

  const handleChange = (formSetter) => (e) => {
    formSetter(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitDoctor = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}/api/admin/add-doctor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId:user.UserID,
        doctorUserID: doctorForm.userId,
        specialization: doctorForm.specialization,
        qualification: doctorForm.qualification
      })
    });
    const data = await res.json();
    alert(data.message);
  };

  const submitAdmin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/add-admin-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        adminID,
        userID: adminForm.userId,
        position: adminForm.position,
        experience: adminForm.experience
      })
    });
    const data = await res.json();
    console.log(data)
    alert(data.message);
  };

  return (
    <section className="px-5 py-10 xl:px-0">
      <div className="max-w-[900px] mx-auto">
        <h2 className="text-3xl font-bold text-primaryColor mb-8 text-center">Admin Control Panel</h2>

        <div className="bg-white p-6 mb-10 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-headingColor">Add Doctor</h3>
          <form onSubmit={submitDoctor} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              name="userId"
              placeholder="User ID"
              value={doctorForm.userId}
              onChange={handleChange(setDoctorForm)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primaryColor"
              required
            />
            <input
              name="specialization"
              placeholder="Specialization"
              value={doctorForm.specialization}
              onChange={handleChange(setDoctorForm)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primaryColor"
              required
            />
            <input
              name="qualification"
              placeholder="Qualification"
              value={doctorForm.qualification}
              onChange={handleChange(setDoctorForm)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primaryColor"
              required
            />
            <button
              type="submit"
              className="col-span-1 md:col-span-2 bg-primaryColor text-white py-3 rounded font-semibold hover:bg-blue-600 transition-all"
            >
              Add Doctor
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-headingColor">Promote User to Admin</h3>
          <form onSubmit={submitAdmin} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              name="userId"
              placeholder="User ID"
              value={adminForm.userId}
              onChange={handleChange(setAdminForm)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primaryColor"
              required
            />
            <input
              name="position"
              placeholder="Position"
              value={adminForm.position}
              onChange={handleChange(setAdminForm)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primaryColor"
              required
            />
            <input
              name="experience"
              placeholder="Experience (in years)"
              value={adminForm.experience}
              onChange={handleChange(setAdminForm)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primaryColor"
              required
            />
            <button
              type="submit"
              className="col-span-1 md:col-span-2 bg-primaryColor text-white py-3 rounded font-semibold hover:bg-blue-600 transition-all"
            >
              Promote to Admin
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
