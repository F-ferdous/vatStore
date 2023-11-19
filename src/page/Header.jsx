import React, { useState } from "react";
import { AiFillCodeSandboxCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const links = [
    {
      name: "Master Entry",
      submenu: true,
      sublinks: [
        { name: "Customer Entry", link: "/CustomerEntry" },
        { name: "Supplier Entry", link: "/SupplierEntry" },
        { name: "Product Entry", link: "/ProductEntry" },
        { name: "Product Category Entry", link: "/ProductCategoryEntry" },
        { name: "UOM Entry", link: "/UomEntry" },
        { name: "Declaration Type Entry", link: "/DeclarationEntry" },
      ],
    },
    {
      name: "Master Data",
      submenu: true,
      sublinks: [
        { name: "Customer View", link: "/CustomerView" },
        { name: "Supplier View", link: "/SupplierView" },
        { name: "Product View", link: "/ProductView" },
        { name: "Product Category View", link: "/ProductCategoryView" },
        { name: "UOM View", link: "/UomView" },
        { name: "Declaration Type View", link: "/DeclarationView" },
      ],
    },
    {
      name: "Report Entry",
      submenu: true,
      sublinks: [
        { name: "6.1 Entry", link: "/6.1Entry" },
        { name: "Musak 6.3 Entry", link: "/SalesEntry" },
        { name: "Product Transfer Entry", link: "/ProductTransferEntry" },
      ],
    },
    {
      name: "Reports View",
      submenu: true,
      sublinks: [
        { name: "Musak 6.1 Report", link: "/Musak6.1Reports" },
        { name: "Sales Entry Report", link: "/SalesEntryList" },
        { name: "Product Transfer Reports", link: "/ProductTransferList" },
      ],
    },
  ];
  return (
    <section className="w-full bg-gradient-to-r from-sky-500 via-violet-600 to-pink-500 px-5">
      <div className=" flex justify-between items-center mx-5 px-2 py-5">
        <p className="flex gap-2 text-xl font-bold p-0 m-0 items-center text-white">
          <AiFillCodeSandboxCircle className="text-3xl text-gray-800" /> VMS
        </p>
        <div>
          <ul className="flex items-center gap-8 text-white font-semibold group">
            {links.map((link, index) => (
              <div>
                <li
                  className="cursor-pointer p-2 hover:text-gray-900"
                  onMouseEnter={() => setHoveredItem(index)}
                >
                  {link?.name}
                </li>
                {link.submenu && hoveredItem === index && (
                  <div>
                    <div className="absolute top-20 ">
                      <div
                        className="bg-gradient-to-b from-sky-500  to-sky-600 p-3.5 "
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {link.sublinks.map((sub) => (
                          <li className="text-sm text-left text-gray-50 px-3 py-3 hover:bg-sky-800 hover:text-gray-50">
                            <Link to={sub.link}>{sub.name}</Link>
                          </li>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ul>
        </div>

        <div>
          <Link
            to="/login"
            className="px-3 py-2 rounded-lg bg-[#c6066e] font-semibold text-gray-50 hover:text-gray-800 hover:border-gray-50"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;
