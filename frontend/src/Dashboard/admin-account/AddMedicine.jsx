import { useState } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';

const AddMedicine = () => {
  const [formData, setFormData] = useState({
    MedicineName: '',
    Company: '',
    Dosage: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/api/medicine/add-medicine`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success('Medicine added successfully!');
      setFormData({ MedicineName: '', Company: '', Dosage: '' });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="px-5 xl:px-0 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">

        {/* Banner */}
        <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-md mb-6 text-center">
          <h2 className="text-xl font-semibold tracking-wide">➕ Add New Medicine</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid gap-5">
          <input
            type="text"
            name="MedicineName"
            placeholder="Medicine Name"
            value={formData.MedicineName}
            onChange={handleChange}
            required
            className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primaryColor"
          />
          <input
            type="text"
            name="Company"
            placeholder="Company"
            value={formData.Company}
            onChange={handleChange}
            required
            className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primaryColor"
          />
          <input
            type="text"
            name="Dosage"
            placeholder="Dosage (e.g., 500mg)"
            value={formData.Dosage}
            onChange={handleChange}
            required
            className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primaryColor"
          />

          <button
            type="submit"
            className="px-6 py-3 bg-primaryColor text-white rounded font-semibold hover:bg-blue-600 transition-all"
          >
            Add Medicine
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddMedicine;
