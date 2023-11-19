import React, { useRef, useEffect, useState } from "react";
import bdLogo from "../fonts/logo-bd.png";

import ReactToPrint from "react-to-print";
import { useParams } from "react-router-dom";

import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const Musak65 = () => {
  const [data, setdata] = useState();
  const [datePart, setDatePart] = useState("");
  const [timePart, setTimePart] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalUnitPrice, setTotalUnitPrice] = useState(0);
  const { id } = useParams();
  const componentRef = useRef();

  useEffect(() => {
    const getData = async () => {
      const singleData = await getDoc(
        doc(collection(db, "ProductTransfer"), id)
      ).then((snapshot) => {
        if (snapshot.exists()) {
          setdata(snapshot.data());
          if (snapshot.data().issueDate) {
            const parts = snapshot.data().issueDate.split(" ");
            const date = parts[0]; // "8/6/2023"
            const time = parts[1] + " " + parts[2]; // "11:48:12 AM"

            setDatePart(date);
            setTimePart(time);
          }
          let quantityTotal = 0;
          let unitPriceTotal = 0;

          if (snapshot.data().productList) {
            snapshot.data().productList.forEach((item) => {
              quantityTotal += parseFloat(item.quantity) || 0;
              unitPriceTotal += parseFloat(item.unitPrice) || 0;
            });
          }
          setTotalQuantity(quantityTotal);
          setTotalUnitPrice(unitPriceTotal);
        }
      });
    };

    getData();
  }, []);

  return (
    <>
      <div className="py-4 px-10 bg-slate-100 w-full flex justify-between">
        <p className="font-bold text-14">Preview</p>
        <ReactToPrint
          trigger={() => (
            <button className="bg-[#ff5c8e] text-white rounded-lg px-4 py-2 mx-1 text-14 hover:bg-[#9e103b]">
              Print
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div className="musakReports ml-10 mr-5 flex flex-col" ref={componentRef}>
        <div className="flex w-[95%] items-center justify-between pt-10">
          <img src={bdLogo} className="w-16 h-auto" />
          <div className="text-center">
            <h1 className="text-[18px] font-bold tracking-wider">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার{" "}
            </h1>
            <p className="tracking-wide">জাতীয় রাজস্ব বোর্ড</p>
            <p className="font-bold text-xl tracking-wider">
              কেন্দ্রীয় নিবন্ধিত প্রতিষ্ঠানের পন্য স্থানান্তর চালানপত্র
            </p>
            <p className="text-xl tracking-wide">{`[বিধি ৪০  এর উপ-বিধি (১) এর দফা (ঙ) দ্রষ্টব্য]`}</p>
            <p className="text-base tracking-wide">
              নিবন্ধিত ব্যক্তির নামঃ STAR PARTICLE BOARD MILLS LTD
            </p>
            <p className="text-base tracking-wide">
              নিবন্ধিত ব্যক্তির বিআইএনঃ 000000796-0302
            </p>
          </div>
          <p className="px-4 py-2 font-bold border border-gray-900">
            {" "}
            মূসক - ৬.৫{" "}
          </p>
        </div>
        <div className="flex flex-col items-baseline justify-between w-[95%] pt-2">
          <p>
            প্রেরণকারী শাখা/পণ্যাগারের নাম ও ঠিকানাঃ STAR PARTICLE BOARD MILLS
            LTD (Factory)
          </p>
          <p>
            125 Horipur, Madanpur, Bandar, Narayangonj; Bandar PS;
            Narayanganj-1411; Bangladesh
          </p>
        </div>
        <div className="flex w-[95%] pt-9 gap-3">
          <div className="w-[45%] flex flex-col items-baseline mr-5">
            <p>
              গ্রহীতা শাখা/পণ্যাগারের নাম ও ঠিকানাঃ STAR PARTICLE BOARD MILLS
              LTD (CTG)
            </p>
            <p>
              Bangladesh Paper Products Ltd, 7/d Sholashahar I/A, Nasirabad,
              Chittaganj
            </p>
          </div>
          <div className="w-[50%] flex flex-col items-baseline">
            {data && (
              <>
                <p>চালান নম্বরঃ {data.InvoiceNum}</p>
                <p>ইস্যুর তারিখঃ {datePart}</p>
                <p>ইস্যুর সময়ঃ {timePart}</p>
                <p>যানবাহনের প্রকৃতি ও নম্বরঃ {data.vehicleNum}</p>
              </>
            )}
          </div>
        </div>
        <div className="flex w-[95%] pt-9">
          <table className="w-full text-center m-auto mt-2 text-xs text-gray-900  border-collapse">
            <thead className="text-base uppercase ">
              <tr>
                <th className="p-1 border border-gray-400">ক্রমিক নং</th>
                <th className="p-1 border border-gray-400">
                  {" "}
                  পণ্যের (প্রযোজ্য ক্ষেত্রে সুনির্দিষ্ট ব্রান্ড নামসহ) বিবরন
                </th>
                <th className="p-1 border border-gray-400"> সবরাহের একক</th>

                <th className="p-1 border border-gray-400">পরিমাণ</th>
                <th className="p-1 border border-gray-400">মূল্য</th>

                <th className="p-1 border border-gray-400">মন্তব্য</th>
              </tr>
            </thead>
            <tbody className="text-14">
              <tr>
                <td className="p-1 border border-gray-400">(১)</td>
                <td className="p-1 border border-gray-400">(২)</td>
                <td className="p-1 border border-gray-400"></td>
                <td className="p-1 border border-gray-400">(৩)</td>
                <td className="p-1 border border-gray-400">(৪)</td>
                <td className="p-1 border border-gray-400">(৫)</td>
              </tr>
              {data &&
                data.productList.map((item, index) => (
                  <tr>
                    <td className="p-1 border border-gray-400">{index + 1}</td>
                    <td className="p-1 border border-gray-400">
                      {item.productName}
                    </td>
                    <td className="p-1 border border-gray-400">SFT</td>
                    <td className="p-1 border border-gray-400">
                      {item.quantity}
                    </td>
                    <td className="p-1 border border-gray-400">
                      {item.unitPrice}
                    </td>
                    <td className="p-1 border border-gray-400">
                      {item.remarks}
                    </td>
                  </tr>
                ))}

              <tr>
                <td className="p-1"></td>
                <td className="p-1"></td>
                <td className="p-1">Total</td>
                <td className="p-1 border border-gray-400">{totalQuantity}</td>
                <td className="p-1 border border-gray-400">{totalUnitPrice}</td>
                <td className="p-1 "></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-baseline justify-between w-[95%] pt-10">
          <p className="pb-1">
            প্রতিষ্ঠান কর্তৃপক্ষের দায়িত্বপ্রাপ্ত ব্যক্তির নামঃ
          </p>
          <p className="pb-1">পদবিঃ</p>
          <p className="pb-1">স্বাক্ষরঃ</p>
          <p className="pb-1">সীলঃ</p>
        </div>
      </div>
    </>
  );
};

export default Musak65;
