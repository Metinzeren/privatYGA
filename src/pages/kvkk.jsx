import { getKvkkPage, getKvkkPdf } from "@/API/helper";
import Loading from "@/components/Loading";
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";

const kvkk = () => {
  const [kvkkPage, setKvkkPage] = useState(null);
  const [kvkkPdf, setKvkkPdf] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await getKvkkPage().then((res) => {
      setKvkkPage(res.data);
    });
    await getKvkkPdf().then((res) => {
      setKvkkPdf(res.data);
    });
    setIsLoading(false);
  };
  const obj =
    kvkkPage &&
    kvkkPage.page.map((item) => JSON.parse(JSON.stringify(item.content)));

  const ref = useRef(null);
  return (
    <Loading loading={isLoading}>
      <Head>
        <title>{kvkkPage && kvkkPage.meta_title}</title>
        <meta name="description" content={kvkkPage && kvkkPage.meta_desc} />
      </Head>
      {kvkkPage && (
        <div className="w-full relative">
          <img
            className="w-full md:h-screen object-cover "
            src={kvkkPage.bg_image}
            alt=""
          />
          <div className="absolute  md:top-64 md:left-0 top-96 left-48">
            <div className="text-white md:pl-4 md:pr-4 flex flex-col gap-2 w-[600px] md:w-full">
              <h1 className="text-6xl font-bold md:text-3xl">
                {kvkkPage.title}
              </h1>
            </div>
          </div>
        </div>
      )}
      <div className="kvkk">
        {obj &&
          obj.map((o, i) => (
            <div id={"kvkk" + i} key={i}>
              <div ref={ref} dangerouslySetInnerHTML={{ __html: o }} />
            </div>
          ))}
      </div>
      <div className="pl-60 pr-56 mb-16">
        <div className="bg-[#f9f7f4] flex items-start justify-center p-24 gap-12">
          <img
            className="w-96 object-contain "
            src="https://yga.org.tr/_nuxt/img/reportsrect.4130d77.png"
            alt="image"
          />
          <div className="flex text-[#0a2639] flex-col">
            <h2 className="text-2xl">Politikalar</h2>
            <h1 className="text-7xl font-bold">
              Kişisel Verilerin <br /> Korunması
            </h1>
            {kvkkPdf &&
              kvkkPdf.map((item, index) => {
                return (
                  <div key={index} className="mt-3">
                    <a
                      target="_blank"
                      href={item.link}
                      className="flex border-t-2 border-gray-200 items-start justify-between"
                    >
                      <div className="flex gap-5 py-4 items-center">
                        <p className="md:text-sm">{item.title}</p>
                      </div>
                      <div className="flex items-center pt-4 gap-2">
                        <span className="text-[#FD8204]">PDF</span>
                        <i className="pi pi-download text-black"></i>
                      </div>
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default kvkk;
