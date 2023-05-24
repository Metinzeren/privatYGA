import { postEmailData } from "@/API/helper";
import { getCookie } from "@/utils/common";
import { footerEnItems, footerTrItems } from "@/utils/data";
import { removeBlank } from "@/utils/helper";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({});
  const { t } = useTranslation();
  const lineWith = removeBlank(t("newslettertitle"));
  const router = useRouter();
  const [menuItems, setMenuItems] = useState([]);
  const locales = router.locales.map((locale) => ({
    key: locale,
    value: locale,
  }));
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email,
    };

    try {
      const response = await postEmailData(formData);
      if (response) {
        setStatus(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const localeCookie = getCookie("NEXT_LOCALE");
  useEffect(() => {
    setMenuItems(localeCookie === "tr" ? footerTrItems : footerEnItems);
  }, [localeCookie]);
  return (
    <div className="">
      <div className="bg-[#0B2538] py-16">
        <div className="pl-48 md:pl-4 md:pr-4 md:flex-col md:gap-12 pr-48 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: lineWith,
                }}
              />
            </h1>
          </div>
          <div className=" flex flex-col md:flex-col gap-3">
            <div className="flex items-center md:flex-col gap-2">
              <input
                className="px-12 py-4 md:w-full rounded-md"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta Adresin"
              ></input>
              <button
                className="px-12 py-4 md:w-full bg-orange-400 text-base text-white rounded-md"
                onClick={(event) => handleSubmit(event)}
              >
                {t("gonder")}
              </button>
            </div>
            {status && status.success ? (
              <h1 className="text-lg text-white font-light">
                {status && status.message}
              </h1>
            ) : (
              <h1 className="text-lg text-white font-light">
                {status && status.message}
              </h1>
            )}
          </div>
        </div>
      </div>
      <footer className="bg-[#F9F7F3] pl-48 pr-48 md:pl-0 md:pr-0 pb-12 md:pb-0 md:pt-0 pt-12">
        <div className="fle flex-col md:flex md:justify-center  pb-10">
          <div className="flex  md:hidden justify-between gap-48">
            {menuItems.map((menuItem, index) => (
              <div key={index}>
                <div className="flex flex-col">
                  <img className="w-16" src={menuItem.icon} alt="" />
                  <h3 className="font-bold text-[#FD8204]">{menuItem.title}</h3>
                </div>
                <ul className="list-none mt-4 text-sm">
                  {menuItem.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="mt-2">
                      <a href={link.url} className="text-[#0B2538]">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between md:justify-center md:items-start  md:pl-4 md:flex-col md:gap-3 md:pb-8 md:pt-4 items-end">
          <div className="flex md:flex-col md:items-start gap-4 items-center justify-center">
            <img
              className="w-20"
              src="https://yga.org.tr/img/logofoot.png"
              alt=""
            />
            <h1 className="text-black font-light">
              <span className="font-extrabold">YGA, </span> Türkiye’de kurulan
              uluslararası bir sivil toplum kuruluşudur.
            </h1>
          </div>
          <div className="flex gap-2">
            <a
              href="https://www.facebook.com/YoungGuruAcademy/?fref=ts"
              target=""
            >
              <i
                className="pi pi-facebook"
                style={{ fontSize: "1.5rem", color: "#FD8204" }}
              ></i>
            </a>
            <a href="https://www.instagram.com/ygaorgtr/?hl=tr" target="">
              <i
                className="pi pi-instagram"
                style={{ fontSize: "1.5rem", color: "#FD8204" }}
              ></i>
            </a>
            <a href="https://twitter.com/ygaorgtr?lang=tr" target="">
              <i
                className="pi pi-twitter"
                style={{ fontSize: "1.5rem", color: "#FD8204" }}
              ></i>
            </a>
            <a href="https://tr.linkedin.com/company/yga" target="">
              <i
                className="pi pi-linkedin"
                style={{ fontSize: "1.5rem", color: "#FD8204" }}
              ></i>
            </a>
            <a href="https://www.tiktok.com/" target="_blank">
              <img
                className=" w-8 md:w-8 object-contain"
                src="https://yga.org.tr/svg/tiktok.svg"
              />
            </a>
          </div>
        </div>
      </footer>
      <div className="flex py-4 justify-between md:flex-col md:items-start md:gap-3 items-center md:pl-4 md:pr-4 pl-48 pr-48">
        <Dropdown
          optionValue="key"
          optionLabel="value"
          value={router.locale}
          options={locales}
          onChange={(event) => {
            router.push("/", "/", { locale: event.value });
          }}
        />
        <div className="flex md:flex-col md:items-start gap-3 text-sm items-center ">
          <p
            onClick={() => router.push("/kvkk")}
            className="text-[#FD8204] decoration-1 underline cursor-pointer"
          >
            Kişisel Verilerin Korunması
          </p>
          <a
            href="https://yga.org.tr/cms/yga_cerez_politikasi.pdf"
            alt=""
            className="text-[#FD8204] decoration-1 underline cursor-pointer"
          >
            Çerez Politikası
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
