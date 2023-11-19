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

const Musak65Entry = () => {
  const [productList, setProductList] = useState([]);
  const [productName, setProductName] = useState("");
  const [uom, setUom] = useState("");
  const [unitPrice, setUnitPrice] = useState(0.0);
  const [quantity, setQuantity] = useState(0.0);
  const [amountWithoutVAT, setAmountWithoutVAT] = useState("");
  const [remarks, setRemarks] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [InvoiceNum, setInvoiceNum] = useState();
  const [vehicleNum, setVehicleNum] = useState();
  const [transferType, setTransferType] = useState();
  const [transferTo, setTransferTo] = useState();
  const [Note, setNote] = useState();

  const [uomList, setUomList] = useState();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmountWithoutVAT, setTotalAmountWithoutVAT] = useState(0);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newAmountWithoutVAT = unitPrice * quantity;
    const newProduct = {
      productName,
      uom,
      unitPrice,
      quantity,
      amountWithoutVAT: newAmountWithoutVAT,
      remarks,
    };
    setProductList([...productList, newProduct]);
    // Clear input fields after adding a new product
    setTotalQuantity(totalQuantity + parseInt(quantity, 10));
    setTotalAmountWithoutVAT(totalAmountWithoutVAT + newAmountWithoutVAT);

    setProductName("");
    setUom("");
    setUnitPrice("");
    setQuantity("");
    setAmountWithoutVAT("");
    setRemarks("");
  };

  const getCurrentDateAndTime = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // Change the date format as needed
    const formattedTime = currentDate.toLocaleTimeString(); // Change the time format as needed
    return `${formattedDate} ${formattedTime}`;
  };

  const handleDeleteProduct = (index) => {
    const updatedProductList = [...productList];
    updatedProductList.splice(index, 1);
    const deletedProduct = productList[index];
    setProductList(updatedProductList);

    setTotalQuantity(totalQuantity - parseInt(deletedProduct.quantity, 10));
    setTotalAmountWithoutVAT(
      totalAmountWithoutVAT - deletedProduct.amountWithoutVAT
    );
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const data = {
        issueDate,
        InvoiceNum,
        transferType,
        transferTo,
        vehicleNum,
        Note,
        productList,
        totalQuantity,
        totalAmountWithoutVAT,
      };
      await addDoc(collection(db, "ProductTransfer"), {
        ...data,
      }).then(() => {
        toast.success("Successfully added", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setInvoiceNum("");
        setTransferType("");
        setTransferTo("");
        setNote("");
        setVehicleNum("");
        setProductList([]);
        setTotalAmountWithoutVAT(0);
        setTotalQuantity(0);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const uomData = query(collection(db, "Uom"));

    const uomList2 = onSnapshot(uomData, (querySnapshot) => {
      let tempArr = [];
      querySnapshot.forEach((doc) => {
        tempArr.push({ ...doc.data() });
      });
      setUomList(tempArr);
    });

    setIssueDate(getCurrentDateAndTime());
    return () => {
      uomList2();
    };
  }, []);

  const navigate = useNavigate();
  const GoBack = () => {
    navigate("/");
  };
  return (
    <section className="w-full flex flex-col items-center justify-center mt-2 p-2 mx-5">
      <div className="bg-gray-100 w-[90%]">
        <ToastContainer />
        <div className="bg-gradient-to-tl from-sky-400 to-sky-800 p-2 flex justify-between items-center">
          <h1 className="text-white text-sm font-bold">
            Product Transfer Entry
          </h1>
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
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Invoice No
                </label>
                <input
                  type="text"
                  placeholder="Enter Invoice"
                  value={InvoiceNum}
                  onChange={(e) => setInvoiceNum(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  placeholder="Enter Vehicle Number"
                  value={vehicleNum}
                  onChange={(e) => setVehicleNum(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Transfer Type
                </label>
                <input
                  type="text"
                  placeholder="Enter Transfer type"
                  value={transferType}
                  onChange={(e) => setTransferType(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
            <div className="w-[50%] p-2">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Issue Date and Time
                </label>
                <input
                  type="text"
                  value={issueDate}
                  readOnly
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Transfer To
                </label>
                <input
                  type="text"
                  placeholder="Enter transfer to"
                  value={transferTo}
                  onChange={(e) => setTransferTo(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Note
                </label>
                <input
                  type="text"
                  placeholder="Enter a note (if any)"
                  value={Note}
                  onChange={(e) => setNote(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="my-5">
            <h1 className="text-white text-left text-sm font-bold bg-gradient-to-tl from-sky-400 to-sky-800 p-2">
              Product Transfer Details
            </h1>
            <hr />
            <table className="w-[90%] items-center m-auto mt-2 text-xs text-left text-gray-50  border-collapse border border-gray-400">
              <thead className="text-xs text-gray-50 uppercase bg-gradient-to-l from-sky-500 via-violet-500 to-pink-500">
                <tr>
                  <th className="p-2 border border-gray-400">Product Name</th>
                  <th className="p-2 border border-gray-400">UOM</th>
                  <th className="p-2 border border-gray-400">Unit Price</th>

                  <th className="p-2 border border-gray-400">Quantity</th>
                  <th className="p-2 border border-gray-400">
                    Amount Without VAT
                  </th>
                  <th className="p-2 border border-gray-400">Remarks</th>
                  <th className="p-2 border border-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td className="p-2 border border-gray-400 w-[30%]">
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 w-[10%]">
                    <select
                      value={uom}
                      onChange={(e) => setUom(e.target.value)}
                      className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option className="text-gray-600">Select...</option>
                      {uomList &&
                        uomList.map((item, index) => (
                          <option key={index}>{item.uom}</option>
                        ))}
                    </select>
                  </td>
                  <td className="p-2 border border-gray-400 w-[10%]">
                    <input
                      type="number"
                      value={unitPrice}
                      onChange={(e) => setUnitPrice(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 w-[10%]">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 w-[15%]">
                    <input
                      type="text"
                      disabled
                      value={unitPrice * quantity}
                      onChange={(e) => setAmountWithoutVAT(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 w-[15%]">
                    <input
                      type="text"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 w-[10%]">
                    <button
                      className="text-lg text-gray-800"
                      onClick={handleAddProduct}
                    >
                      <AiOutlinePlusCircle />
                    </button>
                  </td>
                </tr>
                {productList.map((product, index) => (
                  <tr key={index}>
                    <td className="p-2 border text-gray-800 border-gray-400 w-[30%]">
                      {product.productName}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 w-[10%]">
                      {product.uom}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 w-[10%]">
                      {product.unitPrice}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 w-[10%]">
                      {product.quantity}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 w-[15%]">
                      {product.amountWithoutVAT}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 w-[15%]">
                      {product.remarks}
                    </td>
                    <td className="p-2 border border-gray-400 w-[10%]">
                      <button
                        className="text-lg text-gray-800"
                        onClick={() => handleDeleteProduct(index)}
                      >
                        <AiOutlineMinusCircle />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="p-2 border text-gray-800 border-gray-400 w-[30%]">
                    Total
                  </td>
                  <td className="p-2 border text-gray-800 border-gray-400 w-[10%]"></td>
                  <td className="p-2 border text-gray-800 border-gray-400 w-[10%]"></td>
                  <td className="p-2 border text-gray-800 border-gray-400 w-[10%]">
                    {totalQuantity}
                  </td>
                  <td className="p-2 border text-gray-800 border-gray-400 w-[15%]">
                    {totalAmountWithoutVAT}
                  </td>
                  <td className="p-2 border text-gray-800 border-gray-400 w-[15%]"></td>
                  <td className="p-2 border border-gray-400 w-[10%]"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-5 ml-16">
            <button
              type="submit"
              onClick={handleUpload}
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

export default Musak65Entry;
