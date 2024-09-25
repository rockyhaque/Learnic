import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const [email, setEmail] = useState("");

  const { loginUser, loading, setLoading, googleLogin, githubLogin } =
    useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      setLoading(true);

      // login user
      await loginUser(email, password);
      navigate(from);
      toast.success("Sign In Successfull!");
    } catch (err) {
      // console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success(`Yay! User Created Successfully 🤩`);
      navigate("/");
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await githubLogin();
      toast.success(`Yay! User Created Successfully 🤩`);
      navigate("/");
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <section className="bg-gray-100 ">
      <Helmet>
        <title>Land Legacy | Login</title>
      </Helmet>
      <div className="p-5 max-w-screen-xl mx-auto flex justify-center items-center min-h-[calc(100vh-365px)] ">
        <div className="w-full md:w-1/2 px-8 border py-8 rounded-xl">
          <h2
            className="font-bold text-3xl bg-gradient-to-r from-blue-900 to-sky-900 bg-clip-text text-transparent"
            data-aos="fade-left"
          >
            Login
          </h2>
          <p className="text-sm mt-4 text-customDeepBlue" data-aos="fade-left">
            If you have registerd once then please Login
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <input
                className="p-2 mt-8 rounded-xl border"
                type="email"
                name="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  *Email is required
                </span>
              )}
            </div>

            <div>
              <div className="relative flex items-center">
                <input
                  className="p-2 rounded-xl border w-full"
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                />

                <span
                  className="absolute right-3 cursor-pointer text-xl"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <IoEyeOffOutline /> : <MdOutlineRemoveRedEye />}
                </span>
              </div>
              {errors.password?.type === "required" && (
                <span className="text-red-500 text-sm mt-2">
                  Password is required
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500 text-sm mt-2">
                  Password Must be 6 characters
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-500 text-sm mt-2">
                  Password Must be less than 20 characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-500 text-sm mt-2">
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </span>
              )}
            </div>

            <button
              className="bg-neutral text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium mt-3"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="mt-2">
            {error && (
              <small className="text-red-500 font-bold">*{error}</small>
            )}
          </div>
          <div className="mt-6  items-center text-gray-100">
            <hr className="border-gray-300" />
            <p className="text-center text-sm text-gray-500">OR</p>
            <hr className="border-gray-300" />
          </div>
          <button
            onClick={handleGoogleLogin}
            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium"
          >
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Login with Google
          </button>
          <button
            onClick={handleGithubLogin}
            className="bg-white border py-2 w-full rounded-xl mt-3 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium"
          >
            <FaGithub className="text-xl mr-3" />
            <span>Login with Github</span>
          </button>
          <div className="mt-10 text-sm border-b border-gray-500 py-1 playfair tooltip">
            Forget password?
          </div>
          <div className="mt-4 text-sm flex justify-between items-center container-mr">
            <p className="mr-3 md:mr-0 ">If You don&apos;t have account...</p>
            <Link
              to="/register"
              className="hover:border register text-white bg-neutral hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#60a8bc4f] hover:text-neutral font-semibold duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
