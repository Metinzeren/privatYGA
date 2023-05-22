import {
  getCollaborations,
  getComments,
  getPartnerStudent,
} from "@/API/helper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css";
import React, { useEffect, useRef, useState } from "react";
import Loading from "@/components/Loading";
import { useTranslation } from "next-i18next";
import Head from "next/head";

const collaborations = () => {
  const [collaData, setCollaData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [commentsData, setCommentsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await getCollaborations().then((res) => {
      setCollaData(res.data);
    });
    await getPartnerStudent().then((res) => {
      setStudentData(res.data);
    });
    await getComments().then((res) => {
      setCommentsData(res.data);
    });
    setIsLoading(false);
  };

  const obj =
    collaData &&
    collaData.page.map((item) => JSON.parse(JSON.stringify(item.content)));
  const ref = useRef(null);

  return (
    <Loading loading={isLoading}>
      <Head>
        <title>{collaData && collaData.meta_title}</title>
        <meta name="description" content={collaData && collaData.meta_desc} />
      </Head>
      {collaData && (
        <div className="w-full relative">
          <img
            className="w-full md:h-screen object-cover "
            src={collaData.bg_image}
            alt="bg_image"
          />
          <div className="absolute top-96 md:top-64 md:left-0 left-48 md:pl-4 md:pr-4 md:w-full  w-[600px]">
            <div className="text-white">
              <h1 className="text-2xl md:text-base">{t("ygaprogramlari")}</h1>
              <h1 className="text-6xl md:text-2xl font-bold">
                {collaData.title}
              </h1>
              <p className="mt-2 md:text-base text-2xl">{collaData.desc}</p>
            </div>
          </div>
        </div>
      )}

      <div className="wewalk">
        {obj &&
          obj.map((o, i) => (
            <div key={i} ref={ref} dangerouslySetInnerHTML={{ __html: o }} />
          ))}
      </div>
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
        {commentsData &&
          commentsData.map((item, index) => (
            <SwiperSlide className="w-full" key={index}>
              <div className="flex pl-48 pr-48 md:pl-4 md:pr-4  gap-4">
                <div className="flex px-4 flex-col text-center gap-4">
                  <h1 className="text-xl text-black">{item.comment}</h1>
                  <p className="text-[#FD8204] text-lg">{item.commented_by}</p>
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
      <div className="pl-48 pr-48 md:pl-0 md:pr-0 flex flex-col mt-24 items-center">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-center text-[#FD8204]">
            {t("isbtitle")}
          </h1>
          <p className="text-sm text-center text-[#0B2538]">{t("isbdesc")}</p>
        </div>
      </div>
      <div className="mb-16">
        <div className="pl-48 md:pr-4 md:pl-4 pr-48 w-full flex flex-col items-center mb-16">
          <div className="flex flex-wrap items-center justify-center gap-12 mt-24">
            {studentData &&
              studentData.map((item, index) => {
                return (
                  <div
                    className="flex flex-col gap-1 items-center md:justify-center w-1/5 md:w-1/3"
                    key={index}
                  >
                    <img
                      className="w-56 rounded-full h-56 md:h-auto object-cover"
                      src={item.image}
                    />
                    <h1 className="text-xl font-bold text-[#0B2538]">
                      {item.name_surname}
                    </h1>
                    <p className="text-lg font-light text-gray-500">
                      {item.school}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default collaborations;
