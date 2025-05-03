import { useState, useContext } from 'react';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import { authContext } from '../../context/AuthContext';
import { FaStar } from 'react-icons/fa';

const Feedback = () => {
  const { user } = useContext(authContext);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/feedback/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userID: user.UserID,
          rating,
          description
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(data.message);
      setRating(0);
      setDescription('');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="px-5 py-10 xl:px-0 min-h-screen bg-[#f9f9f9]">
      <div className="max-w-[600px] mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-primaryColor mb-8">
          Submit Feedback
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Rating</label>
            <div className="flex space-x-2">
              {[...Array(5)].map((_, index) => {
                const currentRating = index + 1;
                return (
                  <button
                    key={currentRating}
                    type="button"
                    onClick={() => setRating(currentRating)}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(0)}
                    className="focus:outline-none"
                  >
                    <FaStar
                      size={28}
                      className={
                        currentRating <= (hover || rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Feedback</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
              placeholder="Write your thoughts..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primaryColor text-white rounded-md font-semibold hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Feedback;
