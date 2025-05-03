import React, { useState, useEffect, useContext } from 'react';
import { authContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';

const CreatePrescription = () => {
  const { user } = useContext(authContext);
  const [patientId, setPatientId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [availableMeds, setAvailableMeds] = useState([]);

  useEffect(() => {
    const fetchMeds = async () => {
      const res = await fetch(`${BASE_URL}/api/prescriptions/medicines`);
      const data = await res.json();
      setAvailableMeds(data);
    };
    fetchMeds();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}/api/prescriptions/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.UserID,
        patientId,
        date,
        time,
        medicines,
      }),
    });

    const result = await res.json();
    if (res.ok) {
      toast.success(result.message);
      setPatientId('');
      setDate('');
      setTime('');
      setMedicines([]);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <section className="p-5 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-primaryColor">Create Prescription</h2>

      <form onSubmit={handleSubmit} className="grid gap-6">
        <div>
          <label className="block text-textColor font-semibold mb-2">Patient ID</label>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-textColor font-semibold mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
            />
          </div>
          <div>
            <label className="block text-textColor font-semibold mb-2">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
            />
          </div>
        </div>

        <div>
          <label className="block text-textColor font-semibold mb-2">Select Medicines</label>
          <select
            multiple
            value={medicines}
            onChange={(e) =>
              setMedicines(Array.from(e.target.selectedOptions, (option) => option.value))
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
          >
            {availableMeds.map((med) => (
              <option key={med.MedicineID} value={med.MedicineID}>
                {med.MedicineName} ({med.Dosage})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-primaryColor text-white rounded-[50px] hover:bg-primaryColorDark transition-all duration-300"
        >
          Create Prescription
        </button>
      </form>
    </section>
  );
};

export default CreatePrescription;
