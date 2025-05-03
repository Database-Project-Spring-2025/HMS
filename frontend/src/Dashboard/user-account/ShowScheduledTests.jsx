import { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';

const ShowScheduledTests = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/users/${user?.UserID}/tests`);
        const data = await res.json();
        if (res.ok) {
          setTests(data);
        } else {
          toast.error(data.message || "Failed to load tests");
        }
      } catch (err) {
        toast.error("Error fetching test records");
      }
    };

    if (user?.UserID) fetchTests();
  }, []);

  return (
    <section className="p-5 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-primaryColor">Your Scheduled Tests</h2>

      {tests.length > 0 ? (
        <div className="grid gap-6">
          {tests.map((test, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-md p-6 rounded-[20px] transition-all duration-300 hover:shadow-lg"
            >
              <div className="mb-2">
                <span className="font-semibold text-textColor">Test Name: </span>
                <span>{test.TestName}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-textColor">Date: </span>
                <span>{test.Date}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-textColor">Time: </span>
                <span>{test.Time}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-textColor">Doctor: </span>
                <span>Dr. {test.DoctorName}</span>
              </div>
              <div>
                <span className="font-semibold text-textColor">Description: </span>
                <span>{test.Description || 'N/A'}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-textColor text-lg">No tests scheduled.</p>
      )}
    </section>
  );
};

export default ShowScheduledTests;
