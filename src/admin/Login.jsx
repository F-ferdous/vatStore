import React from "react";
import TextInput from "../components/TextInput";

const Login = () => {
  return (
    <section className="w-full    ml-5 mr-5 mt-10 p-2">
      <div className="flex flex-row gap-5 items-center justify-center">
        <div className="w-[50%] bg-gray-100 rounded-xl p-2 flex flex-col shadow-lg justify-center">
          <h4 className="font-bold p-2">Sign In</h4>
          <hr />
          <form className="p-2">
            <TextInput label="User Name" placeholder="Enter User Name" />
            <TextInput
              label="Password"
              placeholder="Enter Password"
              type="password"
            />
            <div className="flex justify-end pt-5 pb-3">
              <button
                type="submit"
                className="px-5 py-2 font-semibold hover:text-gray-200 text-white rounded-lg bg-gradient-to-tl from-pink-600 to-pink-800 hover:bg-pink-900"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
