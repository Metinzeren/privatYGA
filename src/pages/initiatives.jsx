import React, { useEffect, useState } from "react";
import "primeicons/primeicons.css";
import { getAllProjects } from "@/API/helper";
import { useTranslation } from "next-i18next";
import Head from "next/head";
const initiatives = () => {
  const [projectsData, setProjectsData] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchProjets = async () => {
      await getAllProjects().then((res) => {
        setProjectsData(res.data.data);
      });
    };
    fetchProjets();
  }, []);
  console.log(projectsData);
  return (
    <div>
      <Head>
        <title>YGA - Girişimleri</title>
        <meta name="description" content="YGA - Girişimleri" />
      </Head>
      <div className="w-full relative">
        <img
          className="w-full md:h-screen object-cover "
          src="https://yga.org.tr/cms/images/pages/hakkimizdabg.png"
          alt=""
        />
        <div className="absolute  md:top-64 md:left-0 top-96 left-48">
          <div className="text-white md:pl-4 md:pr-4 flex flex-col gap-2 w-[600px] md:w-full">
            <h1 className="text-6xl md:text-3xl font-bold">
              YGA Girişimleri {t("tab1")}
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full flex-col relative">
        {projectsData &&
          projectsData
            .filter((item) => item.detail.project_type === "initiatives")
            .map((item, index) => {
              return (
                <div id={"init" + index} key={index} className="relative">
                  <div className="w-full">
                    <img
                      className="w-full md:h-screen object-cover "
                      src={item.detail.bg_image}
                      alt=""
                    />
                  </div>
                  <div className="absolute  md:top-64 md:left-0 top-96 left-48">
                    <div className="text-white md:pl-4 md:pr-4 flex flex-col gap-2 w-[600px] md:w-full">
                      <img className="w-36" src={item.detail.image} alt="" />
                      <h1 className="text-4xl font-bold">YGA Girişimleri</h1>
                      <h1 className="text-6xl font-bold">
                        {item.detail.title}
                      </h1>
                      <p>{item.detail.desc}</p>
                      <div className="flex gap-4">
                        <a
                          href={item.detail.slug}
                          className="px-12 py-4 bg-white text-black rounded-md"
                        >
                          Devamını Oku
                        </a>
                        <a
                          href={item.detail.web_site_link}
                          className="px-12 py-4 bg-transparent border-2 border-white text-white rounded-md"
                        >
                          Web Sitesi
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-24 md:left-4 left-48">
                    <div className="flex flex-col">
                      <span className="text-sm text-white">Sosyal Medya</span>
                      <div className="flex gap-4 mt-4">
                        <a href="/">
                          <i className="pi pi-facebook text-white text-3xl"></i>
                        </a>
                        <a href="/">
                          <i className="pi pi-twitter text-white text-3xl"></i>
                        </a>
                        <a href="/">
                          <i className="pi pi-linkedin text-white text-3xl"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      {/* <div className="w-full relative">
        <img
          className="w-full"
          src="https://yga.org.tr/cms/images/projects/twinbg-196eee4.webp"
          alt=""
        />
        <div className="absolute top-96 right-48">
          <div className="text-white flex flex-col gap-4 w-[600px]">
            <img
              className="w-36"
              src="https://yga.org.tr/cms/images/projects/5_new.png"
              alt=""
            />
            <h1 className="text-4xl font-bold">YGA Girişimleri</h1>
            <h1 className="text-6xl font-bold">Twin</h1>
            <p>
              Twin 2017’de Türkiye’de kurulmuş, uluslararası bir eğitim
              teknolojileri girişimidir. Twin’i kurduğumuzda, çocukların
              doğasında olan merak duygusunu beslemeyi, çocuklara bilimin kolay
              ve eğlenceli olduğunu göstermeyi hayal ettik.
            </p>
            <div className="flex gap-4">
              <a href="" className="px-12 py-4 bg-white text-black rounded-md">
                Devamını Oku
              </a>
              <a
                href=""
                className="px-12 py-4 bg-transparent border-2 border-white text-white rounded-md"
              >
                Web Sitesi
              </a>
            </div>
          </div>
        </div>
        <div className="absolute  bottom-24 right-[670px]">
          <div className="flex flex-col">
            <span className="text-sm text-white">Sosyal Medya</span>
            <div className="flex gap-4 mt-4">
              <a href="/">
                <i className="pi pi-facebook text-white text-3xl"></i>
              </a>
              <a href="/">
                <i className="pi pi-twitter text-white text-3xl"></i>
              </a>
              <a href="/">
                <i className="pi pi-linkedin text-white text-3xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full relative">
        <img
          className="w-full"
          src="https://yga.org.tr/cms/images/projects/piribg-573445e.webp"
          alt=""
        />
        <div className="absolute top-96 left-48">
          <div className="text-white flex flex-col gap-4 w-[600px]">
            <img
              className="w-36"
              src="https://yga.org.tr/cms/images/projects/3_new_3.png"
              alt=""
            />
            <h1 className="text-4xl font-bold">YGA Girişimleri</h1>
            <h1 className="text-6xl font-bold">Piri</h1>
            <p>
              Piri, mobil uygulama üzerinden dijital turlar sunan bir seyahat
              teknolojileri girişimi. İnsanların benzersiz ve inovatif bir
              deneyimle, dünyayı özgürce keşfetmelerine ve keşif ruhunu canlı
              tutmalarına yardım ediyoruz.
            </p>
            <div className="flex gap-4">
              <a href="" className="px-12 py-4 bg-white text-black rounded-md">
                Devamını Oku
              </a>
              <a
                href=""
                className="px-12 py-4 bg-transparent border-2 border-white text-white rounded-md"
              >
                Web Sitesi
              </a>
            </div>
          </div>
        </div>
        <div className="absolute  bottom-24 left-48">
          <div className="flex flex-col">
            <span className="text-sm text-white">Sosyal Medya</span>
            <div className="flex gap-4 mt-4">
              <a href="/">
                <i className="pi pi-facebook text-white text-3xl"></i>
              </a>
              <a href="/">
                <i className="pi pi-twitter text-white text-3xl"></i>
              </a>
              <a href="/">
                <i className="pi pi-linkedin text-white text-3xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full relative">
        <img
          className="w-full"
          src="https://yga.org.tr/cms/images/projects/upschoolbg-2055508.webp"
          alt=""
        />
        <div className="absolute top-96 right-48">
          <div className="text-white flex flex-col gap-4 w-[600px]">
            <img
              className="w-36"
              src="https://yga.org.tr/cms/images/projects/11_new_2.png"
              alt=""
            />
            <h1 className="text-4xl font-bold">YGA Girişimleri</h1>
            <h1 className="text-6xl font-bold">UP School</h1>
            <p>
              Teknolojide rol model kadınlar yetiştirmek için kurulan bir eğitim
              teknolojisi girişimidir. Kadınlara teknik donanım ve özgüven
              kazandırarak kariyerlerine başlama olanağı sağlar.
            </p>
            <div className="flex gap-4">
              <a href="" className="px-12 py-4 bg-white text-black rounded-md">
                Devamını Oku
              </a>
              <a
                href=""
                className="px-12 py-4 bg-transparent border-2 border-white text-white rounded-md"
              >
                Web Sitesi
              </a>
            </div>
          </div>
        </div>
        <div className="absolute  bottom-24 right-[670px]">
          <div className="flex flex-col">
            <span className="text-sm text-white">Sosyal Medya</span>
            <div className="flex gap-4 mt-4">
              <a href="/">
                <i className="pi pi-facebook text-white text-3xl"></i>
              </a>
              <a href="/">
                <i className="pi pi-twitter text-white text-3xl"></i>
              </a>
              <a href="/">
                <i className="pi pi-linkedin text-white text-3xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full relative">
        <img
          className="w-full"
          src="https://yga.org.tr/cms/images/projects/poilabsbg-bbb5a27.webp"
          alt=""
        />
        <div className="absolute top-96 left-48">
          <div className="text-white flex flex-col gap-4 w-[600px]">
            <img
              className="w-36"
              src="https://yga.org.tr/cms/images/projects/4_new.png"
              alt=""
            />
            <h1 className="text-4xl font-bold">YGA Girişimleri</h1>
            <h1 className="text-6xl font-bold">PoiLabs</h1>
            <p>
              Piri, mobil uygulama üzerinden dijital turlar sunan bir seyahat
              teknolojileri girişimi. İnsanların benzersiz ve inovatif bir
              deneyimle, dünyayı özgürce keşfetmelerine ve keşif ruhunu canlı
              tutmalarına yardım ediyoruz.
            </p>
            <div className="flex gap-4">
              <a href="" className="px-12 py-4 bg-white text-black rounded-md">
                Devamını Oku
              </a>
              <a
                href=""
                className="px-12 py-4 bg-transparent border-2 border-white text-white rounded-md"
              >
                Web Sitesi
              </a>
            </div>
          </div>
        </div>
        <div className="absolute  bottom-24 left-48">
          <div className="flex flex-col">
            <span className="text-sm text-white">Sosyal Medya</span>
            <div className="flex gap-4 mt-4">
              <a href="/">
                <i className="pi pi-facebook text-white text-3xl"></i>
              </a>
              <a href="/">
                <i className="pi pi-twitter text-white text-3xl"></i>
              </a>
              <a href="/">
                <i className="pi pi-linkedin text-white text-3xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default initiatives;
