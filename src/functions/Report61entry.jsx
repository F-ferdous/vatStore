import React, { useState, useEffect } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

import {
  addDoc,
  collection,
  getDocs,
  where,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Report61entry = () => {
  const navigate = useNavigate();
  const GoBack = () => {
    navigate("/");
  };
  return (
    <section className="w-full flex flex-col items-center justify-center mt-2 p-2 mx-5">
      <div className="bg-gray-100 w-[90%]">
        <ToastContainer />
        <div className="bg-gradient-to-tl from-sky-400 to-sky-800 p-2 flex justify-between items-center">
          <h1 className="text-white text-sm font-bold">Musak 6.1 Entry</h1>
          <button
            className="px-3 py-2 text-white rounded-lg bg-[#0a4c76] hover:bg-[#13384f]"
            onClick={GoBack}
          >
            Go Back
          </button>
        </div>

        <hr />
        <form className="w-[100%]">
          <div className="flex">
            <div className="w-[50%] p-2">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[30%] text-gray-700 text-xs font-bold mb-2">
                  তারিখ
                </label>
                <input
                  type="text"
                  placeholder="Enter Date"
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
            <div className="w-[50%] p-2">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left pl-5 pt-4 tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  উপকরনের নাম
                </label>
                <input
                  placeholder="Product Name"
                  type="text"
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-left pl-2 pb-1">মজুদ উপকরনের প্ররম্ভিক জের</p>
            <hr />
            <div className="flex">
              <div className="w-[50%] p-2">
                <div className="flex flex-row w-full p-2 gap-2">
                  <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[30%] text-gray-700 text-xs font-bold mb-2">
                    পরিমান (একক)
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
              <div className="w-[50%] p-2">
                <div className="flex flex-row w-full p-2 gap-2">
                  <label className="block uppercase text-left pl-5 pt-4 tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                    মূল্য (সকল প্রকার কর ব্যতিত)
                  </label>
                  <input
                    placeholder=""
                    type="text"
                    className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
            </div>
            <hr />
          </div>

          <div>
            <p className="text-center font-bold pl-2 pb-3 pt-2">
              ক্রয়কৃত উপকরন
            </p>
            <hr />
            <div className="flex">
              <div className="w-[50%] p-2">
                <div className="flex flex-row w-full p-2 gap-2">
                  <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[30%] text-gray-700 text-xs font-bold mb-2">
                    তারিখ
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
              <div className="w-[50%] p-2">
                <div className="flex flex-row w-full p-2 gap-2">
                  <label className="block uppercase text-left pl-5 pt-4 tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                    চালান/বিল অব এন্ট্রি নম্বর
                  </label>
                  <input
                    placeholder=""
                    type="text"
                    className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-left  pl-3 pb-1">বিক্রেতা/সরবরাহকারী</p>
            <hr />
            <div className="flex">
              <div className="w-[1/3] p-2">
                <div className="flex flex-row w-full p-2 gap-2">
                  <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[30%] text-gray-700 text-xs font-bold mb-2">
                    নাম
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
              <div className="w-[1/3] p-2">
                <div className="flex flex-row w-full p-2 gap-2">
                  <label className="block uppercase text-left pl-5 pt-4 tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                    ঠিকানা
                  </label>
                  <input
                    placeholder=""
                    type="text"
                    className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
              <div className="w-[1/3] p-2">
                <div className="flex flex-row w-full p-2 gap-2">
                  <label className="block uppercase text-left pl-5 pt-4 tracking-wide w-[40%] text-gray-700 text-xs font-bold mb-2">
                    নিবন্ধন নম্বর/তালিকাভুক্তি/জাতীয় পরিচয়পত্র নম্বর
                  </label>
                  <input
                    placeholder=""
                    type="text"
                    className="appearance-none block  w-[60%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
            </div>
            <hr />
          </div>
          <div className="flex">
            <div className="w-[50%] p-2">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[30%] text-gray-700 text-xs font-bold mb-2">
                  বিবরণ
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
            <div className="w-[50%] p-2">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left pl-5 pt-4 tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  পরিমাণ
                </label>
                <input
                  placeholder=""
                  type="text"
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="w-[50%] p-2">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[30%] text-gray-700 text-xs font-bold mb-2">
                  মূল্য (সকল প্রকার কর ব্যতিত)
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
            <div className="w-[50%] p-2">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left pl-5 pt-4 tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  সম্পূরক শুল্ক (যদি থাকে)
                </label>
                <input
                  placeholder=""
                  type="text"
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="w-[50%] p-2">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[30%] text-gray-700 text-xs font-bold mb-2">
                  মুসক
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
            <div className="w-[50%] p-2"></div>
          </div>

          <div>
            <p className="text-left pl-2 pb-1">
              পণ্য প্রস্তুত/প্রক্রিয়াকরনে উপকরনের ব্যবহার
            </p>
            <hr />
            <div className="flex">
              <div className="w-[50%] p-2">
                <div className="flex flex-row w-full p-2 gap-2">
                  <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[30%] text-gray-700 text-xs font-bold mb-2">
                    পরিমাণ (একক)
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
              <div className="w-[50%] p-2">
                <div className="flex flex-row w-full p-2 gap-2">
                  <label className="block uppercase text-left pl-5 pt-4 tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                    মূল্য (সকল প্রকার কর ব্যতিত)
                  </label>
                  <input
                    placeholder="(p13/o13)*q13"
                    readOnly
                    type="text"
                    className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
            </div>
            <hr />
          </div>

          <div className="flex">
            <div className="w-[100%] p-2">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[30%] text-gray-700 text-xs font-bold mb-2">
                  মন্তব্য
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="my-5 ml-8">
            <button
              type="submit"
              className="flex flex-row px-7 py-3 font-bold hover:text-gray-200 text-white rounded-lg bg-gradient-to-tl from-pink-600 to-pink-800 hover:bg-pink-900"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Report61entry;
