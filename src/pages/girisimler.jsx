import React, { useEffect, useState } from "react";
import "primeicons/primeicons.css";
import { getAllProjects } from "@/API/helper";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/router";
import { getCookie } from "@/utils/common";
import Loading from "@/components/Loading";

export async function getServerSideProps(context) {
  const localeCookie = context.req.cookies["NEXT_LOCALE"];
  var resGirisim = await fetch(
    `
    https://yga.org.tr/cms/api/v1/${localeCookie}/projects`
  );
  var data = await resGirisim.json();
  return {
    props: {
      girisimler: data,
    },
  };
}

const girisimler = ({ girisimler }) => {
  const [projectsData, setProjectsData] = useState(girisimler.data);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const router = useRouter();
  const localeCookie = getCookie("NEXT_LOCALE");
  useEffect(() => {
    setIsLoading(false);
  }, [girisimler]);
  const navigateToDetails = (slug) => {
    const basePath = localeCookie === "tr" ? "/girisimler" : "/ventures";
    const url = `${basePath}/${slug}`;
    router.push(url);
  };

  return (
    <Loading loading={isLoading}>
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
              const socialLinksData = JSON.parse(item.detail.links);
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
                        <p
                          onClick={() => navigateToDetails(item.detail.slug)}
                          className="px-12 py-4 bg-white text-black rounded-md"
                        >
                          Devamını Oku
                        </p>
                        <a
                          href={item.detail.web_site_link}
                          target="_blank"
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
              );
            })}
      </div>
    </Loading>
  );
};

export default girisimler;
