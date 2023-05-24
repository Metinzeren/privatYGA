import React, { useEffect, useState } from "react";
import "primeicons/primeicons.css";
import { getOfficeTeam } from "@/API/helper";
import YgalıOl from "@/components/YgalıOl";
import Loading from "@/components/Loading";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { getCookie } from "@/utils/common";

export async function getServerSideProps(context) {
  const localeCookie = context.req.cookies["NEXT_LOCALE"];
  var resTeam = await fetch(
    `
    https://yga.org.tr/cms/api/v1/${localeCookie}/office-team`
  );
  var data = await resTeam.json();
  return {
    props: {
      team: data,
    },
  };
}

const ofisekibi = ({ team }) => {
  const [menagerTeam, setMenagerTeam] = useState(team["yonetim-kurulu"]);
  const [executiveTeam, setExecutiveTeam] = useState(team["icra-kurulu"]);
  const [ofisTeam, setOfisTeam] = useState(team["yga-ofis"]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const localeCookie = getCookie("NEXT_LOCALE");
  useEffect(() => {
    setIsLoading(false);
  }, [team]);
  return (
    <Loading loading={isLoading}>
      <Head>
        <title>YGA - Ofis Ekibi</title>
        <meta name="description" content="YGA - Ofis Ekibi" />
      </Head>
      <div className="w-full relative">
        <img
          className="w-full md:h-screen object-cover "
          src="https://yga.org.tr/cms/images/pages/hakkimizdabg.png"
          alt=""
        />
        <div className="absolute  md:top-64 md:left-0 top-96 left-48">
          <div className="text-white md:pl-4 md:pr-4 flex flex-col gap-2 w-[600px] md:w-full">
            <h1 className="text-6xl font-bold">
              {localeCookie === "tr" ? "Ofis Ekibi" : "Office Team"}
            </h1>
            <p className="mt-8 text-2xl">
              {localeCookie === "tr"
                ? "YGA’lı gençler kanatlarını, insanlığa faydalı teknoloji temelli inovasyonları hayata geçirirken geliştirirler."
                : null}
            </p>
          </div>
        </div>
      </div>
      <div className="pl-48 md:pl-4 md:pr-4 pr-48 mt-36 ">
        <h1 className="text-4xl text-[#FD8204] font-bold">{t("kurull")}</h1>
      </div>
      <div className="mb-16">
        <div className="pl-48 md:pl-4 md:pr-4 pr-48 w-full flex flex-col items-center mb-16">
          <div className="flex flex-wrap items-center justify-center gap-12 mt-24">
            {menagerTeam &&
              Object.values(menagerTeam).map((item, index) => {
                return (
                  <div
                    className="flex flex-col gap-1 items-center w-1/5 md:w-1/3"
                    key={index}
                  >
                    <img
                      className="w-56 rounded-full h-56 md:h-auto object-cover"
                      src={item.image}
                    />
                    <h1 className="text-2xl font-bold md:text-base text-[#0B2538]">
                      {item.name_surname}
                    </h1>
                    <p className="text-lg md:text-xs font-light text-gray-500">
                      {item.title}
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
      <div className="pl-48 pr-48 md:pl-4 md:pr-4 mt-36 ">
        <h1 className="text-4xl text-[#FD8204] font-bold">{t("icra")}</h1>
      </div>
      <div className="mb-16">
        <div className="pl-48 pr-48 md:pl-4 md:pr-4 w-full flex flex-col items-center mb-16">
          <div className="flex flex-wrap items-center justify-center gap-24 mt-24">
            {executiveTeam &&
              Object.values(executiveTeam).map((item, index) => {
                return (
                  <div className="flex flex-col items-center" key={index}>
                    <img
                      className="w-56 rounded-full h-56  object-cover"
                      src={item.image}
                    />
                    <h1 className="text-2xl font-bold text-[#0B2538] md:text-base">
                      {item.name_surname}
                    </h1>
                    <p className="text-lg font-light md:text-sm text-gray-500">
                      {item.title}
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
      <div className="pl-48 pr-48 md:pl-4 md:pr-4 mt-36 ">
        <h1 className="text-4xl text-[#FD8204] font-bold">{t("ygaofis")}</h1>
      </div>
      <div className="mb-16">
        <div className="pl-48 pr-48 md:pl-4 md:pr-4 w-full flex flex-col items-center mb-16">
          <div className="flex flex-wrap items-center justify-center gap-12 mt-24">
            {ofisTeam &&
              Object.values(ofisTeam).map((item, index) => {
                return (
                  <div
                    className="flex flex-col gap-1 items-center w-1/5 md:w-1/2"
                    key={index}
                  >
                    <img
                      className="w-56 rounded-full h-56 md:h-auto object-cover"
                      src={item.image}
                    />
                    <h1 className="text-2xl font-bold md:text-base text-[#0B2538]">
                      {item.name_surname}
                    </h1>
                    <p className="text-lg md:text-sm font-light text-gray-500">
                      {item.title}
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
      <div className="md:hidden">
        <YgalıOl />
      </div>
    </Loading>
  );
};

export default ofisekibi;
