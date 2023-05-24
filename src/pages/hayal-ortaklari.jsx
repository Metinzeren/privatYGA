import { dreamPartner } from "@/API/helper";
import Loading from "@/components/Loading";
import YgalıOl from "@/components/YgalıOl";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const localeCookie = context.req.cookies["NEXT_LOCALE"];
  var resHayal = await fetch(
    `
    https://yga.org.tr/cms/api/v1/${localeCookie}/dream-partners`
  );
  var data = await resHayal.json();
  return {
    props: {
      hayal: data,
    },
  };
}

const hayalortaklari = ({ hayal }) => {
  const [partners, setPartners] = useState(hayal);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, [hayal]);
  return (
    <Loading loading={isLoading}>
      <Head>
        <title>YGA - Hayal Ortakları</title>
        <meta name="description" content="YGA - Hayal Ortakları" />
      </Head>
      <div className="w-full relative">
        <img
          className="w-full md:h-screen object-cover "
          src="https://yga.org.tr/cms/images/pages/hakkimizdabg.png"
          alt=""
        />
        <div className="absolute md:top-64 md:left-0 top-96 left-48">
          <div className="text-white md:pl-4 md:pr-4 md:w-full w-[600px]">
            <h1 className="text-6xl font-bold md:text-2xl">
              {t("hayalortaklari")}
            </h1>
            <p className="mt-8 text-2xl">
              {t("hayalort").split("<u>", "</u>").join("")}
            </p>
          </div>
        </div>
      </div>
      <div className="pl-48 md:pl-0 md:pr-0 md:flex md:justify-center pr-48 mt-16">
        <h1 className="font-semibold text-4xl text-[#FD8204]">
          {t("hayalortaklari")}
        </h1>
      </div>
      <div className="mt-24 mb-16">
        <div className="pl-48 md:pl-4 md:pr-4 pr-48 w-full flex flex-col items-center mb-16">
          <div className="flex flex-wrap items-center justify-center gap-12 mt-24">
            {partners &&
              Object.values(partners["hayal-ortaklari"]).map((item, index) => {
                return (
                  <div
                    className="flex flex-col items-center w-1/5 md:w-1/2"
                    key={index}
                  >
                    <img
                      className="w-56 rounded-full object-contain"
                      src={item.image}
                    />
                    <h1 className="text-2xl font-bold text-[#0B2538]">
                      {item.name_surname}
                    </h1>
                    <span className="text-[#B5BEC4] ">{item.desc}</span>
                    <span className="text-[#B5BEC4] ">{item.title}</span>
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

export default hayalortaklari;
