import { getMeetUs } from "@/API/helper";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css";
import Loading from "@/components/Loading";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { Dialog } from "primereact/dialog";

const bilimlebulus = () => {
  const [meetData, setMeetData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMeet = async () => {
      await getMeetUs()
        .then((res) => {
          setMeetData(res.data.detail);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchMeet();
  }, []);
  const obj = JSON.parse(meetData && meetData.content);
  console.log(meetData);
  const ref = useRef(null);
  return (
    <Loading loading={isLoading}>
      <Head>
        <title>{meetData && meetData.meta_title}</title>
        <meta name="description" content={meetData && meetData.meta_desc} />
      </Head>
      {meetData && (
        <div className="w-full relative">
          <img
            className="w-full md:h-screen object-cover"
            src={meetData.image_background}
            alt=""
          />
          <div className="absolute  md:top-64 md:left-0 top-96 left-48">
            <div className="text-white md:pl-4 md:pr-4 flex flex-col gap-2 w-[600px] md:w-full">
              <h1 className="text-4xl md:text-2xl">{t("ygaprogramlari")}</h1>
              <h1 className="text-6xl font-bold md:text-3xl ">
                {meetData.title}
              </h1>
              <p className="mt-4 mb-8 md:text-base text-2xl">{meetData.desc}</p>
              <div>
                <p
                  className="px-12 md:px-12 py-4 bg-[#FD8204] cursor-pointer md:text-sm w-max text-base text-white rounded-md"
                  onClick={() => setDisplayModal(true)}
                >
                  Tanıtım Videosu
                </p>
              </div>
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
            meetData && meetData.video_button_link
          }`}
        ></iframe>
      </Dialog>
      <div>
        {obj &&
          obj.page.map((o, index) => (
            <div key={index}>
              {o["section-slug"] === "section-4" && (
                <div className="flex md:flex-col md:gap-3">
                  {meetData &&
                    meetData.rooms.map((item, index) => {
                      const itemDescWithLineBreaks =
                        item && item.desc.replace(/<br\s*\/?>/g, "<br/>");
                      return (
                        <div key={index}>
                          <div className="w-full pl-0 pr-0 flex relative">
                            <img src={item.image_background} alt="" />
                            <div className="absolute text-white left-4 bottom-6">
                              <h1 className="text-3xl">{item.title}</h1>
                              <div
                                className="text-base"
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
              <div id={"meet" + index}>
                <div
                  ref={ref}
                  dangerouslySetInnerHTML={{ __html: o.content }}
                />
              </div>
            </div>
          ))}
      </div>

      <div className="bg-[#f9f7f4] p-12 py-24">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
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
              slidesPerView: 2.5,
            },
            1280: {
              slidesPerView: 3.5,
            },
          }}
        >
          {meetData &&
            meetData.calendars.map((item, index) => (
              <SwiperSlide className="w-full" key={index}>
                <div className="pl-12 md:pl-0">
                  <div className="flex justify-center h-40 flex-col gap-2">
                    <h1 className="text-black font-light">{item.date}</h1>
                    <h1 className="text-black text-4xl">
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
                        JSON.parse(item.desc).list.map((descItem, index) => (
                          <li className="flex gap-1 items-center" key={index}>
                            <img
                              className="w-4"
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURUdwTPvLhv/Ph/nIhPrIhPrIhfrIhfrIhf/UjfrIhP/Miv/MmfrIhf////zJhvvJhvrHhNDjP4gAAAAQdFJOUwA6FdyDo9JfDrsfBfACTHKHvk6MAAAAyUlEQVQoz61S7RKDIAxT+ShF0b7/0y5ytOK2w9vd+KFHQ0OSMk1/WAv5EDwtX6CZpS2e36AUznJkjuc/pB7LqDmqpUQOp3LXB8yvuls90KsXnNQTEZhNC/ruEtCrqliccU6FDjA74ebvRgrKXL+Lbq/r5024QKI2eInVznk0OdmqjdhkhMqfaxW696YjdGDaYO4w3Qo22h2pSr2wp1VBMCeuzcQEqZXCl3WzYiEkv2u8FoLFV9byGd8w+PHIhsMeP5PxA3t4mj+vF1uPC6UUFE5TAAAAAElFTkSuQmCC"
                              alt=""
                            />
                            {descItem.li}
                          </li>
                        ))}
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
      <div className="director md:pl-4 md:pr-4 md:pt-16  pl-48 pr-48 mt-16 flex">
        {meetData &&
          meetData.director.map((item, index) => {
            return (
              <div key={index} className="flex md:flex-col items-center w-full">
                <div className="w-1/2 md:w-full flex flex-col">
                  <img
                    className="w-36 object-cover rounded-full"
                    src={item.image}
                    alt={item.item_alt_title}
                  />
                  <h1 className="text-2xl text-white">{item.name_surname}</h1>
                  <span className="text-white">{item.director_title}</span>
                  <a className="text-[#FD8204] text-lg mt-5" href={item.email}>
                    E-posta Gönder
                  </a>
                </div>
                <div className="w-1/2 md:w-full flex gap-2 flex-col">
                  <h1 className="text-5xl font-bold text-white">
                    {item.title}
                  </h1>
                  <h1 className="text-xl text-white">{item.desc}</h1>
                  <h1 className="text-base text-white">
                    *Bayer çalışanlarının çocukları projeye katılarak
                    eğitimlerden yararlanabilir ancak seçilen kişiler arasında
                    yer alamaz.
                  </h1>
                </div>
              </div>
            );
          })}
      </div>
    </Loading>
  );
};

export default bilimlebulus;
