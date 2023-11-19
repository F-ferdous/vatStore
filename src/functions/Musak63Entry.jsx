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

const Musak63Entry = () => {
  const [productList, setProductList] = useState([]);
  const [productName, setProductName] = useState("");
  const [uom, setUom] = useState("");
  const [unitPrice, setUnitPrice] = useState(0.0);
  const [uomList, setUomList] = useState();
  const [StockQty, setStockQty] = useState(0.0);
  const [IssueQty, setIssueQty] = useState(0.0);
  const [Sku, setSku] = useState();
  const [NetAmount, setNetAmount] = useState(0.0);
  const [Vat, setVat] = useState(0.0);
  const [GrossAmount, setGrossAmount] = useState(0.0);
  const [ItemNo, setItemNo] = useState();
  const [remarks, setRemarks] = useState("");

  const [InvoiceNum, setInvoiceNum] = useState();
  const [Address, setAddress] = useState("");
  const [ExportRemarks, setExportRemarks] = useState("");
  const [Cpc, setCpc] = useState("");
  const [ExportRate, setExportRate] = useState("");
  const [Customer, setCustomer] = useState();
  const [ChallanType, setChallanType] = useState(
    "(1004) Standard Rated Goods/Service(15%)"
  );
  const [issueDate, setIssueDate] = useState("");
  const [DeliveryDate, setDeliveryDate] = useState();
  const [BIN, setBIN] = useState();
  const [Destination, setDestination] = useState();
  const [VehicleNature, setVehicleNature] = useState();

  const [totalSku, setTotalSku] = useState(0.0);
  const [totalNetamount, setTotalNetamount] = useState(0.0);
  const [totalgrossamount, setTotalgrossamount] = useState(0.0);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newAmountWithoutVAT = unitPrice * IssueQty;
    const Gross = newAmountWithoutVAT * 0.15 + newAmountWithoutVAT;
    const newProduct = {
      productName,
      uom,
      unitPrice,
      StockQty,
      IssueQty,
      Sku,
      NetAmount: newAmountWithoutVAT,
      Vat: 0.15,
      GrossAmount: Gross,
      ItemNo,
      remarks,
    };
    setProductList([...productList, newProduct]);
    // Clear input fields after adding a new product
    /* setTotalQuantity(totalQuantity + parseInt(quantity, 10));
    setTotalAmountWithoutVAT(totalAmountWithoutVAT + newAmountWithoutVAT);


 */
    setTotalSku(totalSku + parseInt(Sku, 10));
    setTotalNetamount(totalNetamount + parseInt(NetAmount, 10));
    setTotalgrossamount(totalgrossamount + parseInt(GrossAmount, 10));

    setProductName("");
    setUom("");
    setUnitPrice();
    setStockQty("");
    setIssueQty();
    setIssueQty();
    setSku();
    setNetAmount();
    setVat("");
    setGrossAmount();
    setItemNo("");
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

    /* setTotalQuantity(totalQuantity - parseInt(deletedProduct.quantity, 10));
    setTotalAmountWithoutVAT(
      totalAmountWithoutVAT - deletedProduct.amountWithoutVAT
    ); */
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const data = {
        issueDate,
        DeliveryDate,
        InvoiceNum,
        Customer,
        Address,
        BIN,
        ChallanType,
        Destination,
        ExportRemarks,
        VehicleNature,
        Cpc,
        ExportRate,
        totalNetamount,
        totalSku,
        totalgrossamount,
        productList,
      };
      await addDoc(collection(db, "SalesEntry"), {
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
        setAddress("");

        setChallanType("");
        setCustomer("");
        setDestination("");
        setBIN("");
        setExportRemarks("");
        setVehicleNature("");
        setExportRate("");
        setCpc("");
        setProductList([]);
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
    setDeliveryDate(getCurrentDateAndTime());
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
          <h1 className="text-white text-sm font-bold">Sales Entry</h1>
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
                  Customer
                </label>
                <input
                  type="text"
                  placeholder="Enter Customer Name"
                  value={Customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>

              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Challan Type
                </label>
                <input
                  type="text"
                  placeholder=""
                  disabled
                  value={ChallanType}
                  onChange={(e) => setChallanType(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Export Remarks
                </label>
                <input
                  type="text"
                  placeholder="Enter Export Remarks"
                  value={ExportRemarks}
                  onChange={(e) => setExportRemarks(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  CPC
                </label>
                <input
                  type="text"
                  placeholder="Enter CPC"
                  value={Cpc}
                  onChange={(e) => setCpc(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Export Rate
                </label>
                <input
                  type="text"
                  placeholder="Enter Export Rate"
                  value={ExportRate}
                  onChange={(e) => setExportRate(e.target.value)}
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
                  Delivery Date and Time
                </label>
                <input
                  type="text"
                  value={DeliveryDate}
                  readOnly
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  TBIN/NID
                </label>
                <input
                  type="text"
                  placeholder="Enter BIN"
                  value={BIN}
                  onChange={(e) => setBIN(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  placeholder="Enter Destination"
                  value={Destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Vehicle Nature & No
                </label>
                <input
                  type="text"
                  value={VehicleNature}
                  placeholder="Enter Vehicle Number"
                  onChange={(e) => setVehicleNature(e.target.value)}
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
            <table className="w-[95%] items-center m-auto mt-2 text-xs text-left text-gray-50  border-collapse border border-gray-400">
              <thead className="text-xs text-gray-50 uppercase bg-gradient-to-l from-sky-500 via-violet-500 to-pink-500">
                <tr>
                  <th className="p-2 border border-gray-400">Product Name</th>
                  <th className="p-2 border border-gray-400">UOM</th>
                  <th className="p-2 border border-gray-400">Unit Price</th>
                  <th className="p-2 border border-gray-400">Stock Qty</th>
                  <th className="p-2 border border-gray-400">Issue Qty</th>
                  <th className="p-2 border border-gray-400">SKU</th>
                  <th className="p-2 border border-gray-400">Net Amount</th>

                  <th className="p-2 border border-gray-400">Gross Amount</th>
                  <th className="p-2 border border-gray-400">Remarks</th>
                  <th className="p-2 border border-gray-400">Item No</th>
                  <th className="p-2 border border-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td className="p-2 border border-gray-400 w-[15%]">
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 w-[7%]">
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
                  <td className="p-2 border border-gray-400 w-[7%]">
                    <input
                      type="number"
                      value={unitPrice}
                      onChange={(e) => setUnitPrice(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 w-[7%]">
                    <input
                      type="number"
                      value={StockQty}
                      onChange={(e) => setStockQty(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 w-[7%]">
                    <input
                      type="number"
                      value={IssueQty}
                      onChange={(e) => setIssueQty(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 w-[7%]">
                    <input
                      type="text"
                      value={Sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 w-[7%]">
                    <input
                      type="text"
                      disabled
                      value={unitPrice * IssueQty}
                      onChange={(e) => setNetAmount(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>

                  <td className="p-2 border border-gray-400 w-[7%]">
                    <input
                      type="text"
                      disabled
                      value={NetAmount * 0.15 + NetAmount}
                      onChange={(e) => setGrossAmount(e.target.value)}
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
                    <input
                      type="text"
                      value={ItemNo}
                      onChange={(e) => setItemNo(e.target.value)}
                      className="appearance-none block  w-[80px] bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 w-[7%]">
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
                      {product.StockQty}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 w-[15%]">
                      {product.IssueQty}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 w-[15%]">
                      {product.Sku}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 w-[15%]">
                      {product.NetAmount}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 w-[15%]">
                      {product.GrossAmount}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 w-[15%]">
                      {product.ItemNo}
                    </td>

                    <td className="p-2 border text-gray-800 border-gray-400 w-[15%]">
                      {product.remarks}
                    </td>
                    <td className="p-2 border border-gray-400 w-[7%]">
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
                    {/* {totalQuantity} */}
                  </td>
                  <td className="p-2 border text-gray-800 border-gray-400 w-[15%]">
                    {/* {totalAmountWithoutVAT} */}
                  </td>
                  <td className="p-2 border text-gray-800 border-gray-400 w-[15%]">
                    {totalSku}
                  </td>
                  <td className="p-2 border border-gray-400 w-[7%]">
                    {totalNetamount}
                  </td>
                  <td className="p-2 border text-gray-800 border-gray-400 w-[10%]">
                    {totalgrossamount}
                  </td>
                  <td className="p-2 border text-gray-800 border-gray-400 w-[10%]"></td>
                  <td className="p-2 border text-gray-800 border-gray-400 w-[10%]"></td>
                  <td className="p-2 border text-gray-800 border-gray-400 w-[10%]"></td>
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

export default Musak63Entry;
