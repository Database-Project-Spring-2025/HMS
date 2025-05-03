import { useState, useEffect } from 'react';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';

const DoctorSearchAndSchedule = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    description: '',
  });

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/doctors`);
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        toast.error('Failed to load doctors');
      }
    };
    fetchDoctors();
  }, []);

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAppointmentSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/api/users/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          UserID: user.UserID,
          DoctorID: selectedDoctor.DoctorID,
          Date: formData.date,
          Time: formData.time,
          Description: formData.description,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success('Appointment scheduled!');
      setSelectedDoctor(null);
      setFormData({ date: '', time: '', description: '' });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="px-5 xl:px-0 py-10">
      <div className="flex justify-center items-center ">
  <button
    className="px-6 py-2 bg-primaryColor text-white rounded hover:bg-blue-600 transition-all"
    onClick={() => window.location.href = '/users/get-Appointments'}
  >
    Your Scheduled Appointments
  </button>
</div>
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">


        {/* Banner */}
        <div className="bg-blue-100 border border-blue-300 text-blue-700 px-4 py-3 rounded-md mb-6 text-center">
          <h2 className="text-xl font-semibold tracking-wide">🔍 Search & Schedule Doctor Appointments</h2>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search doctors by name or department..."
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primaryColor mb-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Doctor Cards */}
        <div className="grid gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.UserID}
              className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{doc.Name}</h3>
              <p className="text-sm text-gray-600"><strong>Department:</strong> {doc.Department}</p>
              <p className="text-sm text-gray-600"><strong>Cabin:</strong> {doc.Cabin}</p>
              <button
                className="mt-4 px-6 py-2 bg-primaryColor text-white rounded hover:bg-blue-600 transition-all"
                onClick={() => setSelectedDoctor(doc)}
              >
                Schedule Appointment
              </button>
            </div>
          ))}
        </div>

        {/* Appointment Form */}
        {selectedDoctor && (
          <div className="mt-10 p-6 border border-gray-300 rounded-xl bg-gray-50 shadow-inner">
            <h3 className="text-xl font-bold text-primaryColor mb-4">
              Schedule with Dr. {selectedDoctor.Name}
            </h3>
            <form onSubmit={handleAppointmentSubmit} className="grid gap-5">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primaryColor"
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primaryColor"
              />
              <textarea
                name="description"
                placeholder="Describe the issue"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primaryColor"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-primaryColor text-white rounded font-semibold hover:bg-blue-600 transition-all"
                >
                  Confirm Appointment
                </button>
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-400 rounded font-semibold hover:bg-gray-100 transition-all"
                  onClick={() => setSelectedDoctor(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorSearchAndSchedule;
