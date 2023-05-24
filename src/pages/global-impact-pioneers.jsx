import { getPioneers } from "@/API/helper";
import Loading from "@/components/Loading";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

export async function getServerSideProps(context) {
  const localeCookie = context.req.cookies["NEXT_LOCALE"];
  var resPio = await fetch(
    `https://yga.org.tr/cms/api/v1/${localeCookie}/program/global-impact-pioneers
    `
  );
  var data = await resPio.json();
  return {
    props: {
      pioneerss: data,
    },
  };
}

const pioneers = ({ pioneerss }) => {
  const [pioneersData, setPioneersData] = useState(pioneerss.detail);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(false);
  }, [pioneerss]);

  const obj = JSON.parse(pioneersData && pioneersData.content);
  const ref = useRef(null);
  const socialLinksData = JSON.parse(pioneersData && pioneersData.links);
  console.log(pioneersData);
  return (
    <Loading loading={isLoading}>
      <Head>
        <title>{pioneersData && pioneersData.meta_title}</title>
        <meta
          name="description"
          content={pioneersData && pioneersData.meta_desc}
        />
      </Head>
      {pioneersData && (
        <div className="w-full relative">
          <img
            className="w-full md:h-screen object-cover"
            src={pioneersData.image_background}
            alt=""
          />
          <div className="absolute  md:top-64 md:left-0 top-96 left-48">
            <div className="text-white md:pl-4 md:pr-4 flex flex-col gap-2 w-[600px] md:w-full">
              <h1 className="text-3xl md:text-2xl">{t("ygaprogramlari")}</h1>
              <h1 className="text-6xl md:text-3xl font-bold">
                {pioneersData.title}
              </h1>
              <p className="mt-8 text-2xl">{pioneersData.desc}</p>
            </div>
          </div>
          <div className="absolute  bottom-20 right-48">
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

      <div className="pioneers">
        {obj &&
          obj.page.map((o, i) => (
            <div
              key={i}
              ref={ref}
              dangerouslySetInnerHTML={{ __html: o.content }}
            />
          ))}
      </div>
      <div className="mt-24 mb-16">
        <div className="pl-60 md:pl-4 md:pr-4 pr-60">
          <h1 className="text-4xl text-[#FD8204] text-left font-semibold">
            Global Impact Pioneers Community
          </h1>
        </div>
        <div className="pl-48 pr-48 md:pl-4 md:pr-4 w-full flex flex-col items-center mb-16">
          <div className="flex flex-wrap items-center justify-center gap-12 mt-24">
            {pioneersData &&
              pioneersData.graduates.map((item, index) => {
                return (
                  <div
                    className="flex flex-col items-center w-1/5 md:w-1/2"
                    key={index}
                  >
                    <img
                      className="w-56 h-56  object-cover rounded-full"
                      src={item.image}
                      alt=""
                    />
                    <h1 className="text-2xl font-bold text-[#0B2538]">
                      {item.name_surname}
                    </h1>
                    <span className="text-[#B5BEC4] ">{item.school}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="director pl-48 md:pl-4 md:pr-4 pr-48 mt-16 md:mt-0  flex">
        {pioneersData &&
          pioneersData.director.map((item, index) => {
            return (
              <div
                key={index}
                className="flex md:flex-col md:justify-center items-center w-full"
              >
                <div className="w-1/2 md:w-full flex flex-col">
                  <img
                    className="w-36 object-cover"
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
                </div>
              </div>
            );
          })}
      </div>
    </Loading>
  );
};

export default pioneers;
