import React, { useEffect, useRef, useState } from "react";
import "primeicons/primeicons.css";
import { getProjects } from "@/API/helper";
import { Dialog } from "primereact/dialog";

const bilimseferberligi = () => {
  const [projects, setProjects] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      await getProjects().then((res) => {
        setProjects(res.data.detail);
      });
    };
    fetchProjects();
  }, []);
  const obj = JSON.parse(projects && projects.content);
  const ref = useRef(null);
  const socialLinksData = JSON.parse(projects && projects.links);

  return (
    <div>
      {projects && (
        <div className="w-full relative">
          <img
            className="w-full md:h-screen object-cover "
            src={projects.image_background}
            alt=""
          />
          <div className="absolute  md:top-64 md:left-0 top-96 left-48">
            <div className="text-white md:pl-4 md:pr-4 flex flex-col gap-2 w-[600px] md:w-full">
              <img className="w-56" src={projects.image_logo} alt="" />
              <h1 className="text-6xl md:text-3xl font-bold">
                {projects.title}
              </h1>
              <p className="mt-2 text-2xl md:text-base">{projects.desc}</p>
              <div className="flex gap-3">
                <a
                  target="_blank"
                  className="px-12 md:px-8 py-4 bg-white text-base text-black rounded-md"
                  href={projects.web_site}
                >
                  {projects.web_site_button_text}
                </a>
                <p
                  className="px-12 md:px-8 py-4 bg-orange-400 text-base text-white rounded-md"
                  onClick={() => setDisplayModal(true)}
                >
                  {projects.video_button_text}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute md:right-0 md:left-4 bottom-24 right-48">
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
      <Dialog
        visible={displayModal}
        onHide={() => setDisplayModal(false)}
        modal
        style={{ width: "60vw" }}
      >
        <iframe
          allowFullScreen
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${projects && projects.video}`}
        ></iframe>
      </Dialog>
      <div className="wewalk">
        {obj &&
          obj.page.map((o, i) => (
            <div
              key={i}
              ref={ref}
              dangerouslySetInnerHTML={{ __html: o.content }}
            />
          ))}
      </div>
    </div>
  );
};

export default bilimseferberligi;
