import React, { useEffect, useRef, useState } from "react";
import "primeicons/primeicons.css";
import { getAbout, getActivityReports } from "@/API/helper";
import Loading from "@/components/Loading";
import { useTranslation } from "next-i18next";
import Head from "next/head";

const about = () => {
  const [aboutData, setAboutData] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await getAbout().then((res) => {
      setAboutData(res.data);
    });
    await getActivityReports().then((res) => {
      setActivityData(res.data);
    });
    setIsLoading(false);
  };
  const obj =
    aboutData &&
    aboutData.page.map((item) => JSON.parse(JSON.stringify(item.content)));
  const ref = useRef(null);
  console.log(aboutData);
  return (
    <Loading loading={isLoading}>
      <Head>
        <title>{aboutData && aboutData.meta_title}</title>
        <meta name="description" content={aboutData && aboutData.meta_desc} />
      </Head>
      {aboutData && (
        <div className="w-full relative">
          <img
            className="w-full md:h-screen object-cover "
            src={aboutData.bg_image}
            alt=""
          />
          <div className="absolute  md:top-64 md:left-0 top-96 left-48">
            <div className="text-white md:pl-4 md:pr-4 flex flex-col gap-2 w-[600px] md:w-full">
              <h1 className="text-6xl font-bold md:text-3xl">
                {aboutData.title}
              </h1>
              <p className="mt-8 md:text-base text-2xl">
                {aboutData.small_desc}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="">
        {obj &&
          obj.map((o, i) => (
            <div id={"about" + i} key={i}>
              <div ref={ref} dangerouslySetInnerHTML={{ __html: o }} />
            </div>
          ))}
      </div>
      <div className="pl-48 md:pl-0 md:pr-0 pr-48 mt-16 mb-16">
        <div className="bg-[#F9F7F3] text-[#0B2538]">
          <div className="flex flex-col p-12">
            <h1 className="text-2xl">{t("finansallar")}</h1>
            <h1 className="text-4xl">{t("reports")}</h1>
            <div className="flex md:flex-col justify-between gap-8 md:gap-2 mt-16">
              <div className="w-1/2 md:w-full flex-col  gap-8">
                {activityData &&
                  activityData
                    .filter((item) => item.reports_type === "years")
                    .slice(0, 6)
                    .map((item, index) => {
                      return (
                        <a
                          target="_blank"
                          href={item.file}
                          key={index}
                          className="flex border-t-2 border-gray-200 items-start justify-between"
                        >
                          <div className="flex gap-5 py-4  items-center">
                            <span className="text-[#FD8204]">{item.date}</span>
                            <p className="md:text-sm">{item.title}</p>
                          </div>
                          <div className="flex items-center pt-4 gap-2">
                            <span className="text-[#FD8204]">PDF</span>
                            <i className="pi pi-download text-black"></i>
                          </div>
                        </a>
                      );
                    })}
              </div>
              <div className="w-1/2 md:w-full flex-col  gap-8">
                {activityData &&
                  activityData
                    .filter((item) => item.reports_type === "years")
                    .slice(6, 12)
                    .map((item, i) => {
                      return (
                        <a
                          target="_blank"
                          href={item.file}
                          key={i}
                          className="flex border-t-2 border-gray-200 items-start justify-between"
                        >
                          <div className="flex gap-5 py-4 items-center">
                            <span className="text-[#FD8204]">{item.date}</span>
                            <p className="md:text-sm">{item.title}</p>
                          </div>
                          <div className="flex items-center pt-4 gap-2">
                            <span className="text-[#FD8204]">PDF</span>
                            <i className="pi pi-download text-black"></i>
                          </div>
                        </a>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default about;
