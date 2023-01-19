import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logInImage from "../../Assets/LogIn_Image.webp";
import { AuthContext } from "../../contexts/AuthProvider";

const SignIn = () => {
  const { signIn, resetPassword } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (event) => {
    event.preventDefault();
    setError("");
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const logedInUserInfo = {
      email,
      password,
    };

    console.log(logedInUserInfo);

    fetch(`https://fun-book-server.vercel.app/users?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "This user does't exists") {
          setError(data.message);
          return;
        } else {
          signIn(logedInUserInfo.email, logedInUserInfo.password)
            .then((result) => {
              const user = result.user;
              console.log(user);
              navigate("/");
            })
            .catch((err) => {
              console.error(err);
              setError(err.message);
            });
        }
      });
  };

  const handleReset = () => {
    setError("");
    if (!resetEmail) {
      setError("Please provide your email to reset the password");
    } else {
      resetPassword(resetEmail)
        .then(() => {
          Swal.fire("Pleease check your email", "to reset the password");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="container flex flex-col-reverse lg:flex-row my-10">
      <div className="w-[90%] mx-auto lg:max-w-md p-4 rounded-md shadow sm:p-8 border border-5 border-black">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Log In to your account
        </h2>
        <form
          onSubmit={handleSignIn}
          className="space-y-8 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm text-start font-bold"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                required
                onBlur={(event) => setResetEmail(event.target.value)}
                placeholder="Your Email"
                className="w-full px-3 py-2 border rounded-md border-gray-700 focus:border-violet-400 font-bold"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm text-start font-bold"
                >
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                required
                className="w-full px-3 py-2 border rounded-md border-gray-700 focus:border-violet-400 font-bold"
              />
            </div>
          </div>
          <div className="font-bold my-0 text-start">
            Forgot password?
            <p
              onClick={handleReset}
              className="btn btn-primary btn-sm ml-2 btn-outline"
            >
              Reset
            </p>
          </div>
          <p className="text-start text-red-600 font-bold">{error}</p>
          <button type="submit" className="btn btn-primary w-full">
            Sign In
          </button>
        </form>
        <p className="font-bold">
          Doesn't have an account?
          <Link to={"/signup"} className="btn btn-link">
            Sign Up
          </Link>
        </p>
      </div>
      <img
        src={logInImage}
        alt=""
        className="object-cover lg:ml-10 mt-10 lg:mt-0 lg:w-[60%] w-[90%] mx-auto rounded-md xl:col-span-3 dark:bg-gray-500 lg:h-[600px]"
      />
    </div>
  );
};

export default SignIn;
