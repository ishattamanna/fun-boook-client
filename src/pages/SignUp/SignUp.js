import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import signUpImage from "../../Assets/SignUp Image.webp";
import { AuthContext } from "../../contexts/AuthProvider";

const SignUp = () => {
  const { googleSignIn, signUp, makeProfile, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const imageBBSecret = process.env.REACT_APP_image_bb_secret;

  const handleGogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        const createdUserInfo = {
          name: user.displayName,
          email: user.email,
          profileImage: user.photoURL,
        };

        fetch(`https://fun-book-server.vercel.app/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(createdUserInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data) {
              Swal.fire("Your are signed In");
              navigate("/");
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    const form = event.target;
    const name = form.name.value;
    const profession = form.profession.value;
    const address = form.address.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.profilePic.files[0];

    // console.log(name, university, address, email, password, image);

    if (password.length < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    fetch(`https://api.imgbb.com/1/upload?key=${imageBBSecret}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        console.log(imageData.data.url);
        const createdUserInfo = {
          email,
          name,
          profession,
          address,
          profileImage: imageData.data.url,
        };
        console.log(createdUserInfo);

        signUp(createdUserInfo.email, password)
          .then((result) => {
            const user = result.user;
            makeUserProfile(createdUserInfo.name, createdUserInfo.profileImage);
            setUsertoDb(createdUserInfo);
            console.log(user);
          })
          .catch((err) => {
            console.error(err);
            setError(err.message);
          });
      });
  };

  const makeUserProfile = (displayName, photoURL) => {
    const profile = {
      displayName,
      photoURL,
    };

    makeProfile(profile)
      .then(() => {})
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  };

  const setUsertoDb = (userInfo) => {
    fetch(`https://fun-book-server.vercel.app/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          console.log(data.message);
          setError(data.message);
          logOut()
            .then(() => {})
            .catch((err) => {
              console.error(err);
            });
        } else if (data.acknowledged) {
          Swal.fire("Your account has been created");
          navigate("/");
        }
      });
  };

  return (
    <div className="container flex flex-col-reverse lg:flex-row my-10">
      <div className="w-[90%] mx-auto lg:max-w-md p-4 rounded-md shadow sm:p-8 border border-5 border-black">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Create your account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-8 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm text-start font-bold"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full px-3 py-2 border rounded-md border-gray-700 focus:border-violet-400 font-bold"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="profession"
                className="block text-sm text-start font-bold"
              >
                profession
              </label>
              <input
                type="text"
                name="profession"
                placeholder="Your profession"
                className="w-full px-3 py-2 border rounded-md border-gray-700 focus:border-violet-400 font-bold"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="Address"
                className="block text-sm text-start font-bold"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Your Address"
                className="w-full px-3 py-2 border rounded-md border-gray-700 focus:border-violet-400 font-bold"
              />
            </div>
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
                className="w-full px-3 py-2 border rounded-md border-gray-700 focus:border-violet-400 font-bold"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm text-start font-bold"
                >
                  Profile Image
                </label>
              </div>
              <input
                type="file"
                name="profilePic"
                className="file-input w-full"
              />
            </div>
          </div>
          <p className="text-red-600 font-bold text-start">{error}</p>
          <button type="submit" className="btn btn-primary w-full">
            Sign Up
          </button>
        </form>
        <div className="flex items-center w-full my-4">
          <hr className="w-full text-black font-bold" />
          <p className="px-3 text-black font-bold">OR</p>
          <hr className="w-full text-black font-bold" />
        </div>
        <div className="my-6 space-y-4">
          <button
            onClick={handleGogleSignIn}
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center w-full btn btn-outline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p className="ml-2">SignIn with Google</p>
          </button>
        </div>

        <p className="font-bold">
          Already have an account?{" "}
          <Link to={"/signin"} className="btn btn-link">
            Sign In
          </Link>
        </p>
      </div>
      <img
        src={signUpImage}
        alt=""
        className="object-cover lg:ml-10 mt-10 lg:mt-0 lg:w-[60%] w-[90%] mx-auto rounded-md xl:col-span-3 dark:bg-gray-500"
      />
    </div>
  );
};

export default SignUp;
