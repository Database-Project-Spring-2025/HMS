import { useEffect, useState, useContext } from 'react';
import { BASE_URL } from '../../config';
import { authContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const ViewPrescriptions = () => {
  const { user } = useContext(authContext);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      if (!user?.UserID) return;

      try {
        const res = await fetch(`${BASE_URL}/api/users/${user.UserID}/prescriptions`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);
        setPrescriptions(data);
      } catch (err) {
        toast.error('Failed to load prescriptions');
      }
    };

    fetchPrescriptions();
  }, [user]);

  return (
    <section className="p-5 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-primaryColor">Your Prescriptions</h2>

      {prescriptions.length === 0 ? (
        <p className="text-textColor">No prescriptions found.</p>
      ) : (
        <div className="grid gap-4">
          {prescriptions.map((presc) => (
            <div key={presc.PrescriptionID} className="p-5 border rounded-lg shadow-md bg-white">
              <p className="text-lg font-semibold text-primaryColor mb-2">Prescription #{presc.PrescriptionID}</p>
              <p><strong>Doctor:</strong> {presc.DoctorName}</p>
              <p><strong>Date:</strong> {presc.Date}</p>
              <p><strong>Time:</strong> {presc.Time}</p>
              <p><strong>Medicines:</strong></p>
              <ul className="list-disc pl-6">
                {presc.Medicines?.length > 0 ? (
                  presc.Medicines.map((med, index) => (
                    <li key={index}>
                      {med.MedicineName} - {med.Company} ({med.Dosage})
                    </li>
                  ))
                ) : (
                  <li>No medicines listed</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ViewPrescriptions;
