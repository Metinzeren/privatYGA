import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css";
import "primeicons/primeicons.css";
import { getProjectsTwin } from "@/API/helper";
import { useTranslation } from "next-i18next";
import Loading from "@/components/Loading";
import Head from "next/head";

export async function getServerSideProps(context) {
  const localeCookie = context.req.cookies["NEXT_LOCALE"];
  var resTwin = await fetch(
    `https://yga.org.tr/cms/api/v1/${localeCookie}/project/twin`
  );
  var data = await resTwin.json();
  return {
    props: {
      twin: data,
    },
  };
}

const twin = ({ twin }) => {
  const [twinData, setTwinData] = useState(twin.detail);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [twin]);

  const obj = JSON.parse(twinData && twinData.content);
  const ref = useRef(null);
  const socialLinksData = JSON.parse(twinData && twinData.links);

  return (
    <Loading loading={isLoading}>
      <Head>
        <title>{twinData && twinData.meta_title}</title>
        <meta name="description" content={twinData && twinData.meta_desc} />
      </Head>
      {twinData && (
        <div className="w-full relative">
          <img
            className="w-full md:h-screen object-cover "
            src={twinData.image_background}
            alt=""
          />
          <div className="absolute  md:top-64 md:left-0 top-96 left-48">
            <div className="text-white md:pl-4 md:pr-4 flex flex-col gap-2 w-[600px] md:w-full">
              <img className="w-48" src={twinData.image_logo} alt="" />
              <h1 className="text-2xl md:text-base">{t("ygagirisimleri")}</h1>
              <h1 className="text-6xl md:text-2xl font-bold">
                {twinData.title}
              </h1>
              <p className="mt-2 text-2xl md:text-base">{twinData.desc}</p>
              <div className="flex gap-3">
                <a
                  target="_blank"
                  className="px-12 md:px-8 md:py-3 md:flex md:items-center py-4 bg-white text-base text-black rounded-md"
                  href={twinData.web_site}
                >
                  {twinData.web_site_button_text}
                </a>
                <a
                  className="px-12  md:px-8 md:py-3 md:flex md:items-center py-4 bg-orange-400 text-base text-white rounded-md"
                  href="/"
                >
                  {twinData.video_button_text}
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
          obj.page.map((o) => (
            <div ref={ref} dangerouslySetInnerHTML={{ __html: o.content }} />
          ))}
      </div>
      <div className="flex items-center justify-center mt-16">
        <h1 className="text-[#FD8204] text-4xl md:w-full w-1/2 text-center font-bold">
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
          {twinData &&
            twinData.awards.map((item, index) => (
              <SwiperSlide className="w-full relative  bg-white shadow-xl">
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

export default twin;
