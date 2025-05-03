import { useState } from "react";
import signupImg from "../assets/images/signup.gif";
import { Link, useNavigate } from 'react-router-dom';
import uploadImageToCloudinary from "../utils/uploadCloudinary";
import { BASE_URL } from "../config";
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    age: "",
    password: "",
    gender: "",
    photo: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      gender: formData.gender,
      age: parseInt(formData.age),
      password: formData.password,
    };

    try {
      const res = await fetch(`${BASE_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const { message } = await res.json();
      if (!res.ok) throw new Error(message);

      toast.success(message);
      navigate("/login");

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="Signup" className="w-full rounded-l-lg" />
            </figure>
          </div>

          <div className="rounded-l-lg lg:pl-16 py-10 flex flex-col">
            <h3 className="text-headingColor text-[22px] font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>

            <form onSubmit={submitHandler}>
              {["name", "email", "contact", "age", "password"].map((field, idx) => (
                <div className="mb-5" key={idx}>
                  <input
                    type={field === "email" ? "email" : field === "password" ? "password" : "text"}
                    placeholder={`Enter your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="w-full py-3 border-b border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px]"
                    required
                  />
                </div>
              ))}

              <div className="mb-5">
                <label className="text-headingColor font-bold text-[16px]">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="ml-2 text-textColor font-semibold text-[15px] px-4 py-3 focus:outline-none"
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <div className="mb-5 flex items-center">
                <div className="relative w-[100px] h-[35px] mr-5 border border-solid border-black">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".jpg, .png"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="customFile"
                    className="flex items-center justify-center w-full h-full bg-[#0066ff46] text-headingColor font-semibold rounded-lg cursor-pointer text-center text-[14px] border border-solid border-black"
                  >
                    Upload Photo
                  </label>
                </div>
                {selectedFile && (
                  <figure className="w-[40px] h-[40px] rounded-full border-2 border-primaryColor flex items-center justify-center">
                    <img src={previewURL} alt="Preview" className="w-full h-full rounded-full" />
                  </figure>
                )}
              </div>

              <div className="mt-7">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] rounded-lg px-4 py-3"
                >
                  {loading ? <HashLoader size={35} color="#ffffff" /> : "Sign Up"}
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                Already have an account?
                <Link to="/login" className="text-primaryColor font-medium ml-1">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
