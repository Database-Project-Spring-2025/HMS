import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';

const ScheduledAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?.UserID) return;
      try {
        const res = await fetch(`${BASE_URL}/api/doctors/${user.UserID}/appointments`);
        const data = await res.json();
        console.log(data)
        setAppointments(data);
      } catch (err) {
        toast.error("Failed to load your appointments");
      }
    };
    fetchAppointments();
  }, []);

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-primaryColor mb-6">
        Your Scheduled Appointments
      </h2>

      {appointments.length > 0 ? (
        <div className="grid gap-6">
          {appointments.map((appt) => (
            <div
              key={appt.AppointmentID}
              className="p-5 border border-gray-200 rounded-2xl shadow-md bg-white"
            >
              <p className="text-lg font-semibold text-gray-800 mb-1">
                {appt.PatientName}
              </p>
              <p className="text-sm text-gray-600"><strong>Date:</strong> {appt.Date}</p>
              <p className="text-sm text-gray-600"><strong>Time:</strong> {appt.Time}</p>
              <p className="text-sm text-gray-600 mt-2"><strong>Description:</strong> {appt.Description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-4">You don’t have any upcoming appointments.</p>
      )}
    </section>
  );
};

export default ScheduledAppointments;
