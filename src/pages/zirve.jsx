import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css";
import "primeicons/primeicons.css";
import { useMediaQuery } from "react-responsive";
import Loading from "@/components/Loading";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { Dialog } from "primereact/dialog";

export async function getServerSideProps(context) {
  const localeCookie = context.req.cookies["NEXT_LOCALE"];
  var resSummitPage = await fetch(
    `https://yga.org.tr/cms/api/v1/${localeCookie}/page/summit`
  );
  var data = await resSummitPage.json();

  var resSummitStrategic = await fetch(
    `https://yga.org.tr/cms/api/v1/${localeCookie}/summit-strategic`
  );
  var strategicData = await resSummitStrategic.json();

  var resSlider = await fetch(
    `https://yga.org.tr/cms/api/v1/${localeCookie}/summit-slider`
  );
  var sliderData = await resSlider.json();

  var resSpeaker = await fetch(
    `https://yga.org.tr/cms/api/v1/${localeCookie}/speaker`
  );
  var speakerData = await resSpeaker.json();

  var resVideos = await fetch(
    `https://yga.org.tr/cms/api/v1/${localeCookie}/videos`
  );
  var videosData = await resVideos.json();
  return {
    props: {
      summitPageNew: data,
      strategicNew: strategicData,
      sliderNew: sliderData,
      speakerNew: speakerData,
      videosNew: videosData,
    },
  };
}

