import { removeBlank } from "@/utils/helper";
import { useTranslation } from "next-i18next";
import React from "react";
import KayıtOl from "./KayıtOl";

const YgalıOl = () => {
  const { t } = useTranslation();
  const howToLineBreaks = removeBlank(t("howto"));
  return (
    <div className="pl-48 md:hidden md:pl-0 md:pr-0 pr-48 mb-16">
      <div className="bg-[#F9F7F3] p-12 md:flex-col flex">
        <div className="w-2/3 md:w-full">
          <img
            src="https://yga.org.tr/_nuxt/img/birdsalt.2a694ae.svg"
            alt=""
            className="object-contain"
          />
        </div>
        <div className="w-1/3 md:w-full flex flex-col gap-4">
          <h1 className="text-[#112B3D] text-4xl font-bold">
            <div
              dangerouslySetInnerHTML={{
                __html: howToLineBreaks,
              }}
            />
          </h1>
          <p className="w-[60%]">{t("howtop")}</p>
          <div className="mt-4">
            <button className="px-12 py-4 bg-[#FD8204] text-white rounded-md">
              <KayıtOl name={t("howtob")} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YgalıOl;
