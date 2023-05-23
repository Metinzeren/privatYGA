import { postEmailData } from "@/API/helper";
import { removeBlank } from "@/utils/helper";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({});
  const { t } = useTranslation();
  const lineWith = removeBlank(t("newslettertitle"));
  const router = useRouter();
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
            <div className="">
              <div className="flex flex-col">
                <img
                  className="w-16"
                  src="https://yga.org.tr/svg/world.svg"
                  alt=""
                />
                <h3 className="font-bold text-[#FD8204]">Hakkımızda</h3>
              </div>
              <ul className="list-none mt-4 text-sm">
                <li className="mt-2">
                  <a href="/about" className=" text-[#0B2538] ">
                    Hakkımızda
                  </a>
                </li>
                <li className="mt-2">
                  <a href="/history" className=" text-[#0B2538] ">
                    Ofis Ekibi
                  </a>
                </li>
                <li className="mt-2">
                  <a href="/arge" className=" text-[#0B2538] ">
                    Mezunlar
                  </a>
                </li>
                <li className="mt-2">
                  <a href="/policies" className=" text-[#0B2538] ">
                    Hayal Ortakları
                  </a>
                </li>
                <li className="mt-2">
                  <a href="/news" className="text-[#0B2538]  ">
                    Finansallar
                  </a>
                </li>
                <li className="mt-2">
                  <a href="/sectoral" className=" text-[#0B2538] ">
                    İletişim
                  </a>
                </li>
                <li className="mt-2">
                  <a href="/references" className=" text-[#0B2538] ">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div className="">
              <div className="flex flex-col">
                <img
                  className="w-16"
                  src="https://yga.org.tr/svg/lamb.svg"
                  alt=""
                />
                <h3 className="font-bold text-[#FD8204]">
                  Girişimler ve Projeler
                </h3>
              </div>
              <ul className="list-none mt-4 text-sm">
                <li className="mt-2">
                  <a href="/products" className=" text-[#0B2538] ">
                    Bilim Seferberliği
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className=" text-[#0B2538] ">
                    WeWalk
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className=" text-[#0B2538] ">
                    Twin
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className=" text-[#0B2538] ">
                    Piri
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="text-[#0B2538]  ">
                    UP School
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className=" text-[#0B2538] ">
                    Poilabs
                  </a>
                </li>
              </ul>
            </div>
            <div className="">
              <div className="flex flex-col">
                <img
                  className="w-16"
                  src="https://yga.org.tr/svg/book.svg"
                  alt=""
                />
                <h3 className="font-bold text-[#FD8204]">YGA Programları</h3>
              </div>
              <ul className="list-none mt-4 text-sm">
                <li className="mt-2">
                  <a href="/ilkaind" className=" text-[#0B2538] ">
                    Global Impact Middle School
                  </a>
                </li>
                <li className="mt-2">
                  <a href="/ilkaplast" className=" text-[#0B2538] ">
                    Globacl Impact University
                  </a>
                </li>
                <li className="mt-2">
                  <a href="/ilkapack" className=" text-[#0B2538] ">
                    Bilimle Buluş
                  </a>
                </li>
                <li className="mt-2">
                  <a href="/ilkapack" className=" text-[#0B2538] ">
                    Global Impact Pioneers
                  </a>
                </li>
                <li className="mt-2">
                  <a href="/ilkapack" className=" text-[#0B2538] ">
                    Global Impact High School
                  </a>
                </li>
                <li className="mt-2">
                  <a href="/ilkapack" className=" text-[#0B2538] ">
                    Alumni Topluluğu
                  </a>
                </li>
                <li className="mt-2">
                  <a href="/ilkapack" className=" text-[#0B2538] ">
                    Birbirini Geliştiren Kadınlar
                  </a>
                </li>
              </ul>
            </div>
            <div className="">
              <div className="flex flex-col">
                <img
                  className="w-16"
                  src="https://yga.org.tr/svg/graduate.svg"
                  alt=""
                />
                <a href="/catalog" className="font-bold text-[#FD8204]">
                  Akademik İşbirlikleri
                </a>
              </div>
              <ul className="list-none mt-4 text-sm"></ul>
            </div>
            <div className=" ">
              <div className="flex flex-col">
                <img
                  className="w-16"
                  src="https://yga.org.tr/svg/bird.svg"
                  alt=""
                />
                <h3 href="/resources" className="font-bold text-[#FD8204]">
                  YGA Zirvesi
                </h3>
              </div>
              <ul className="list-none mt-4 text-sm"></ul>
            </div>
          </div>
          <div className="flex justify-between md:justify-center md:items-center md:flex-col md:pt-4 items-end">
            <div className="flex gap-4 items-center justify-center">
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
              <img
                className="w-full md:w-8 object-contain"
                src="https://yga.org.tr/svg/fb.svg"
              />
              <img
                className="w-full md:w-8 object-contain"
                src="https://yga.org.tr/svg/ig.svg"
              />
              <img
                className="w-full md:w-8 object-contain"
                src="https://yga.org.tr/svg/tw.svg"
              />
              <img
                className="w-full md:w-8 object-contain"
                src="https://yga.org.tr/svg/in.svg"
              />
              <img
                className=" w-8 md:w-8 object-contain"
                src="https://yga.org.tr/svg/tiktok.svg"
              />
            </div>
          </div>
        </div>
      </footer>
      <div className="flex py-4 justify-between items-center md:pl-4 md:pr-4 pl-48 pr-48">
        <Dropdown
          optionValue="key"
          optionLabel="value"
          value={router.locale}
          options={locales}
          onChange={(event) => {
            router.push("/", "/", { locale: event.value });
          }}
        />
        <div className="flex gap-3 text-sm items-center ">
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
