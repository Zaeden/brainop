import { useRef, useState, useEffect } from "react";
import { PiCameraFill } from "react-icons/pi";
import { notifyFailure, notifySuccess } from "../utils/toast";
import { signupSchema } from "../validations/userValidation.js";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    cPassword: "",
    profileImage: "",
    terms: false,
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [touched, setTouched] = useState({});

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validateForm = async () => {
      try {
        await signupSchema.validate(formData, { abortEarly: false });
        setIsFormValid(true);
        setErrors({});
      } catch (err) {
        setIsFormValid(false);
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
    };

    validateForm();
  }, [formData]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, terms: e.target.checked });
    setTouched((prev) => ({
      ...prev,
      terms: true,
    }));
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const uploadToCloudinary = async () => {
    const { VITE_CLOUDINARY_PRESET, VITE_CLOUDINARY_CLOUD_NAME } = import.meta
      .env;

    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", `${VITE_CLOUDINARY_PRESET}`);
    data.append("cloud_name", `${VITE_CLOUDINARY_CLOUD_NAME}`);

    try {
      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dvkdfcjpu/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const cloudinaryData = await cloudinaryResponse.json();
      return cloudinaryData.url;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    try {
      //Upload image to cloudinary

      let profileImageUrl = formData.profileImage;
      if (imageFile) {
        profileImageUrl = await uploadToCloudinary();
        if (!profileImageUrl) {
          notifyFailure("Failed to upload image. Please try again.");
          return;
        }
      }
      const updatedFormData = { ...formData, profileImage: profileImageUrl };
      // console.log("Submitting form data:", updatedFormData);

      //Uploading data to the server
      const { VITE_BASE_URL } = import.meta.env;
      const res = await fetch(`${VITE_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });
      const data = await res.json();
      if (data.success) {
        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("isLoggedIn", true);
        }
        // console.log(data.message);
        notifySuccess(data.message);
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          cPassword: "",
          profileImage: "",
          terms: false,
        });
      } else {
        // console.log(data.message);
        notifyFailure(data.message);
      }
    } catch (error) {
      notifyFailure(error.message);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col md:flex-row">
        {/* --------Left Child--------- */}
        <div className="hidden lg:flex lg:justify-center lg:items-center lg:w-2/6 lg:px-1 bg-paleYellow-200 sticky top-0 h-screen">
          <h1 className="text-center font-bold text-4xl text-paleYellow-900">
            Create an Account
          </h1>
        </div>

        {/* ------Right Child---- */}
        <div className="flex flex-col-reverse lg:flex-row flex-1 items-center justify-center py-10 px-4 lg:justify-start lg:pl-20 xl:pl-40">
          <div className="flex justify-center w-full max-w-sm p-1">
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ----Name Field---- */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-bold">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={onChangeHandler}
                    className="text-sm border rounded-xl outline-none outline-offset-0 p-4 transition-all ease-in-out duration-300 hover:outline-softPink-100 focus:border-hotPink-200 hover:outline-4 focus:outline-4 focus:outline-softPink-100"
                  />
                  {touched.name && errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>

                {/* ------Username Field----- */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="username" className="font-bold">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={onChangeHandler}
                    className="text-sm border rounded-xl outline-none outline-offset-0 p-4 transition-all ease-in-out duration-300 hover:outline-softPink-100 focus:border-hotPink-200 hover:outline-4 focus:outline-4 focus:outline-softPink-100"
                  />
                  {touched.username && errors.username && (
                    <span className="text-red-500 text-sm">
                      {errors.username}
                    </span>
                  )}
                </div>
              </div>

              {/* ------Email Field----- */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-bold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={onChangeHandler}
                  className="text-sm border rounded-xl outline-none outline-offset-0 p-4 transition-all ease-in-out duration-300 hover:outline-softPink-100 focus:border-hotPink-200 hover:outline-4 focus:outline-4 focus:outline-softPink-100"
                />
                {touched.email && errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>

              {/* ------Password Field----- */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-bold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={onChangeHandler}
                  placeholder="7+ characters"
                  className="text-sm border rounded-xl outline-none outline-offset-0 p-4 transition-all ease-in-out duration-300 hover:outline-softPink-100 focus:border-hotPink-200 hover:outline-4 focus:outline-4 focus:outline-softPink-100"
                />
                {touched.password && errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
              </div>

              {/* ------Confirm Password Field----- */}
              <div className="flex flex-col gap-2">
                <label htmlFor="cPassword" className="font-bold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="cPassword"
                  name="cPassword"
                  value={formData.cPassword}
                  onChange={onChangeHandler}
                  className="text-black-900 text-sm border rounded-xl outline-none outline-offset-0 p-4 transition-all ease-in-out duration-300 hover:outline-softPink-100 focus:border-hotPink-200 hover:outline-4 focus:outline-4 focus:outline-softPink-100"
                />
                {touched.cPassword && errors.cPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.cPassword}
                  </span>
                )}
              </div>
              {/* ------Terms and Conditions----- */}
              <div className="flex gap-4">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="terms" className="text-sm">
                  I agree with Socially Terms of Service, Privacy Policy, and
                  default Notification Settings.
                </label>
              </div>
              {touched.terms && errors.terms && (
                <p className="text-red-500 text-sm">{errors.terms}</p>
              )}
              <div className="flex">
                <button
                  type="submit"
                  className={`w-full border rounded-full font-bold p-4 text-white ${
                    isFormValid
                      ? "bg-midnightBlue-900 hover:opacity-80"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!isFormValid}
                  onClick={handleSubmit}
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>

          {/* -------Upload Profile Image Component-------- */}
          <div className="flex flex-col justify-center items-center gap-2 self-start mx-auto lg:mt-10 xl:mt-24">
            <div
              className={`w-40 h-40 flex justify-center items-center ${
                !profileImage ? `border-4 border-dashed rounded-full` : " "
              } cursor-pointer`}
              onClick={handleButtonClick}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="profile-image"
                  className="w-40 h-40 rounded-full"
                />
              ) : (
                <PiCameraFill className="text-gray-400 text-xl" />
              )}
            </div>
            <button
              className="mt-4 px-4 py-2 border rounded-full font-medium text-gray-600 hover:bg-gray-100"
              onClick={handleButtonClick}
            >
              Choose image
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
