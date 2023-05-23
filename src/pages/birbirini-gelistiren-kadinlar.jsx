import { getEmpWoman } from "@/API/helper";
import KayıtOl from "@/components/KayıtOl";
import Loading from "@/components/Loading";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

const empwoman = () => {
  const [womanData, setWomanData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchEmpWoman = async () => {
      setIsLoading(true);
      await getEmpWoman().then((res) => {
        setWomanData(res.data.detail);
      });
    };
    fetchEmpWoman();
    setIsLoading(false);
  }, []);
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