const peak = ({
  summitPageNew,
  strategicNew,
  sliderNew,
  speakerNew,
  videosNew,
}) => {
  const [strategicData, setStrategicData] = useState(strategicNew);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [bannerSlider, setBannerSlider] = useState(sliderNew);
  const [summitData, setSummitData] = useState(summitPageNew);
  const [speakerData, setSpeakerData] = useState(speakerNew);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [videos, setVideos] = useState(videosNew);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);
  const { t } = useTranslation();

  const handleImageClick = (item) => {
    setSelectedItem(item);
    setVisible(true);
  };
  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex;
    setActiveSlideIndex(newIndex);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [summitPageNew, strategicNew, sliderNew, speakerNew, videosNew]);
  const openModal = (video) => {
    setSelectedVideo(video);
    setDisplayModal(true);
  };
  const SliderInfoBox = () => {
    const isFind =
      speakerData && speakerData.find((c, i) => i === activeSlideIndex);
    return (
      <div className="bg-[#0a23fa] p-10 w-[350px] h-[160px] rounded-xl">
        <div className="text-white">
          <h1>{isFind && isFind.name_surname}</h1>
          <h1>{isFind && isFind.title}</h1>
          <h1>{isFind && isFind.desc}</h1>
        </div>
      </div>
    );
  };
  const obj =
    summitData &&
    summitData.page.map((item) => JSON.parse(JSON.stringify(item.content)));
  const ref = useRef(null);

  return (
    <Loading loading={isLoading}>
      <Head>
        <title>{summitData && summitData.meta_title}</title>
        <meta name="description" content={summitData && summitData.meta_desc} />
      </Head>
      <div>
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
          {bannerSlider &&
            bannerSlider.map((item, index) => (
              <SwiperSlide className="w-full" key={index}>
                <div className="relative">
                  <img
                    className="w-full h-screen md:h-screen object-cover"
                    src={isMobile ? item.mobile_image : item.bg_image}
                    alt={`Slide ${index}`}
                  />
                  <div className="">
                    <div>
                      {item.title && (
                        <div className="text-8xl md:text-6xl md:top-[35%] md:text-center md:left-[2%] font-extrabold text-white absolute top-[30%] left-[25%]">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.title.replace(
                                /<br\s*\/?>/g,
                                "<br/>"
                              ),
                            }}
                          />
                        </div>
                      )}
                      <a
                        type={item.button_type}
                        className="px-12 py-4 bg-[#3F09B3] text-white absolute md:top-[55%] md:left-[28%] top-[45%] left-[43%] text-2xl rounded-2xl"
                        href={item.link}
                        target="_blank"
                      >
                        {item.button_text}
                      </a>
                    </div>
                  </div>
                  <div className="absolute  bottom-24 right-48">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-white">Sosyal Medya</span>
                      <div className="flex gap-4 text-2xl">
                        <a href="/">
                          <i className="pi pi-pi-discord text-white "></i>
                        </a>
                        <a href="/">
                          <i className="pi pi-facebook text-white "></i>
                        </a>
                        <a href="/">
                          <i className="pi pi-twitter text-white "></i>
                        </a>
                        <a href="/">
                          <i className="pi pi-linkedin text-white "></i>
                        </a>
                        <a href="/">
                          <i className="pi pi-youtube text-white "></i>
                        </a>
                      </div>
                    </div>
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
      <div className="peak">
        {obj &&
          obj.map((o, index) => (
            <div id={"peak" + index} key={index}>
              <div
                key={index}
                ref={ref}
                dangerouslySetInnerHTML={{ __html: o }}
              />
            </div>
          ))}
      </div>

      <div className="mb-16">
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
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
            },
            767: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
        >
          <div className="">
            {videos &&
              videos.map((video, index) => (
                <SwiperSlide
                  onClick={() => openModal(video.video)}
                  key={index}
                  className="relative"
                >
                  <img
                    className="cursor-pointer"
                    src={`/images/${video.video}.jpeg`}
                    alt="Video Thumbnail"
                    style={{ order: index % 2 === 0 ? 0 : 1 }}
                  />
                  <i
                    className="pi pi-caret-right cursor-pointer absolute top-28 left-40"
                    style={{
                      background: "blue",
                      color: "white",
                      borderRadius: "50%",
                      padding: "1rem",
                    }}
                  ></i>
                </SwiperSlide>
              ))}
          </div>
        </Swiper>
      </div>
      <Dialog
        visible={displayModal}
        onHide={() => setDisplayModal(false)}
        modal
        style={{ width: "60vw" }}
      >
        {selectedVideo && (
          <iframe
            allowFullScreen
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${selectedVideo}`}
          ></iframe>
        )}
      </Dialog>
      <div className="pl-48 md:pl-4 md:pr-4 pr-48 mb-16">
        <h1 className="text-[#233FFB] text-4xl font-bold">
          YGA Zirvesi 2022 Konuşmacıları
        </h1>
        <p className="mt-4">
          YGA Zirvesinde her yıl bilim, sanat, iş dünyası, girişimcilik ve
          <br />
          teknoloji alanlarında öncü isimler konuşmacı olarak yer alır.
        </p>
      </div>
      <div className="editSlider relative mb-16">
        <div className="relative left-[400px] md:left-14 md:top-[620px] w-fit z-10 top-[300px]">
          <SliderInfoBox />
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          loop={true}
          scrollbar={{ draggable: true }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: ".swiper-button-prev11",
            nextEl: ".swiper-button-next11",
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
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
        >
          {speakerData &&
            speakerData.map((item, i) => {
              return (
                <SwiperSlide key={i} className="w-full">
                  <div className="">
                    <img
                      className="w-full h-[40rem] object-cover"
                      src={item.image}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          <div className="swiper-button-prev11 md:hidden absolute">
            <i
              className="pi pi-angle-left bg-white  cursor-pointer text-green-400 rounded-full p-3"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>
          <div className="swiper-button-next11 md:hidden absolute">
            <i
              className="pi pi-angle-right bg-white text-green-400 rounded-full p-3"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>
        </Swiper>
      </div>
      <div className="pl-48 pr-48 md:pl-4 md:pr-4 flex flex-col items-center mt-48 mb-16">
        <div className="flex flex-col gap-3 items-center ">
          <h1 className="text-center text-4xl text-[#233FFB]">{t("birlik")}</h1>
          <p className="text-center">{t("birlikText")}</p>
          <h1 className="text-[#233FFB] text-3xl">{t("summitLogoTitle")}</h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center gap-8 border-b-2 border-gray-500">
            {strategicData &&
              strategicData
                .filter((item) => item.type === "gold")
                .map((item, i) => {
                  return (
                    <div key={i}>
                      <img
                        className="w-36 object-contain"
                        src={item.bg_image}
                        alt=""
                      />
                    </div>
                  );
                })}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-24 mt-12">
            {strategicData &&
              strategicData
                .filter((item) => item.type !== "gold")
                .map((item, index) => (
                  <div key={index}>
                    <img
                      className="w-36 object-contain"
                      src={item.bg_image}
                      alt=""
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default peak;
