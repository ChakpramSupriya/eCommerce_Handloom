import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../BaseURL/Product";
import { Link } from "react-router-dom";
import { CloudinaryConfig } from "../../../Cloudinary";
const TopSales = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  const [filterItems, setFilterItems] = useState([]);
  const [minDiscount, setMinDiscount] = useState(60);
  const {
    data: productData = {},
    isLoading: isLoadingProducts,
    isError: isProductError,
    error: productError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const productLists = productData.products || [];

  useEffect(() => {
    const filteredProducts = () => {
      setFilterItems(
        productLists.filter((product) => product.discount >= minDiscount)
      );
    };
    filteredProducts();
  }, [productLists, minDiscount]);
  return (
    <>
      <div className="drop-shadow-md">
        <div className="overflow-hidden rounded-xl  sm:h-[440px] h-[330px] hero-bg-color  ">
          <div className="container pb-2 ml-0 pr-0  sm:pb-0">
            <h1 className="gap-4 flex justify-start items-start text-2xl font-semibold  text-black hover:text-red-500 dark:text-white p-2 ">
              Top sales
              <p className="text-[16px] text-red-500">Above {minDiscount}% </p>
            </h1>
            <div className="sm:m-auto sm:p-5 sm:w-auto pt-1 pr-8 w-[400px]">
              <Slider {...settings}>
                {filterItems?.map((item, id) => {
                  return (
                    <div
                      key={item.id}
                      className="bg-gray-100 drop-shadow-md rounded-md sm:w-24 sm:h-[330px]  w-[300px] h-[230px] "
                    >
                      <div className="">
                        <img
                          className="sm:w-56 sm:h-56 w-[150px] h-[150px] object-fit m-auto p-3"
                          src={`${
                            CloudinaryConfig.CLOUDINARY_URL
                          }/image/upload/${item?.image_id[0]?.replace(
                            /"/g,
                            ""
                          )}`}
                          alt=""
                        />
                      </div>
                      <div className="flex justify-around sm:p-2 p-2">
                        <div className="sm:text-[16px] text-[13px] text-black">
                          <p className="">{item.name}</p>
                          <p className="text-red-500 ">
                            ₹ {item.discountedPrice}
                          </p>
                        </div>
                        <Link
                          to="/checkout"
                          type="button"
                          className="bg-red-600 hover:bg-red-500 sm:text-[14px] text-[10px] text-center pt-2 sm:w-[85px] sm:h-[38px] w-[65px] h-8 text-white rounded-md"
                        >
                          Buy now
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopSales;
