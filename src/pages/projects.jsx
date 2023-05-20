import React, { useEffect, useState } from "react";
import "primeicons/primeicons.css";
import { getProjects } from "@/API/helper";
import { useTranslation } from "next-i18next";
import Loading from "@/components/Loading";
import Head from "next/head";

const projects = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState(null);
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      await getProjects()
        .then((res) => {
          setProjects(res.data.detail);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchProjects();
  }, []);
  return (
    <Loading loading={isLoading}>
      <Head>
        <title>{projects && projects.meta_title}</title>
        <meta name="description" content={projects && projects.meta_desc} />
      </Head>
      <div className="w-full relative">
        <img
          className="w-full md:h-screen object-cover "
          src="https://yga.org.tr/cms/images/pages/hakkimizdabg.png"
          alt=""
        />
        <div className="absolute  md:top-64 md:left-0 top-96 left-48">
          <div className="text-white md:pl-4 md:pr-4 flex flex-col gap-2 w-[600px] md:w-full">
            <h1 className="text-6xl font-bold md:text-3xl">
              {t("ygaprojeleri")}
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full relative">
        {projects && (
          <div>
            <img
              className="w-full md:h-screen object-cover "
              src={projects.image_background}
              alt=""
            />
            <div className="absolute md:top-56 md:left-6 top-96 left-48">
              <div className="flex flex-col gap-4">
                <img className="w-48 " src={projects.image_logo} alt="" />
                <h1 className="text-3xl md:text-base text-white">
                  {t("ygaprojeleri")}
                </h1>
                <h1 className="text-6xl md:text-3xl text-white font-bold ">
                  {projects.title}
                </h1>
                <p className="w-[600px] md:w-full text-white">
                  {projects.desc}
                </p>
                <div className="flex gap-4">
                  <a
                    href=""
                    className="px-12 md:px-8 py-4 bg-white text-black rounded-md"
                  >
                    {t("devaminioku")}
                  </a>
                  <a
                    href={projects.web_site}
                    target="_blank"
                    className="px-12 md:px-8 py-4 bg-transparent border-2 border-white text-white rounded-md"
                  >
                    {projects.web_site_button_text}
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute  bottom-24 left-48">
              <div className="flex flex-col">
                <span className="text-sm text-white">Sosyal Medya</span>
                <div className="flex gap-4 mt-4">
                  <a href={projects.links}>
                    <i className="pi pi-facebook text-white text-3xl"></i>
                  </a>
                  <a href="/">
                    <i className="pi pi-twitter text-white text-3xl"></i>
                  </a>
                  <a href="/">
                    <i className="pi pi-linkedin text-white text-3xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Loading>
  );
};

export default projects;
