import { getMiddleSchool } from "@/API/helper";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css";
import { Dropdown } from "primereact/dropdown";
import { Accordion, AccordionTab } from "primereact/accordion";
import { removeSrc } from "@/utils/helper";
import { rooms } from "@/utils/data";
import Loading from "@/components/Loading";
import { useTranslation } from "next-i18next";
import Head from "next/head";
const globalimpatmiddleschool = () => {
  const [middleData, setMiddleData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const selectionOptions = [
    {
      id: 1,
      button: t("tab1"),
      label: [
        "genel-bakis-section-1",
        "genel-bakis-section-2",
        "genel-bakis-section-3",
        "genel-bakis-section-4",
        "genel-bakis-section-5",
        "genel-bakis-section-6",
      ],
    },
    {
      id: 2,
      button: t("tab2"),
      label: [
        "program-detaylari-section-1",
        "program-detaylari-section-2",
        "program-detaylari-section-3",
        "program-detaylari-section-4",
        "program-detaylari-section-5",
        "program-detaylari-section-6",
        "program-detaylari-section-7",
      ],
    },
    {
      id: 3,
      button: t("tab3"),
      label: ["sikca-sorulan-sorular-section-1"],
    },
    {
      id: 4,
      button: t("tab4"),
      label: ["ucretler-section-1"],
    },
    {
      id: 5,
      button: t("tab5"),
      label: ["videolar-section-1"],
    },
  ];
  const climateImages = [
    "https://yga.org.tr/_nuxt/img/enka.c34cab1.png",
    "https://yga.org.tr/_nuxt/img/ted.4c81e07.png",
    "https://yga.org.tr/_nuxt/img/hisar.f8d65f7.png",
    "https://yga.org.tr/_nuxt/img/koc.07b01b9.png",
    "https://yga.org.tr/_nuxt/img/sev.b0d2ee0.png",
    "https://yga.org.tr/_nuxt/img/eyub.e3c43e2.png",
  ];
  const [selection, setSelection] = useState(1);
  useEffect(() => {
    const fetchMiddle = async () => {
      setIsLoading(true);
      await getMiddleSchool()
        .then((res) => {
          setMiddleData(res.data.detail);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchMiddle();
  }, []);
  const obj = JSON.parse(middleData && middleData.content);
  const ref = useRef(null);
  const filterPageBySectionSlug = (sectionSlug) => {
    var _vFindTab = selectionOptions.find((y) => y.id === sectionSlug);
    if (_vFindTab !== null) {
      return obj?.page?.filter((o) =>
        _vFindTab.label.includes(o["section-slug"])
      );
    }
  };
  const convertIframeToVideoUrl = (iframeUrl) => removeSrc(iframeUrl);
  const socialLinksData = JSON.parse(middleData && middleData.links);

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
  const VideoPage = () => {
    return (
      <div className="flex-wrap flex pl-48 md:pl-4 md:pr-4 pr-48">
        {middleData &&
          middleData.videos.map((item, index) => {
            const _videoUrl = convertIframeToVideoUrl(item.url);
            if (index % 2 === 0) {
              return (
                <div
                  className="flex md:flex-col justify-center gap-4 mt-24"
                  key={index}
                >
                  <div className=" flex flex-col gap-5">
                    <div className="min-h-36 max-w-24">
                      <h1 className="text-center  text-black text-3xl">
                        {item.title}
                      </h1>
                    </div>
                    <iframe
                      allowFullScreen
                      width="600px"
                      height="450px"
                      src={_videoUrl}
                    ></iframe>
                  </div>
                  {middleData.videos[index + 1] && (
                    <div className="flex flex-col gap-5">
                      <div className="min-h-36 max-w-24">
                        <h1 className="text-center  text-black text-3xl">
                          {item.title}
                        </h1>
                      </div>
                      <iframe
                        allowFullScreen
                        width="600px"
                        height="450px"
                        src={convertIframeToVideoUrl(
                          middleData.videos[index + 1].url
                        )}
                      ></iframe>
                    </div>
                  )}
                </div>
              );
            } else {
              return null;
            }
          })}
      </div>
    );
  };
  const itemDescWithLineBreaks =
    middleData && middleData.title.replace(/<br\s*\/?>/g, "<br/>");
  return (
    <Loading loading={isLoading}>
      <Head>
        <title>{middleData && middleData.meta_title}</title>
        <meta name="description" content={middleData && middleData.meta_desc} />
      </Head>
      {middleData && (
        <div className="w-full relative">
          <img
            className="w-full  md:h-screen object-cover"
            src={middleData.image_background}
            alt=""
          />
          <div className="absolute  md:top-64 md:left-0 top-96 left-48">
            <div className="text-white md:pl-4 md:pr-4 flex flex-col gap-2 w-[600px] md:w-full">
              <img alt="" className="w-36" src={middleData.logo} />
              <h1 className="text-4xl md:text-2xl">{t("ygaprogramlari")}</h1>
              <div
                className="text-6xl md:text-3xl font-bold"
                dangerouslySetInnerHTML={{
                  __html: itemDescWithLineBreaks,
                }}
              />
              <p className="mt-8 md:text-base text-2xl">{middleData.desc}</p>
            </div>
            <div className="mt-24 md:hidden bg-white p-7 flex items-center rounded-2xl gap-6">
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
          <div className="absolute md:bottom-6 md:right-0 md:left-6 bottom-20 right-48">
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
        <div className="fixed  z-50 top-16 w-full">
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
      {filterPageBySectionSlug(selection)?.map((o, i) => {
        const findOption = selectionOptions.find((y) => y.id === selection);
        return (
          <div key={i}>
            {o["section-slug"] == "genel-bakis-section-3" && (
              <div className="flex md:flex-col md:gap-4">
                {middleData &&
                  middleData.rooms.map((item, index) => {
                    const itemDescWithLineBreaks =
                      item && item.desc.replace(/<br\s*\/?>/g, "<br/>");
                    return (
                      <div key={index}>
                        <div className="w-full pl-0 pr-0 flex relative">
                          <img src={item.image_background} alt="" />
                          <div className="absolute text-white left-4 bottom-6">
                            <h1 className="text-4xl font-bold">{item.title}</h1>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: itemDescWithLineBreaks,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
            {o["section-slug"] == "genel-bakis-section-4" && (
              <div>
                <div className="bg-[#f9f7f4] p-12 md:py-4 py-24">
                  <Swiper
                    modules={[
                      Navigation,
                      Pagination,
                      Scrollbar,
                      A11y,
                      Autoplay,
                    ]}
                    scrollbar={{ draggable: true }}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2000 }}
                    navigation={{
                      prevEl: ".swiper-button-prev4",
                      nextEl: ".swiper-button-next4",
                    }}
                    spaceBetween={0}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },
                      767: {
                        slidesPerView: 1,
                      },
                      1024: {
                        slidesPerView: 3.5,
                      },
                      1280: {
                        slidesPerView: 3.5,
                      },
                    }}
                  >
                    {middleData &&
                      middleData.calendars.map((item, index) => (
                        <SwiperSlide className="w-full" key={index}>
                          <div key={index} className="pl-12 md:pl-4">
                            <div className="flex justify-center h-40 flex-col gap-2">
                              <h1 className="text-black font-light">
                                {item.date}
                              </h1>
                              <h1 className="text-black text-4xl md:text-2xl">
                                {item.title.replace(/<br\s*\/?>/gi, "")}
                              </h1>
                              <span className="font-light text-[#FD8204]">
                                {item.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              {index === 0 && (
                                <span className="text-[#FD8204]">Adım</span>
                              )}
                              <div className="rounded-full h-12 w-12 justify-center items-center text-center p-2 bg-[#FD8204]">
                                <p className=" text-white  ">{item.id}</p>
                              </div>

                              <div className="w-full h-[1px] bg-[#FD8204]"></div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    <div className="swiper-button-prev4 md:hidden absolute">
                      <i
                        className="pi pi-angle-left bg-transparent cursor-pointer text-[#FD8204] rounded-full p-3"
                        style={{ fontSize: "3rem" }}
                      ></i>
                    </div>
                    <div className="swiper-button-next4 md:hidden absolute">
                      <i
                        className="pi pi-angle-right bg-transparent text-[#FD8204]  rounded-full p-3"
                        style={{ fontSize: "3rem" }}
                      ></i>
                    </div>
                  </Swiper>
                </div>
              </div>
            )}
            {o["section-slug"] == "program-detaylari-section-2" && (
              <div className="pl-48 md:pl-4 md:pr-4 pr-48 mt-24 mb-24">
                <div className="flex w-full mt-12 mb-12">
                  <div className="bg-[#5e2aca] relative w-1/3 h-4">
                    <span className="text-xl md:hidden text-[#5e2aca] font-bold absolute top-[-30px]">
                      Middle School
                    </span>
                  </div>
                  <div className="bg-[#ffc211] w-1/3 relative h-4">
                    <span className="text-xl md:hidden text-[#ffc211] font-bold absolute top-[-30px]">
                      High School
                    </span>
                  </div>
                  <div className="bg-[#fd8204] w-1/3 relative h-4">
                    <span className="text-xl md:hidden text-[#fd8204] font-bold absolute top-[-30px]">
                      Collage
                    </span>
                  </div>
                </div>
              </div>
            )}
            {o["section-slug"] == "program-detaylari-section-3" && (
              <div className="flex md:flex-col md:gap-3">
                {rooms &&
                  rooms.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="w-full pl-0 pr-0 flex relative">
                          <img src={item.image} alt="" />
                          <div className="absolute text-white left-4 bottom-6">
                            <h1 className="">{item.title}</h1>
                            {index === 0 && (
                              <p className="text-2xl">
                                {t("box1").split("<br>").join("")}
                              </p>
                            )}
                            {index === 1 && (
                              <p className="text-2xl">
                                {t("box2").split("<br>").join("")}
                              </p>
                            )}
                            {index === 2 && (
                              <p className="text-2xl">
                                {t("box3").split("<br>").join("")}
                              </p>
                            )}
                            {index === 3 && (
                              <p className="text-2xl">
                                {t("box4").split("<br>").join("")}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
            {o["section-slug"] == "program-detaylari-section-4" && (
              <div>
                <div className="bg-[#f9f7f4] md:py-4  p-12 py-24">
                  <Swiper
                    modules={[
                      Navigation,
                      Pagination,
                      Scrollbar,
                      A11y,
                      Autoplay,
                    ]}
                    scrollbar={{ draggable: true }}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2000 }}
                    navigation={{
                      prevEl: ".swiper-button-prev4",
                      nextEl: ".swiper-button-next4",
                    }}
                    spaceBetween={0}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },
                      767: {
                        slidesPerView: 1,
                      },
                      1024: {
                        slidesPerView: 3.5,
                      },
                      1280: {
                        slidesPerView: 3.5,
                      },
                    }}
                  >
                    {middleData &&
                      middleData.calendars.map((item, index) => (
                        <SwiperSlide className="w-full" key={index}>
                          <div className="pl-12">
                            <div className="flex justify-center h-40 flex-col gap-2">
                              <h1 className="text-black font-light">
                                {item.date}
                              </h1>
                              <h1 className="text-black text-4xl md:text-2xl">
                                {item.title.replace(/<br\s*\/?>/gi, "")}
                              </h1>
                              <span className="font-light text-[#FD8204]">
                                {item.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              {index === 0 && (
                                <span className="text-[#FD8204]">Adım</span>
                              )}
                              <div className="rounded-full h-12 w-12 justify-center items-center text-center p-2 bg-[#FD8204]">
                                <p className=" text-white  ">{item.id}</p>
                              </div>

                              <div className="w-full h-[1px] bg-[#FD8204]"></div>
                            </div>
                            <div>
                              <ul>
                                {item.desc &&
                                  JSON.parse(item.desc).list.map(
                                    (descItem, index) => (
                                      <li
                                        className="flex gap-1 items-center"
                                        key={index}
                                      >
                                        <img
                                          className="w-4"
                                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURUdwTPvLhv/Ph/nIhPrIhPrIhfrIhfrIhf/UjfrIhP/Miv/MmfrIhf////zJhvvJhvrHhNDjP4gAAAAQdFJOUwA6FdyDo9JfDrsfBfACTHKHvk6MAAAAyUlEQVQoz61S7RKDIAxT+ShF0b7/0y5ytOK2w9vd+KFHQ0OSMk1/WAv5EDwtX6CZpS2e36AUznJkjuc/pB7LqDmqpUQOp3LXB8yvuls90KsXnNQTEZhNC/ruEtCrqliccU6FDjA74ebvRgrKXL+Lbq/r5024QKI2eInVznk0OdmqjdhkhMqfaxW696YjdGDaYO4w3Qo22h2pSr2wp1VBMCeuzcQEqZXCl3WzYiEkv2u8FoLFV9byGd8w+PHIhsMeP5PxA3t4mj+vF1uPC6UUFE5TAAAAAElFTkSuQmCC"
                                          alt=""
                                        />
                                        {descItem.li}
                                      </li>
                                    )
                                  )}
                              </ul>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    <div className="swiper-button-prev4 md:hidden absolute">
                      <i
                        className="pi pi-angle-left bg-transparent cursor-pointer text-[#FD8204] rounded-full p-3"
                        style={{ fontSize: "3rem" }}
                      ></i>
                    </div>
                    <div className="swiper-button-next4 md:hidden absolute">
                      <i
                        className="pi pi-angle-right bg-transparent text-[#FD8204]  rounded-full p-3"
                        style={{ fontSize: "3rem" }}
                      ></i>
                    </div>
                  </Swiper>
                </div>
              </div>
            )}
            {o["section-slug"] == "program-detaylari-section-5" && (
              <div className="pl-48 pr-48 md:pl-4 md:pr-4 md:flex-col md:gap-4 flex">
                {middleData &&
                  middleData.rooms.map((item, index) => {
                    const roomObj = JSON.parse(item && item.content);
                    return (
                      <div className="flex w-full" key={index}>
                        <div className="">
                          <div>
                            <img src={item.image_background} alt="image" />
                          </div>

                          {roomObj &&
                            roomObj.map((room, i) => {
                              return (
                                <div
                                  className="flex flex-col mt-12 gap-4"
                                  key={i}
                                >
                                  <div className="flex flex-col gap-2 pl-3">
                                    <h1 className="text-2xl flex items-center gap-2 text-[#FD8204]">
                                      <span>
                                        <img
                                          className="w-4"
                                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURUdwTPvLhv/Ph/nIhPrIhPrIhfrIhfrIhf/UjfrIhP/Miv/MmfrIhf////zJhvvJhvrHhNDjP4gAAAAQdFJOUwA6FdyDo9JfDrsfBfACTHKHvk6MAAAAyUlEQVQoz61S7RKDIAxT+ShF0b7/0y5ytOK2w9vd+KFHQ0OSMk1/WAv5EDwtX6CZpS2e36AUznJkjuc/pB7LqDmqpUQOp3LXB8yvuls90KsXnNQTEZhNC/ruEtCrqliccU6FDjA74ebvRgrKXL+Lbq/r5024QKI2eInVznk0OdmqjdhkhMqfaxW696YjdGDaYO4w3Qo22h2pSr2wp1VBMCeuzcQEqZXCl3WzYiEkv2u8FoLFV9byGd8w+PHIhsMeP5PxA3t4mj+vF1uPC6UUFE5TAAAAAElFTkSuQmCC"
                                          alt="image"
                                        />
                                      </span>{" "}
                                      {room.title}
                                    </h1>
                                    <p className="text-sm font-light w-[60%] px-4 text-[#212529]">
                                      {room.desc}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
            {o["section-slug"] == "program-detaylari-section-7" && (
              <div className="mt-48 mb-48">
                <div className="flex md:pl-4 md:pr-4 md:flex-col md:gap-8 pl-60 pr-60 mt-16 mb-16  items-center">
                  <div className="flex flex-col w-1/2 md:w-full text-[#0a2639] gap-3">
                    <h2 className="font-light text-xl">
                      Bu yetkinlikler nasıl gelişiyor?
                    </h2>
                    <h1 className="text-6xl font-bold">
                      Birlikte
                      <br /> Başarma İklimi
                    </h1>
                    <p className="text-gray-400 font-light text-base">
                      Türkiye’nin en iyi okullarından seçilen meraklı ve <br />
                      istekli öğrencilerle birlikte çalışıyorlar.{" "}
                    </p>
                  </div>
                  <div className="flex flex-wrap md:w-full w-1/2">
                    {climateImages &&
                      climateImages.map((item, index) => {
                        return (
                          <div
                            className="w-1/3 md:w-1/2 border flex justify-center items-center border-gray-200 p-0"
                            key={index}
                          >
                            <img
                              className="p-4  w-36  h-auto object-cover"
                              src={item}
                              alt="image"
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="bg-[#f9f7f4] p-12">
                  <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="text-[#FD8204] text-4xl">
                      {t("mezunTitle")}
                    </h1>
                    <p className="text-base">{t("mezunDesc")}</p>
                  </div>
                  <div className="pl-48 md:pl-4 md:pr-4 pr-48 mt-16">
                    <div className="flex md:flex-col gap-6">
                      {middleData &&
                        middleData.graduates.map((item, index) => {
                          return (
                            <div className="flex flex-col" key={index}>
                              <img src={item.image} alt="" />
                              <h1 className="text-2xl mt-4 font-medium text-black">
                                {item.name_surname}
                              </h1>
                              <p className="font-medium text-base text-[#677b86]">
                                {item.desc}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {o["section-slug"] == "ucretler-section-1" && (
              <div className="pl-64 md:pl-4 md:pr-4 pr-64 mt-16">
                <h1 className="font-bold">
                  Global Impact Middle School Programı ile ilgilenen
                  velilerimizin program ücretleri ve detayları hakkında Program
                  Koordinatörü Tuğba Üzer Şeremetli’ye
                  <a
                    href="mailto:tugba.uzer@yga.org.tr"
                    className="underline cursor-pointer mx-1"
                  >
                    tugba.uzer@yga.org.tr
                  </a>
                  mail atmalarını rica ederiz.
                </h1>
              </div>
            )}
            <div className="middle">
              <div id={findOption.label[i]}>
                <div
                  className=""
                  ref={ref}
                  dangerouslySetInnerHTML={{ __html: o.content }}
                />
              </div>
            </div>
          </div>
        );
      })}

      {selection === 1 && (
        <div className="pl-48 md:pl-0 md:pr-0 pr-48 w-ful mt-36">
          <div className="sliderBg mb-16">
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
              {middleData &&
                middleData.leader_coaches.map((item, index) => (
                  <SwiperSlide className="w-full" key={index}>
                    <div className="relative flex md:flex-col-reverse">
                      <div className="w-1/2 md:w-full md:flex-col-reverse md:p-4 flex p-20 flex-col">
                        <h1 className="mb-16 text-4xl font-bold">
                          {item.title}
                        </h1>
                        <p className="text-xl font-light text-[#0B2538]">
                          {item.desc}
                        </p>
                        <div className="flex mt-16 flex-col gap-1">
                          <h1 className="text-3xl font-bold">
                            {item.name_surname}
                          </h1>
                          <p className="text-lg font-light text-[#0b2538]">
                            {item.sub_title}
                          </p>
                        </div>
                      </div>
                      <div className="w-1/2 md:w-full md:flex md:justify-center md:p-4 p-24">
                        <img
                          className="w-full md:w-44 object-cover"
                          src={item.image}
                          alt={`Slide ${index}`}
                        />
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
        </div>
      )}

      {selection === 3 && <FaqPage faq={middleData.faq} />}
      {selection === 5 && <VideoPage />}
      <div className="director pl-48 md:pl-4 md:pr-4 pr-48 mt-16 md:mt-0  flex">
        {middleData &&
          middleData.director.map((item, index) => {
            return (
              <div
                key={index}
                className="flex md:flex-col-reverse md:gap-8 items-center w-full"
              >
                <div className="w-1/2 md:w-full flex flex-col">
                  <img
                    className="w-36 md:w-32 object-cover rounded-full"
                    src={item.image}
                    alt={item.item_alt_title}
                  />
                  <h1 className="text-2xl md:text-xl text-white">
                    {item.name_surname}
                  </h1>
                  <span className="text-white">{item.director_title}</span>
                  <a
                    className="text-[#FD8204] text-lg md:text-base mt-5"
                    href={item.email}
                  >
                    {t("epostaGonder")}
                  </a>
                </div>
                <div className="w-1/2 md:w-full flex gap-2 flex-col">
                  <h1 className="text-5xl font-bold md:text-3xl text-white">
                    {item.title}
                  </h1>
                  <h1 className="text-xl text-white md:text-base">
                    {item.desc}
                  </h1>
                </div>
              </div>
            );
          })}
      </div>
    </Loading>
  );
};

export default globalimpatmiddleschool;
