import {
  getAdvistory,
  getEarthShotPage,
  getEartshotSlider,
} from "@/API/helper";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css";
import Head from "next/head";
const earthshot = () => {
  const [earthquakeDatas, setEarthquakeDatas] = useState(null);
  const [earthSliderData, setEarthSliderData] = useState(null);
  const [advistoryData, setAdvistoryData] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  useEffect(() => {
    const fetchEarthquake = async () => {
      await getEarthShotPage().then((res) => {
        setEarthquakeDatas(res.data);
      });
    };
    fetchEarthquake();
  }, []);

  useEffect(() => {
    const fetchEarthSlider = async () => {
      await getEartshotSlider().then((res) => {
        setEarthSliderData(res.data);
      });
    };
    fetchEarthSlider();
  }, []);

  useEffect(() => {
    const fetchAdvistory = async () => {
      await getAdvistory().then((res) => {
        setAdvistoryData(res.data);
      });
    };
    fetchAdvistory();
  }, []);

  const obj =
    earthquakeDatas &&
    earthquakeDatas.page.map((item) =>
      JSON.parse(JSON.stringify(item.content))
    );
  const ref = useRef(null);
  const itemTitleWithLineBreaks =
    earthquakeDatas && earthquakeDatas.title.replace(/<br\s*\/?>/g, "<br/>");

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex;
    setActiveSlideIndex(newIndex);
  };

  const SliderInfoBox = () => {
    const isFind =
      advistoryData && advistoryData.find((c, i) => i === activeSlideIndex);
    return (
      <div className="bg-[#0a23fa] p-10 w-[350px] md:w-[300px] rounded-xl">
        <div className="text-white">
          <h1>{isFind && isFind.name_surname}</h1>
          <h1>{isFind && isFind.title}</h1>
          <h1>{isFind && isFind.desc}</h1>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Head>
        <title>{earthquakeDatas && earthquakeDatas.meta_title}</title>
        <meta
          name="description"
          content={earthquakeDatas && earthquakeDatas.meta_desc}
        />
      </Head>
      {earthquakeDatas && (
        <div className="w-full relative">
          <img
            className="w-full  md:h-screen object-cover"
            src={earthquakeDatas.bg_image}
            alt=""
          />
          <div className="absolute  md:top-64 md:left-0 top-96 left-48">
            <img
              src={earthquakeDatas.image}
              alt=""
              className="w-64 md:w-48 mb-4"
            />
            <div className="text-white">
              <div
                className="text-6xl md:text-3xl"
                dangerouslySetInnerHTML={{
                  __html: itemTitleWithLineBreaks,
                }}
              />
            </div>
            <div className="flex gap-3 mt-5">
              <a
                target="_blank"
                className="px-12 md:px-8 py-4 bg-[#FD8204] text-base text-white rounded-md"
                href={earthquakeDatas.web_site_link}
              >
                Earthshot Prize
              </a>
              <a
                className="px-12 md:px-8 py-4 bg-[#FD8204]  text-base text-white rounded-md"
                href="/"
              >
                Tanıtım Videosu
              </a>
            </div>
          </div>
        </div>
      )}
      <div className="">
        {obj &&
          obj.map((o, i) => (
            <div id={"earth" + i} key={i}>
              <div ref={ref} dangerouslySetInnerHTML={{ __html: o }} />
            </div>
          ))}
      </div>
      <div className="pl-48 md:pl-0 md:pr-0 pr-48 mt-16 mb-8">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          loop={true}
          scrollbar={{ draggable: true }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          spaceBetween={50}
          slidesPerView={1}
        >
          {earthSliderData &&
            earthSliderData.map((item, index) => (
              <SwiperSlide className="w-full" key={index}>
                <div className="w-full md:flex-col-reverse flex bg-[#F9F7F3] items-center">
                  <div className="w-1/2 md:w-full flex gap-4 flex-col md:p-4 p-16">
                    <h1 className="text-4xl font-bold">{item.title}</h1>
                    <div
                      className="text-xl text-[#0B2538] font-light"
                      dangerouslySetInnerHTML={{
                        __html: item.desc.replace(/<br\s*\/?>/g, "<br/>"),
                      }}
                    />
                  </div>
                  <div className="w-1/2 md:w-full md:flex md:justify-center md:items-center md:pl-0 pl-24">
                    <img src={item.image} alt="" className="w-96 md:w-48" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          {/* <div className="swiper-button-prev md:hidden">
            <i
              className="pi pi-angle-left bg-[#52B846] cursor-pointer text-white rounded-full p-3"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>
          <div className="swiper-button-next md:hidden">
            <i
              className="pi pi-angle-right bg-[#52B846] text-white  rounded-full p-3"
              style={{ fontSize: "2rem" }}
            ></i>
          </div> */}
        </Swiper>
      </div>

      <div className="editSlider relative mb-16">
        <div className="relative md:left-8 left-[400px] md:top-[630px] w-fit z-10 top-[300px]">
          <SliderInfoBox />
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          loop={true}
          scrollbar={{ draggable: true }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          onSlideChange={handleSlideChange}
          spaceBetween={50}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            767: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
          centeredSlides={true}
        >
          {advistoryData &&
            advistoryData.map((item, index) => {
              return (
                <div key={index} className="">
                  <SwiperSlide className="w-full">
                    <div className="">
                      <img
                        className="w-full md:h-[70vh] object-cover"
                        src={item.image}
                        alt
                      />
                    </div>
                  </SwiperSlide>
                </div>
              );
            })}
          {/* <div className="swiper-button-prev md:hidden">
            <i
              className="pi pi-angle-left bg-[#52B846] cursor-pointer text-white rounded-full p-3"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>
          <div className="swiper-button-next md:hidden">
            <i
              className="pi pi-angle-right bg-[#52B846] text-white  rounded-full p-3"
              style={{ fontSize: "2rem" }}
            ></i>
          </div> */}
        </Swiper>
      </div>
    </div>
  );
};

export default earthshot;
