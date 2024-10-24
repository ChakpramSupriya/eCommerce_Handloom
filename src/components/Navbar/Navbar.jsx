import React, { useContext, useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";
import { ShopContext } from "../Context/ShopContext";
import { BsFillArchiveFill } from "react-icons/bs";
import { useAuth } from "../Context/auth";
import { Tooltip, Button } from "@mantine/core";
import { BsFillBoxFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@mantine/core";
import { X, Menu } from "lucide-react";
import { Axios } from "../../../api";
import SearchBar from "../Search/SearchBar";
import CategoryOption from "./CategoryOption";
import WomenCategoryOption from "./WomenCategoryOption";
import MenCategoryOption from "./MenCategoryOption";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const getAllCategory = async () => {
    try {
      const res = await Axios({
        url: "/category",
        method: "GET",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const { data: menCategory, isLoading } = useQuery({
    queryKey: ["menCategory"],
    queryFn: () =>
      Axios({
        url: "/category?gender=male&isProductForKids=false",
        method: "GET",
      }),
  });
  //men
  const menCategories = menCategory?.data?.categories || [];
  const filteredMen = menCategories
    .filter((category) => category.gender?.toLowerCase() === "male")
    .sort((a, b) => a.name?.localeCompare(b.name));

  const { data: womenCategory } = useQuery({
    queryKey: ["womenCategory"],
    queryFn: () =>
      Axios({
        url: "/category?gender=female&isProductForKids=false",
        method: "GET",
      }),
  });
  //women
  const womenCategories = womenCategory?.data?.categories || [];
  const filteredWomen = womenCategories
    .filter((category) => category.gender?.toLowerCase() === "female")
    .sort((a, b) => a.name?.localeCompare(b.name));

  const { data: kidsCategory, isLoading: isLoadingKidsCategory } = useQuery({
    queryKey: ["kidsCategory"],
    queryFn: () =>
      Axios({
        url: "/category?isProductForKids=true",
        method: "GET",
      }),
  });
  const kidsCategories = kidsCategory?.data?.categories || [];
  const filteredKids = kidsCategories.sort((a, b) =>
    a.name?.localeCompare(b.name)
  );

  const { getTotalCartItems } = useContext(ShopContext);
  return (
    <>
      <div className=" bg-white duration-200 z-40 fixed top-0 right-0 left-0">
        <div className=" p-2 relative ">
          <div className=" container flex justify-between items-center sm:text-[16px] ">
            <div className="flex  items-center gap-7">
              <NavLink
                to="/"
                className="text-primary tracking-widest uppercase sm:text-3xl"
              >
                <img
                  className="w-[80px] h-[50px] object-fit "
                  src="/final_logo.jpg"
                  alt=""
                />
              </NavLink>

              <div className="hidden lg:block  ">
                <ul className="flex items-center font-semibold gap-8 ">
                  <li className="relative cursor-pointer group   ">
                    <div className=" navbar text-[15px]  ">
                      <span className="flex items-center text-[16px] mt-1">
                        <MenCategoryOption title="MEN" />
                        <IoMdArrowDropdown />
                      </span>
                    </div>
                    <div className="absolute z-[9999] hidden group-hover:block text-red-400">
                      <div className="">
                        <MenCategoryOption filteredMen={filteredMen} />
                      </div>
                    </div>
                  </li>

                  <li className="relative cursor-pointer group  ">
                    <div className=" navbar text-[16px] flex ">
                      <span className="flex items-center text-[16px] mt-1">
                        <WomenCategoryOption title="WOMEN" />
                        <IoMdArrowDropdown />
                      </span>
                    </div>
                    <div
                      className="absolute z-[9999] hidden group-hover:block "
                      style={{ marginLeft: "-90px" }}
                    >
                      <div className="">
                        <WomenCategoryOption filteredWomen={filteredWomen} />
                      </div>
                    </div>
                  </li>

                  <li className="relative cursor-pointer group  ">
                    <div className=" navbar text-[16px] flex ">
                      <span className="flex items-center text-[16px] mt-1">
                        <CategoryOption title="KIDS" />
                        <IoMdArrowDropdown />
                      </span>
                    </div>
                    <div
                      className="absolute z-[9999] hidden group-hover:block  "
                      style={{ marginLeft: "-200px" }}
                    >
                      <div className="flex flex-col text-red-400  ">
                        <CategoryOption filteredKids={filteredKids} />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* navbar right section */}
            <div className="flex justify-between items-center gap-2">
              {/* Search bar section */}
              <SearchBar />

              {/* Hamburger menu button */}
              <button
                type="button"
                onClick={toggleSidebar}
                className="text-black rounded-md md:hidden"
              >
                {!isOpen && <Menu />}
              </button>

              {/* Sidebar */}
              <div
                className={`fixed top-0 left-0 block md:hidden h-full w-64 bg-white text-red-400 transform transition-transform duration-300 ease-in-out ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0`}
              >
                <div className="p-4">
                  <div className="flex justify-between ">
                    <NavLink
                      to="/"
                      className="text-primary tracking-widest uppercase sm:text-3xl "
                    >
                      <img
                        className="w-[50px] h-[25px] object-fit mb-3 "
                        src="/mainLogo.png"
                        alt=""
                      />
                    </NavLink>
                    <button
                      type="button"
                      onClick={toggleSidebar}
                      className="text-black rounded-md md:hidden"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <hr className="h-[2px] text-gray-500 bg-gray-500 " />
                  <nav>
                    <ul className="space-y-2">
                      {/* men */}

                      <li>
                        <NavLink
                          to="/cart"
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-red-300"
                        >
                          <FaShoppingCart size={20} />
                          <span>Carts</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/wishlist"
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-red-300"
                        >
                          <GrFavorite size={20} />
                          <span>Wishlist</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/myorder"
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-red-300"
                        >
                          <BsFillArchiveFill size={20} />
                          <span>Orders</span>
                        </NavLink>
                        <NavLink
                          to=""
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-red-300"
                        >
                          <BsFillBoxFill size={20} />
                          <span>Become a Seller</span>
                        </NavLink>
                        <NavLink
                          to="/login"
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-red-300"
                        >
                          <Avatar size={25} color="red" />
                          <span>Login</span>
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>

              {/* end */}
              <div className="hidden md:block ">
                <div className="flex justify-center items-center gap-2">
                  <Tooltip className="bg-red-500" label="carts">
                    <NavLink to="/cart" type="button" className="relative p-3">
                      <label htmlFor="">Bags</label>
                      <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                        {getTotalCartItems()}
                      </div>
                    </NavLink>
                  </Tooltip>
                  <Tooltip className="bg-red-500" label="Wishlist">
                    <NavLink
                      to="/wishlist"
                      type="button"
                      className="relative p-3"
                    >
                      {/* <GrFavorite className="text-xl text-gray-600 dark:text-gray-400" /> */}
                      <label htmlFor="">Wishlist</label>
                    </NavLink>
                  </Tooltip>
                  <div>
                    <Button
                      className="text-white px-2 py-[-2px]  "
                      variant="filled"
                      color="red"
                    >
                      <BsFillBoxFill className="m-1" />
                      Seller
                    </Button>
                  </div>
                  {auth?.token && (
                    <Tooltip className="bg-red-500" label="Orders">
                      <NavLink
                        to="/myorder"
                        type="button"
                        className="relative "
                      >
                        {/* <BsFillArchiveFill className="text-xl text-gray-600 dark:text-gray-400" /> */}
                        <label htmlFor="">Orders</label>
                      </NavLink>
                    </Tooltip>
                  )}
                  {!auth.token ? (
                    <Tooltip label="Login" className="bg-red-500">
                      <NavLink
                        to="/login"
                        type="button"
                        className="relative p-2"
                      >
                        <button type="button">
                          <Avatar src={null} alt="no image here" color="red" />
                        </button>
                      </NavLink>
                    </Tooltip>
                  ) : (
                    <button
                      type="button"
                      className="bg-white w-[80px] h-[30px] outline-black border  dark:text-white dark:bg-black hover:bg-red-500 duration-[3000ms]"
                      onClick={() => {
                        localStorage.removeItem("auth");
                        setAuth({
                          message: "",
                          token: "",
                        });
                      }}
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
