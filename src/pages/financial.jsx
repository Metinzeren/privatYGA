import { getActivityReports, getFinancials } from "@/API/helper";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import Loading from "@/components/Loading";
import Head from "next/head";

const financial = () => {
  const [financialData, setFinancialData] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await getFinancials().then((res) => {
      setFinancialData(res.data);
    });
    await getActivityReports().then((res) => {
      setActivityData(res.data);
    });
    setIsLoading(false);
  };
  const obj =
    financialData &&
    financialData.page.map((item) => JSON.parse(JSON.stringify(item.content)));
  const ref = useRef(null);
  return (
    <Loading loading={isLoading} className="">
      <Head>
        <title>{financialData && financialData.meta_title}</title>
        <meta
          name="description"
          content={financialData && financialData.meta_desc}
        />
      </Head>
      <div className="bg-[#fd8204] md:h-[220vh] relative w-full h-screen">
        <div className="absolute right-0">
          <img
            className="w-full md:h-auto"
            src="/bgImage.svg"
            alt="Follow us on Twitter"
          />
        </div>
        <div className="">
          <div className="financial">
            {obj &&
              obj.map((o) => (
                <div ref={ref} dangerouslySetInnerHTML={{ __html: o }} />
              ))}
          </div>
        </div>
      </div>
      <div className="pl-48 md:pl-0 md:pr-0 pr-48 mt-16 mb-16">
        <div className="items-center  justify-center flex flex-col text-center gap-3 mt-16 mb-8">
          <h1 className="text-[#FD8204] text-4xl font-bold">
            {t("yillikrep")}
          </h1>
          <p className="font-light max-w-[30vw] md:max-w-full text-xl text-[#0B2538]">
            {t("yillikrepdesc")}
          </p>
        </div>
        <div className="bg-[#F9F7F3] text-[#0B2538]">
          <div className="flex flex-col p-12">
            <div className="flex md:flex-col justify-between gap-8 md:gap-3 mt-16">
              <div className="w-1/2 md:w-full flex-col  gap-8 ">
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
              <div className="w-1/2 flex-col md:w-full gap-8">
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
      <div className="pl-48 md:pr-4 md:pl-4 pr-48 mt-16 mb-16">
        <div className="items-center  justify-center flex flex-col text-center gap-3 mt-16 mb-8">
          <h1 className="text-[#FD8204] text-4xl font-bold">
            {t("denetimRep")}
          </h1>
          <p className="font-light max-w-[30vw] md:max-w-full text-xl text-[#0B2538]">
            {t("yillikrepdesc")}
          </p>
        </div>
        <div className="bg-[#F9F7F3] text-[#0B2538]">
          <div className="flex flex-col p-12">
            <div className="flex md:flex-col justify-between gap-8 md:gap-3 mt-16">
              <div className="w-1/2 md:w-full flex-col  gap-8">
                {activityData &&
                  activityData
                    .filter((item) => item.reports_type === "audit")
                    .slice(0, 3)
                    .map((item, index) => {
                      return (
                        <a
                          target="_blank"
                          href={item.file}
                          key={index}
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
              <div className="w-1/2 md:w-full flex-col  gap-8">
                {activityData &&
                  activityData
                    .filter((item) => item.reports_type === "audit")
                    .slice(3, 5)
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
      <div className="pl-48 md:pl-4 md:pr-4 pr-48 mt-16 mb-16">
        <div className="items-center  justify-center flex flex-col text-center gap-3 mt-16 mb-8">
          <h1 className="text-[#FD8204] text-4xl font-bold">{t("dernekb")}</h1>
          <p className="font-light max-w-[30vw] md:max-w-full text-xl text-[#0B2538]">
            {t("yillikrepdesc")}
          </p>
        </div>
        <div className="bg-[#F9F7F3] text-[#0B2538]">
          <div className="flex flex-col p-12">
            <div className="flex md:flex-col justify-between gap-8 md:gap-3 mt-16">
              <div className="w-1/2 md:w-full flex-col  gap-8">
                {activityData &&
                  activityData
                    .filter((item) => item.reports_type === "society")
                    .slice(0, 2)
                    .map((item, index) => {
                      return (
                        <a
                          target="_blank"
                          href={item.file}
                          key={index}
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
              <div className="w-1/2 md:w-full flex-col  gap-8">
                {activityData &&
                  activityData
                    .filter((item) => item.reports_type === "society")
                    .slice(2, 4)
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

export default financial;
