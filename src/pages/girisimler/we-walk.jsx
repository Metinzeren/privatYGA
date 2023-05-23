import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css";
import "primeicons/primeicons.css";
import { getProjectsWewalk } from "@/API/helper";
import Loading from "@/components/Loading";
import { useTranslation } from "next-i18next";
import Head from "next/head";

const wewalk = () => {
  const [weWalkData, setWeWalkData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    setIsLoading(true);
    const fetchWeawalk = async () => {
      await getProjectsWewalk()
        .then((res) => {
          setWeWalkData(res.data.detail);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchWeawalk();
  }, []);
  const obj = JSON.parse(weWalkData && weWalkData.content);
  const ref = useRef(null);
  const socialLinksData = JSON.parse(weWalkData && weWalkData.links);
  return (
    <Loading loading={isLoading}>
      <Head>
        <title>{weWalkData && weWalkData.meta_title}</title>
        <meta name="description" content={weWalkData && weWalkData.meta_desc} />
      </Head>
      {weWalkData && (
        <div className="w-full relative">
          <img
            className="w-full md:h-screen object-cover "
            src={weWalkData.image_background}
            alt=""
          />
          <div className="absolute  md:top-64 md:left-0 top-96 left-48">
            <div className="text-white md:pl-4 md:pr-4 flex flex-col gap-2 w-[600px] md:w-full">
              <img
                className="w-96 md:w-80"
                src={weWalkData.image_logo}
                alt=""
              />
              <h1 className="text-2xl md:text-base">{t("ygagirisimleri")}</h1>
              <h1 className="text-6xl md:text-2xl font-bold">
                {weWalkData.title}
              </h1>
              <p className="mt-2 text-2xl md:text-base">{weWalkData.desc}</p>
              <div className="flex gap-3">
                <a
                  target="_blank"
                  className="px-12 md:px-8 md:py-3 md:flex md:items-center py-4 bg-white text-base text-black rounded-md"
                  href={weWalkData.web_site}
                >
                  {weWalkData.web_site_button_text}
                </a>
                <a
                  className="px-12  md:px-8 md:py-3 md:flex md:items-center py-4 bg-orange-400 text-base text-white rounded-md"
                  href="/"
                >
                  {weWalkData.video_button_text}
                </a>
              </div>
            </div>
          </div>
          <div className="absolute md:bottom-6 md:right-0 md:left-6 bottom-24 right-48">
            <div className="flex flex-col">
              <span className="text-sm text-white">Paylaş</span>
              <div className="flex gap-4 mt-4">
                <React.Fragment>
                  {socialLinksData.facebook && (
                    <a target="_blank" href={socialLinksData.facebook}>
                      <i className="pi pi-facebook text-white text-5xl"></i>
                    </a>
                  )}
                  {socialLinksData.twitter && (
                    <a target="_blank" href={socialLinksData.twitter}>
                      <i className="pi pi-twitter text-white text-5xl"></i>
                    </a>
                  )}
                  {socialLinksData.linkedin && (
                    <a target="_blank" href={socialLinksData.linkedin}>
                      <i className="pi pi-linkedin text-white text-5xl"></i>
                    </a>
                  )}
                </React.Fragment>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="wewalk">
        {obj &&
          obj.page.map((o, i) => (
            <div
              key={i}
              ref={ref}
              dangerouslySetInnerHTML={{ __html: o.content }}
            />
          ))}
      </div>
      <div className="flex items-center justify-center mt-16">
        <h1 className="text-[#FD8204] text-4xl w-1/2 md:w-full text-center font-bold">
          {t("galleryText")}
        </h1>
      </div>
      <div className="pl-48 md:pl-0 md:pr-0  pr-48 mt-16 mb-16 p-24">
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
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
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
        >
          {weWalkData &&
            weWalkData.awards.map((item, index) => (
              <SwiperSlide
                key={index}
                className="w-full relative bg-white shadow-xl"
              >
                <div className="flex flex-col items-center  py-8">
                  <img
                    className="w-48 pb-16 object-contain"
                    src={item.image}
                    alt={`Slide ${index}`}
                  />
                  <h1 className="absolute text-base text-center font-bold text-black bottom-12">
                    {item.title}
                  </h1>
                </div>
              </SwiperSlide>
            ))}
          <div className="swiper-button-prev3 md:hidden absolute">
            <i
              className="pi pi-angle-left bg-transparent cursor-pointer text-[#FD8204] rounded-full p-3"
              style={{ fontSize: "3rem" }}
            ></i>
          </div>
          <div className="swiper-button-next3 md:hidden absolute">
            <i
              className="pi pi-angle-right bg-transparent text-[#FD8204]  rounded-full p-3"
              style={{ fontSize: "3rem" }}
            ></i>
          </div>
        </Swiper>
      </div>
    </Loading>
  );
};

export default wewalk;
