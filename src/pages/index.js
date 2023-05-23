import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import {
  getAllProjects,
  getAwards,
  getBannerImage,
  getHomePage,
  getPrograms,
} from "@/API/helper";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Loading from "@/components/Loading";
import { getCookie } from "@/utils/common";
import { useRouter } from "next/router";
export default function Home() {
  const [bannerImage, setBannerImage] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const [programsData, setProgramsData] = useState(null);
  const [awardsData, setAwardsData] = useState(null);
  const [allProjectsData, setAllProjectsData] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const router = useRouter();
  const { t } = useTranslation();
  useEffect(() => {
    loadData();
  }, [getCookie("NEXT_LOCALE")]);

  const loadData = async () => {
    setIsLoading(true);
    await getAwards().then((res) => {
      setAwardsData(res.data);
    });
    await getPrograms().then((res) => {
      setProgramsData(res.data);
    });
    await getHomePage().then((res) => {
      setHomeData(res.data);
    });
    await getBannerImage().then((res) => {
      setBannerImage(res.data);
    });
    await getAllProjects().then((res) => {
      setAllProjectsData(res.data.data);
    });
    setIsLoading(false);
  };

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex;
    setActiveSlideIndex(newIndex);
  };

  const SliderInfoBox = () => {
    const isFind =
      allProjectsData && allProjectsData.find((c, i) => i === activeSlideIndex);

    return (
      <div className="bg-white p-10 max-w-[350px] rounded-xl md:max-w-[300px]">
        <div className="">
          <div className="flex flex-col gap-5">
            {isFind && isFind.detail.project_type === "initiatives" && (
              <div className="flex flex-col">
                <h1 className="text-black text-3xl md:text-xl font-bold">
                  {t("ygagirisimleri")}
                </h1>
                <p className="text-black text-base md:text-sm">
                  {t("ygagirisimleridesc")}
                </p>
              </div>
            )}
            {isFind && isFind.detail.project_type === "project" && (
              <div className="flex flex-col">
                <h1 className="text-black text-3xl md:text-xl font-bold">
                  {t("ygaprogramlari")}
                </h1>
                <p className="text-black text-base md:text-sm">
                  {t("program")}
                </p>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <h1 className="text-black text-2xl md:text-xl">
                {isFind && isFind.detail.title}
              </h1>
              <p className="text-xl md:text-sm text-gray-500">
                {isFind && isFind.detail.desc}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center mt-12">
            <a
              className="px-9 md:px-6 md:text-sm py-3 md:texxt-sm bg-orange-400 text-base text-white rounded-md"
              href="/"
            >
              Detaylı İncele
            </a>
            <a
              target="_blank"
              className="text-orange-400 decoration md:text-sm underline"
              href={isFind && isFind.detail.web_site_link}
            >
              Web Sitesi
            </a>
          </div>
        </div>
      </div>
    );
  };

  const content = homeData && homeData.page[0].content;
  const jsonContent = JSON.stringify({ content });
  const obj = JSON.parse(jsonContent);
  const ref = useRef(null);
  return (
    <Loading loading={isLoading}>
      <Head>
        <title>{homeData && homeData.meta_title}</title>
        <meta name="description" content={homeData && homeData.meta_desc} />
      </Head>
      <div className="relative">
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
          spaceBetween={0}
          slidesPerView={1}
        >
          {bannerImage?.map((item, index) => (
            <SwiperSlide key={index} className="w-full">
              <div className="relative">
                <img
                  className="w-full h-[calc(100vh - 90px)] md:h-screen object-cover"
                  src={isMobile ? item.mobile_image : item.bg_image}
                  alt={`Slide ${index}`}
                />
                <div className="absolute top-[50%] md:top-[72%] md:right-[23%] right-[44%]">
                  {item.link && (
                    <a
                      target="_blank"
                      className="px-12 md:px-10 py-4 bg-orange-400 text-white rounded-md"
                      href={item.link}
                    >
                      bilimseferberligi.org
                    </a>
                  )}
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
      <div className="home1">
        {obj && (
          <div ref={ref} dangerouslySetInnerHTML={{ __html: obj.content }} />
        )}
      </div>
      <div className="flex md:pl-4 md:pr-4 mt-32 mb-16 justify-center items-center text-center gap-4 flex-col">
        <h1 className="text-3xl text-orange-400 font-bold">
          {t("ygaprogramlari")}
        </h1>
        <p className="w-[30vw] md:w-full text-lg font-light">
          {t("ygaprdesc")}
        </p>
      </div>
      <div className="pl-48 md:pl-4 md:pr-4 pr-48 mt-16 mb-16">
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
          {programsData &&
            programsData.map((item, index) => {
              const itemTitle = item.title.replace(/<br\s*\/?>/g, "<br/>");
              return (
                <SwiperSlide key={index} className="w-full">
                  <div className="flex flex-col group hover:bg-[#F7F8FA] gap-8 p-4 items-center">
                    <img
                      className="w-48 object-contain"
                      src={item.image}
                      alt={`Slide ${index}`}
                    />
                    <div className="flex flex-col w-72 gap-4 items-center">
                      <h1
                        className="text-3xl text-black text-center"
                        dangerouslySetInnerHTML={{
                          __html: itemTitle,
                        }}
                      ></h1>
                      <p className="text-[#677A86] text-center text-lg">
                        {item.desc}
                      </p>
                      <p
                        className="px-12 py-4 bg-orange-400 text-white rounded-md cursor-pointer"
                        onClick={() => router.push(`/${item.slug}`)}
                      >
                        Detaylı İncele
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
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
      <div className="editSlider  relative">
        <div className="absolute left-[400px] md:left-16 md:top-[500px] md:bottom-0  w-fit z-10 top-[300px]">
          <SliderInfoBox />
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          loop={true}
          scrollbar={{ draggable: true }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: ".swiper-button-prev9",
            nextEl: ".swiper-button-next9",
          }}
          onSlideChange={handleSlideChange}
          spaceBetween={0}
          slidesPerView={1}
          centeredSlides={true}
        >
          {allProjectsData &&
            allProjectsData.map((item, index) => {
              return (
                <SwiperSlide key={index} className="w-full">
                  <div className="">
                    <img
                      className="w-full md:h-screen object-contain"
                      src={item.detail.bg_image}
                      alt={index}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          <div className="swiper-button-prev9 md:hidden absolute">
            <i
              className="pi pi-angle-left bg-white  cursor-pointer text-green-400 rounded-full p-3"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>
          <div className="swiper-button-next9 md:hidden absolute">
            <i
              className="pi pi-angle-right bg-white text-green-400 rounded-full p-3"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>
        </Swiper>
      </div>

      <div className="w-full md:flex-col md:pl-4 md:pr-4 flex md:mt-44 items-center pl-48 pr-48">
        <div className="w-1/2 md:w-full md:hidden p-16">
          <img
            className="w-full object-contain"
            src="https://yga.org.tr/img/harvard-yga.jpg"
          />
        </div>
        <div className="w-1/2 md:w-full">
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl font-bold md:text-3xl text-[#0B2538]">
              YGA Hakkındaki Harvard Vaka Çalışmasını Okuyun!{" "}
            </h1>
            <div className="flex flex-col md:text-lg text-xl gap-8 text-[#112B3D] ">
              <p>
                UC Berkeley - Haas School of Business akademisyenleri tarafından
                yazılan ve Harvard Business Review’da yayınlanan vaka
                çalışmasını inceleyebilirsiniz.
              </p>
              <p>Çalışmadan öne çıkan notlar:</p>
              <p>
                · YGA ekonomik ve sosyal kalkınmaya öncülük edebilecek "çift
                kanatlı" liderler geliştirir.
              </p>
              <p>
                · YGA, bu liderlerin gelişmesi için özgüven, güven ortamı ve
                sosyal yenilik amacınıavurgulayarak sürdürülebilir bir ortam
                yaratmaya odaklanır.
              </p>
              <p>
                · YGA'nın benzersiz modeli, teknoloji temelli yeniliklerle
                ekonomik değer yaratırken sosyal kalkınma ve kültürel dönüşüme
                öncülük eder.
              </p>
              <div className="flex flex-col gap-8">
                <img
                  className="w-32"
                  src="https://yga.org.tr/img/HBR_logo_black.svg"
                  alt=""
                />
                <div>
                  <a
                    target="_blank"
                    className="px-12 py-4 bg-orange-400 text-base text-white rounded-md"
                    href="https://store.hbr.org/product/young-guru-academy-culture-and-the-return-on-investment/b5914?sku=B5914-PDF-EN"
                  >
                    Hemen İnceleyin
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-32 mb-16 justify-center items-center text-center gap-4 flex-col">
        <h1 className="text-3xl text-orange-400 font-bold">{t("ygaprizes")}</h1>
        <p className="w-[30vw] md:w-full text-lg font-light">
          {t("prizedesc")}
        </p>
      </div>
      <div className="pl-48 md:pl-4 md:pr-4 pr-48 mt-16 mb-16 p-24">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          loop={true}
          scrollbar={{ draggable: true }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          navigation={{
            prevEl: ".swiper-button-prev2",
            nextEl: ".swiper-button-next2",
          }}
          spaceBetween={50}
          breakpoints={{
            0: {
              slidesPerView: 1.3,
            },
            767: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {awardsData &&
            awardsData
              .filter((e) => e.type === "homepage")
              .map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="w-full relative  bg-white inset-0 shadow-xl"
                >
                  <div className="flex flex-col items-center  p-4 py-16">
                    <img
                      className="w-48 pb-16 object-contain"
                      src={item.image}
                      alt={`Slide ${index}`}
                    />
                    <h1 className="absolute text-base text-center font-bold text-black top-48">
                      {item.title}
                    </h1>
                  </div>
                </SwiperSlide>
              ))}
          <div className="swiper-button-prev2 md:hidden absolute">
            <i
              className="pi pi-angle-left bg-transparent cursor-pointer text-[#FD8204] rounded-full p-3"
              style={{ fontSize: "3rem" }}
            ></i>
          </div>
          <div className="swiper-button-next2 md:hidden absolute">
            <i
              className="pi pi-angle-right bg-transparent text-[#FD8204]  rounded-full p-3"
              style={{ fontSize: "3rem" }}
            ></i>
          </div>
        </Swiper>
      </div>
    </Loading>
  );
}
