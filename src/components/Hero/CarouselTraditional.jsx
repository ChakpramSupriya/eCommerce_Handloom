import Slider from "react-slick";
import React, { useEffect, useState } from "react";

import Image1 from "../../assets/Category/hero1.png";
import Image2 from "../../assets/Category/hero2.png";
import Image3 from "../../assets/Category/hero3.png";
import Image4 from "../../assets/Category/hero4.png";
import Image5 from "../../assets/Category/hero5.png";
import Image6 from "../../assets/Category/hero6.png";
import Button from "../Shared/Button";
import instance from "../../../api";

const HeroData = [
  {
    id: 1,
    img: Image1,
    subtitle: "Rani phi",
    title: "Manipur",
    title2: "Traditional Attire",
    description:
      "Rani phi, the cloth of Rani is the silk cloth that is precious to the Manipuri women and is worn on special occasions like weddings, social functions, and every good beginning.",
  },
  {
    id: 2,
    img: Image2,
    subtitle: "Pheichom pumyat for kids ",
    title: "Manipur",
    title2: "Pumyat Kurta",
    description:
      "Khudei, also known as Khoodei or Old Manipuri Khutei or Khootei, is a traditional Meitei daily wear loincloth typically covering the body from waist to knee. In some cases it is also used as a cotton towel. Khudei is a short, woven cloth designed to wrap around the body.",
  },
  {
    id: 3,
    img: Image3,
    subtitle: "Wangkhei phi",
    title: "Manipur",
    title2: "Traditional Attire",
    description:
      "The Wangkhei Phee is made with very fine white cotton yarn with a closely woven texture. The interlacing of cotton weft and warp is woven by women, in series and widely spaced from each other, that makes the fabric fully transparent.",
  },
  {
    id: 4,
    img: Image4,
    subtitle: "Blouse-top for women",
    title: "Manipur",
    title2: "Traditional Attire",
    description:
      "A blouse is a type of women's shirt that is considered to have a slightly dressier look than most tops.  Blouses often have a rounded hem, allowing them to be worn tucked in or left untucked, depending on your preferred style.",
  },
  {
    id: 5,
    img: Image5,
    subtitle: " Pumyat Kurta for man",
    title: "Manipur",
    title2: "Traditional Attire",
    description:
      "In Meitei culture, a pumyat should always pairs with a pheichom (pheijom). This is also a common to the wedding bridegrooms in Meitei matrimony, with the addition of a kokyet. It is slightly similar to the kurtas, worn by the mainland Indian menfolk.",
  },
  {
    id: 6,
    img: Image6,
    subtitle: "Phanek Mayek Naibi",
    title: "Manipur",
    title2: "Traditional Attire",
    description:
      "The Phanek Mayek Naibi, one of the most popular phaneks, is one such lower garment, which has stripes at its bottom. It is worn when one goes to office works and in marriage ceremonies. Its bottom is adorned with heavy embroidery in different designs.",
  },
];

const CarouselTraditional = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
    autoplaySpeed: 2500,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };
  const [carouselData, setCarouselData] = useState();

  const fetchCarouselData = async () => {
    try {
      const res = await instance({
        url: "/carousel",
        method: "GET",
      });
      console.log(res);
      setCarouselData(res.data.list);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCarouselData();
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      speed: 300,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="mt-16 rounded-3xl text-2xl overflow-hidden  min-h-[210px] sm:min-h-[450px] hero-bg-color flex items-center flex-col pt-6 gap-y-3.5">
      <div className="p-4 m-1 w-full ">
        <Slider {...settings}>
          {carouselData?.map((data) => (
            <div key={data.id}>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-10">
                <div className="flex flex-col justify-center sm:gap-6 gap-4 sm:pl-4 sm:pt-0  sm:text-left text-left order-2 sm:order-1 relative z-10">
                  <h1 className="text-2xl sm:text-6xl lg:text-2xl font-bold">
                    {data.subtitle}
                  </h1>
                  <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold">
                    {data.title}
                  </h1>
                  <h1 className="sm:text-5xl text-[38px] uppercase text-white  md:text-[100px]  font-bold">
                    {data.title2}
                  </h1>
                </div>

                <div className=" order-2 sm:order-1 pl-10 h-fit ">
                  <img
                    src={`http://drive.google.com/thumbnail?id=${data.img}`}
                    alt=""
                    className="w-[150px] h-[120px] sm:w-[350px] sm:h-[320px] sm:scale-105 lg:scale-100 object-fit m-auto sm:pl-10 pl-4 drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)]  z-40"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
    // </div>
  );
};

export default CarouselTraditional;
