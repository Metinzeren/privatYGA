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
import { Dialog } from "primereact/dialog";
import { useTranslation } from "next-i18next";
import Loading from "@/components/Loading";

export async function getServerSideProps(context) {
  const localeCookie = context.req.cookies["NEXT_LOCALE"];
  var resEarth = await fetch(
    `https://yga.org.tr/cms/api/v1/${localeCookie}/page/earthshot-prize`
  );
  var data = await resEarth.json();

  var resSlider = await fetch(
    `https://yga.org.tr/cms/api/v1/${localeCookie}/earthshot-prize`
  );
  var sliderData = await resSlider.json();

  var resAdvistory = await fetch(
    `https://yga.org.tr/cms/api/v1/${localeCookie}/advisory-board`
  );
  var adData = await resAdvistory.json();
  return {
    props: {
      earthDataTwo: data,
      advisDataTwo: adData,
      slider: sliderData,
    },
  };
}

const earthshot = ({ slider, advisDataTwo, earthDataTwo }) => {
  const [earthquakeDatas, setEarthquakeDatas] = useState(earthDataTwo);
  const [earthSliderData, setEarthSliderData] = useState(slider);
  const [advistoryData, setAdvistoryData] = useState(advisDataTwo);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [displayModal, setDisplayModal] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(false);
  }, [slider, advisDataTwo, earthDataTwo]);

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
    setActiveSlide(swiper.activeIndex);
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
    <Loading loading={isLoading}>
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
          <div className="absolute  md:top-64 md:left-8 top-80 right-64">
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
                className="px-12 md:px-12 py-4 bg-[#FD8204] text-base md:text-sm text-white rounded-md"
                href={earthquakeDatas.web_site_link}
              >
                Earthshot Prize
              </a>
              <p
                className="px-12 md:px-12 py-4 bg-[#FD8204] cursor-pointer md:text-sm  text-base text-white rounded-md"
                onClick={() => setDisplayModal(true)}
              >
                Tanıtım Videosu
              </p>
            </div>
          </div>
        </div>
      )}
      <Dialog
        visible={displayModal}
        onHide={() => setDisplayModal(false)}
        modal
        style={{ width: "60vw" }}
      >
        <iframe
          allowFullScreen
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${
            earthquakeDatas && earthquakeDatas.video
          }`}
        ></iframe>
      </Dialog>
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
          <div className="swiper-button-prev md:hidden absolute">
            <i
              className="pi pi-angle-left bg-transparent cursor-pointer text-[#FD8204] rounded-full p-3"
              style={{ fontSize: "3rem" }}
            ></i>
          </div>
          <div className="swiper-button-next md:hidden absolute">
            <i
              className="pi pi-angle-right bg-transparent text-[#FD8204]  rounded-full p-3"
              style={{ fontSize: "3rem" }}
            ></i>
          </div>
        </Swiper>
      </div>
      <div className="pl-48 md:pl-4 md:pr-4 pr-48 mt-16">
        <h1 className="text-4xl font-bold text-[#0a23fa]">{t("earthtitle")}</h1>
        <p className="text-base font-light">{t("earthtext")}</p>
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
            prevEl: ".swiper-button-prev6",
            nextEl: ".swiper-button-next6",
          }}
          onSlideChange={handleSlideChange}
          spaceBetween={50}
          centeredSlides={true}
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
        >
          {advistoryData &&
            advistoryData.map((item, index) => {
              const slideClassName =
                index === activeSlide ? "active-slide" : "inactive-slide";
              return (
                <SwiperSlide key={index} className={`w-full ${slideClassName}`}>
                  <div className="">
                    <img
                      className="w-full md:h-[70vh] object-cover"
                      src={item.image}
                      alt="image"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          <div className="swiper-button-prev6 md:hidden absolute">
            <i
              className="pi pi-angle-left bg-white  cursor-pointer text-green-400 rounded-full p-3"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>
          <div className="swiper-button-next6 md:hidden absolute">
            <i
              className="pi pi-angle-right bg-white text-green-400 rounded-full p-3"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>
        </Swiper>
      </div>
    </Loading>
  );
};

export default earthshot;
