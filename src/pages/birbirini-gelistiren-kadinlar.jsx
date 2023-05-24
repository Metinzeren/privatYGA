import { getEmpWoman } from "@/API/helper";
import KayıtOl from "@/components/KayıtOl";
import Loading from "@/components/Loading";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

export async function getServerSideProps(context) {
  const localeCookie = context.req.cookies["NEXT_LOCALE"];
  var resWoman = await fetch(
    `
    https://yga.org.tr/cms/api/v1/${localeCookie}/program/the-program-of-women-empowering-each-other`
  );
  var data = await resWoman.json();
  return {
    props: {
      woman: data,
    },
  };
}

const empwoman = ({ woman }) => {
  const [womanData, setWomanData] = useState(woman.detail);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(false);
  }, [woman]);
  const obj = JSON.parse(womanData && womanData.content);
  const ref = useRef(null);

  return (
    <Loading loading={isLoading}>
      <Head>
        <title>{womanData && womanData.meta_title}</title>
        <meta name="description" content={womanData && womanData.meta_desc} />
      </Head>
      {womanData && (
        <div className="w-full relative">
          <img
            className="w-full  md:h-screen object-cover"
            src={womanData.image_background}
            alt=""
          />
          <div className="absolute top-[30rem] md:top-[26rem] md:right-[34%] right-[46%]">
            <button className="px-12 text-white py-2 button2 transition-all bg-[#FD8204] rounded text-lg ">
              <KayıtOl name={t("basvur")} />
            </button>
          </div>
        </div>
      )}
      <div className="empwoman">
        {obj &&
          obj.page.map((o, i) => (
            <div
              key={i}
              ref={ref}
              dangerouslySetInnerHTML={{ __html: o.content }}
            />
          ))}
      </div>
    </Loading>
  );
};

export default empwoman;
