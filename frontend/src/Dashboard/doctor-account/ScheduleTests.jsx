import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';

const ScheduleTest = () => {// Get user from context
    const [patientId, setPatientId] = useState('');
    const [testName, setTestName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/api/doctors/schedule-test`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user?.UserID,  // Send only userId
                    patientId,
                    testName,
                    date,
                    time,
                    description
                })
            });

            const result = await res.json();
            if (res.ok) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error('Failed to schedule test');
        }
    };

    return (
        <section className="p-5 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-primaryColor">Schedule a Test</h2>

            <form onSubmit={handleSubmit} className="grid gap-6">
                <div>
                    <label htmlFor="patientId" className="block text-textColor font-semibold mb-2">Patient ID</label>
                    <input 
                        type="text" 
                        id="patientId"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)} 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
                    />
                </div>

                <div>
                    <label htmlFor="testName" className="block text-textColor font-semibold mb-2">Test Name</label>
                    <input 
                        type="text" 
                        id="testName"
                        value={testName}
                        onChange={(e) => setTestName(e.target.value)} 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
                    />
                </div>

                <div>
                    <label htmlFor="date" className="block text-textColor font-semibold mb-2">Test Date</label>
                    <input 
                        type="date" 
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)} 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
                    />
                </div>

                <div>
                    <label htmlFor="time" className="block text-textColor font-semibold mb-2">Test Time</label>
                    <input 
                        type="time" 
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)} 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-textColor font-semibold mb-2">Description</label>
                    <textarea 
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
                    />
                </div>

                <div className="flex gap-4">
                    <button type="submit" className="px-6 py-2 bg-primaryColor text-white rounded-[50px] hover:bg-primaryColorDark transition-all duration-300">
                        Schedule Test
                    </button>
                    <button type="button" onClick={() => {
                        setPatientId('');
                        setTestName('');
                        setDate('');
                        setTime('');
                        setDescription('');
                    }} 
                    className="px-6 py-2 border border-gray-300 text-textColor rounded-[50px] hover:bg-gray-200 transition-all duration-300">
                        Clear Form
                    </button>
                </div>
            </form>
        </section>
    );
};

export default ScheduleTest;
