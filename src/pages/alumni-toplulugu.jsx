import { getAlmuni } from "@/API/helper";
import React, { useEffect, useRef, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import "primeicons/primeicons.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css";
import { removeBlank } from "@/utils/helper";
import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "next-i18next";
import Loading from "@/components/Loading";
import Head from "next/head";

export async function getServerSideProps(context) {
  const localeCookie = context.req.cookies["NEXT_LOCALE"];
  var resAlumni = await fetch(
    `
    https://yga.org.tr/cms/api/v1/${localeCookie}/program/alumni-toplulugu`
  );
  var data = await resAlumni.json();
  return {
    props: {
      alumni: data,
    },
  };
}

const alumni = ({ alumni }) => {
  const [almuniData, setAlmuniData] = useState(alumni.detail);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const selectionOptions = [
    {
      id: 1,
      button: t("tab1"),
    },
    {
      id: 2,
      button: t("tab3"),
    },
  ];
  const staticGraduates = [
    {
      image: "https://yga.org.tr/_nuxt/img/lgp.6e9c094.jpg",
      title: "YGA Mezunları",
      desc: "birbirlerinden öğrenir,",
    },
    {
      image: "https://yga.org.tr/_nuxt/img/zirve-1.3d95f91.jpg",
      title: "",
      desc: "deneyimlerini paylaşır,",
    },
    {
      image: "https://yga.org.tr/_nuxt/img/gc.54d9a5b.jpg",
      title: "",
      desc: "birlikte eğlenir,",
    },
    {
      image: "https://yga.org.tr/_nuxt/img/19.0b0a028.JPG",
      title: "",
      desc: "dünyadan ilham alır.",
    },
  ];
  const [selection, setSelection] = useState(1);

  useEffect(() => {
    setIsLoading(false);
  }, [alumni]);

  const obj = JSON.parse(almuniData && almuniData.content);
  const ref = useRef(null);
  const itemDescWithLineBreaks = almuniData && removeBlank(almuniData.title);
  const socialLinksData = JSON.parse(almuniData && almuniData.links);

  const FaqPage = ({ faq }) => {
    return (
      <div className="pl-48 md:pl-4 md:pr-4 pr-48 md:mb-16 mt-16">
        <div className="flex flex-col gap-5">
          <h1 className="text-black font-bold text-5xl md:texh-4xl">
            {t("faqTitle").split("<br>").join("")}
          </h1>
          <div>
            <a
              className="px-12 py-4 bg-orange-400 text-base text-white rounded-md"
              href="/"
            >
              {t("howtob")}
            </a>
          </div>
        </div>
        <div className="w-full md:flex-col flex">
          <div className="w-1/3 md:hidden"></div>
          <div className="w-2/3 md:w-full mt-8">
            {faq &&
              faq.map((item, index) => {
                const itemDescWithLineBreaks = item.answer.replace(
                  /<br\s*\/?>/g,
                  "<br/>"
                );
                return (
                  <div key={index}>
                    <Accordion activeIndex={1}>
                      <AccordionTab
                        style={{ fontSize: "25px", color: "black" }}
                        header={item.question}
                      >
                        <div
                          className="font-light text-base"
                          dangerouslySetInnerHTML={{
                            __html: itemDescWithLineBreaks,
                          }}
                        />
                      </AccordionTab>
                    </Accordion>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  };
  return (
    <Loading loading={isLoading}>
      <Head>
        <title>{almuniData && almuniData.meta_title}</title>
        <meta name="description" content={almuniData && almuniData.meta_desc} />
      </Head>
      {almuniData && (
        <div className="w-full relative">
          <img
            className="w-full md:h-screen object-cover"
            src={almuniData.image_background}
            alt=""
          />
          <div className="absolute  md:top-64 md:left-0 top-96 left-48">
            <div className="text-white md:pl-4 md:pr-4 flex flex-col gap-2 w-[600px] md:w-full">
              <h1 className="text-4xl md:text-2xl">{t("ygaprogramlari")}</h1>
              <div
                className="text-6xl md:text-3xl font-bold"
                dangerouslySetInnerHTML={{
                  __html: itemDescWithLineBreaks,
                }}
              />
              <p className="mt-8 md:text-base text-2xl">{almuniData.desc}</p>
            </div>
            <div className="mt-40 md:hidden bg-white p-7 flex items-center rounded-2xl gap-6">
              {selectionOptions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelection(item.id)}
                  className={
                    selection === item.id
                      ? "text-white bg-[#FD8204] px-10 py-3 rounded-xl"
                      : ""
                  }
                >
                  {item.button}
                </button>
              ))}
            </div>
          </div>
          <div className="absolute  bottom-20 right-48">
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
      {/* mobil tab */}
      <div className="hidden md:block">
        <div className="fixed  z-[99999999999] top-16 w-full">
          <div>
            <Dropdown
              value={selectionOptions.find((option) => option.id === selection)}
              onChange={(e) => setSelection(e.value.id)}
              options={selectionOptions}
              optionLabel="button"
              placeholder="Select an option"
              className="w-full md:w-14rem"
            />
          </div>
        </div>
      </div>
      {/* mobil tab */}
      {selection === 1 && (
        <div>
          <div className="">
            {obj &&
              obj.page.map((o, i) => (
                <div key={i}>
                  {o["section-slug"] == "genel-bakis-section-2" && (
                    <div>
                      <div className="flex md:flex-col w-full items-center justify-center">
                        {staticGraduates &&
                          staticGraduates.map((item, index) => {
                            return (
                              <div
                                className=" w-1/4 md:w-full relative"
                                key={index}
                              >
                                <img
                                  className="w-full h-96 object-cover group"
                                  src={item.image}
                                  alt="image"
                                />
                                <div className="absolute bottom-2 right-2">
                                  <p className="text-white hidden group-hover:block">
                                    {item.desc}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      <div className="pl-48 md:pl-4 md:pr-4 pr-48  mt-36 mb-36">
                        <h1 className="text-4xl text-[#FD8204] font-medium mb-12 text-center">
                          {t("aluwork")}
                        </h1>
                        <Swiper
                          modules={[
                            Navigation,
                            Pagination,
                            Scrollbar,
                            A11y,
                            Autoplay,
                          ]}
                          loop={true}
                          scrollbar={{ draggable: true }}
                          pagination={{ clickable: true }}
                          autoplay={{ delay: 2000 }}
                          navigation={{
                            prevEl: ".swiper-button-prev",
                            nextEl: ".swiper-button-next",
                          }}
                          spaceBetween={0}
                          breakpoints={{
                            0: {
                              slidesPerView: 2,
                            },
                            767: {
                              slidesPerView: 1,
                            },
                            1024: {
                              slidesPerView: 2,
                            },
                            1280: {
                              slidesPerView: 4,
                            },
                          }}
                        >
                          {almuniData &&
                            almuniData.logos
                              .filter((i) => i.type === "work")
                              .map((item, index) => (
                                <SwiperSlide key={index}>
                                  <div className="flex items-center justify-center">
                                    <img
                                      className="w-38"
                                      src={item.image}
                                      alt={item.image_alt_title}
                                    />
                                  </div>
                                </SwiperSlide>
                              ))}

                          <div className="swiper-button-prev5 md:hidden absolute">
                            <i
                              className="pi pi-angle-left bg-transparent cursor-pointer text-[#FD8204] rounded-full p-3"
                              style={{ fontSize: "3rem" }}
                            ></i>
                          </div>
                          <div className="swiper-button-next5 md:hidden absolute">
                            <i
                              className="pi pi-angle-right bg-transparent text-[#FD8204]  rounded-full p-3"
                              style={{ fontSize: "3rem" }}
                            ></i>
                          </div>
                        </Swiper>
                      </div>
                      <div className="pl-48 md:pl-4 md:pr-4 pr-48 mt-36 ">
                        <h1 className="text-4xl md:text-center text-[#FD8204] font-bold">
                          {t("ygaligirisimciler")}
                        </h1>
                      </div>
                      <div className="mb-16">
                        <div className="pl-48 md:pl-4 md:pr-4 pr-48 w-full flex flex-col items-center mb-16">
                          <div className="flex flex-wrap items-center justify-center gap-12 mt-24">
                            {almuniData &&
                              almuniData.graduates.map((item, index) => {
                                return (
                                  <div
                                    className="flex flex-col gap-1 items-center md:w-full w-1/5"
                                    key={index}
                                  >
                                    <img
                                      className="w-56 rounded-full h-56 object-cover"
                                      src={item.image}
                                    />
                                    <h1 className="text-2xl font-bold text-[#0B2538]">
                                      {item.name_surname}
                                    </h1>
                                    <p className="text-lg font-light text-gray-500">
                                      {item.school}
                                    </p>
                                    <div className="flex gap-5 items-center">
                                      <a
                                        target="_blank"
                                        className="flex items-center gap-2"
                                        href={item.link}
                                      >
                                        <i
                                          className="pi pi-linkedin text-[#FD8204]"
                                          style={{ fontSize: "25px" }}
                                        ></i>
                                        <span className="text-[#FD8204]">
                                          Linkedin
                                        </span>
                                      </a>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                      <div className="mt-36 mb-36">
                        <Swiper
                          modules={[
                            Navigation,
                            Pagination,
                            Scrollbar,
                            A11y,
                            Autoplay,
                          ]}
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
                          {almuniData &&
                            almuniData.comments.map((item, index) => (
                              <SwiperSlide className="w-full" key={index}>
                                <div className="flex pl-48 md:pl-4 md:pr-4 pr-48  gap-4">
                                  <div className="flex px-4 flex-col text-center gap-4">
                                    <h1 className="text-xl text-black">
                                      {item.comment}
                                    </h1>
                                    <p className="text-[#FD8204] text-lg">
                                      {item.commented_by}
                                    </p>
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
                    </div>
                  )}

                  <div id={"almuni" + i}>
                    <div
                      ref={ref}
                      dangerouslySetInnerHTML={{ __html: o.content }}
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-48 mb-32 md:pl-4 md:pr-4 pl-48 flex flex-col gap-12 justify-center pr-48">
            <h1 className="text-4xl text-[#FD8204] font-medium text-center">
              {t("ygakur")}
            </h1>
            <div className="flex items-center flex-wrap w-full">
              {almuniData &&
                almuniData.logos
                  .filter((i) => i.type === "initiative")
                  .map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-center md:w-1/2 w-[25%]"
                      >
                        <img
                          className="mb-8"
                          src={item.image}
                          alt={item.image_alt_title}
                        />
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      )}

      {selection === 2 && <FaqPage faq={almuniData.faq} />}
    </Loading>
  );
};

export default alumni;
