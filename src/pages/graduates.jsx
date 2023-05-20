import React, { useEffect, useState } from "react";
import "primeicons/primeicons.css";
import { getEntrepreneurs, getGraduates } from "@/API/helper";
import YgalıOl from "@/components/YgalıOl";
import Loading from "@/components/Loading";
import { useTranslation } from "next-i18next";
import Head from "next/head";

const graduates = () => {
  const [graduatesData, setGraduatesData] = useState(null);
  const [entrepreneurs, setEntrepreneurs] = useState(null);
  const [itemsToShow, setItemsToShow] = useState(8);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await getGraduates().then((res) => {
      setGraduatesData(res.data);
    });
    await getEntrepreneurs().then((res) => {
      setEntrepreneurs(res.data);
    });
    setIsLoading(false);
  };
  const handleShowMore = () => {
    setItemsToShow(itemsToShow + 4);
  };
  return (
    <Loading loading={isLoading}>
      <Head>
        <title>YGA - YGA Mezunları</title>
        <meta name="description" content="YGA - YGA Mezunları" />
      </Head>
      <div className="w-full relative mb-36">
        <img
          className="w-full md:h-screen object-cover "
          src="https://yga.org.tr/cms/images/pages/hakkimizdabg.png"
          alt=""
        />
        <div className="absolute  md:top-64 md:left-0 top-96 left-48">
          <div className="text-white md:pl-4 md:pr-4 flex flex-col gap-2 w-[600px] md:w-full">
            <h1 className="text-6xl font-bold md:text-3xl">YGA Mezunları</h1>
            <p className="mt-8 text-2xl md:text-base">{t("yillikrepdesc")}</p>
          </div>
        </div>
        <div className="absolute md:relative md:bottom-0 md:right-0  bottom-[-70px] right-48">
          <div className="flex flex-col gap-4 bg-[#FD8204] md:rounded-none rounded-2xl p-8">
            <h1 className="text-white text-3xl">{t("mezunara")}</h1>
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-4 rounded-2xl outline-none"
              placeholder={t("ara")}
            />
            <span className="text-white">{t("aradesc")}</span>
          </div>
        </div>
      </div>
      {search.length <= 0 ? (
        <div className="mt-24 mb-16">
          <div className="pl-48 md:pl-4 md:pr-4 pr-48">
            <h1 className="text-4xl text-[#FD8204] font-bold">
              {t("ygaligirisimciler")}
            </h1>
          </div>
          <div className="mb-16">
            <div className="pl-48 md:pl-4 md:pr-4 pr-48 w-full flex flex-col items-center mb-16">
              <div className="flex flex-wrap items-center justify-center gap-12 mt-24">
                {entrepreneurs &&
                  Object.values(entrepreneurs).map((item, index) => {
                    return (
                      <div
                        className="flex flex-col gap-1 items-center w-1/5 md:w-1/3 md:justify-center"
                        key={index}
                      >
                        <img
                          className="w-56 rounded-full h-56 md:h-auto object-cover grayscale"
                          src={item.image}
                        />
                        <h1 className="text-2xl font-bold md:text-base text-[#0B2538]">
                          {item.name_surname}
                        </h1>
                        <p className="text-lg font-light md:text-xs text-gray-500">
                          {item.company}
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
                            <span className="text-[#FD8204]">Linkedin</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="pl-48 md:pl-4 md:pr-4 pr-48">
        <h1 className="text-4xl text-[#FD8204] font-bold">{t("tummezun")}</h1>
        <div className="flex flex-wrap md:p-2 p-12">
          {graduatesData &&
            graduatesData
              .filter(
                (item) =>
                  item.name_surname
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  item.school.toLowerCase().includes(search.toLowerCase()) ||
                  item.desc.toLowerCase().includes(search.toLowerCase())
              )
              .slice(0, itemsToShow)
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-1/4 md:w-1/2 flex mb-12 flex-col"
                  >
                    <h1 className="text-2xl md:text-base">
                      {item.name_surname}
                    </h1>
                    <p className="text-gray-600 text-base md:text-xs">
                      {item.school}
                    </p>
                    <p className="text-gray-600 text-base md:text-xs">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
        </div>
        <div className="flex items-center  mb-12 justify-center">
          {itemsToShow && (
            <button
              onClick={handleShowMore}
              className="px-12 py-4 bg-orange-400 text-base text-white cursor-pointer rounded-md"
            >
              {t("more")}
            </button>
          )}
        </div>
      </div>

      <div className="md:hidden">
        <YgalıOl />
      </div>
    </Loading>
  );
};

export default graduates;
