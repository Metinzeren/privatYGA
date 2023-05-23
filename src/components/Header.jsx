import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import "primeicons/primeicons.css";
import { useRouter } from "next/router";
import { Sidebar } from "primereact/sidebar";
import { useTranslation } from "next-i18next";
import KayıtOl from "./KayıtOl";
import { enMenuItems, trMenuItems } from "../utils/data";
import { getCookie } from "@/utils/common";

const Header = () => {
  const [isOpen, setIsOpen] = useState({});
  const [visibleRight, setVisibleRight] = useState(false);
  const router = useRouter();
  const [menuItems, setMenuItems] = useState([]);
  const { t } = useTranslation();
  const locales = router.locales.map((locale) => ({
    key: locale,
    value: locale,
  }));

  const localeCookie = getCookie("NEXT_LOCALE");

  useEffect(() => {
    setMenuItems(localeCookie === "tr" ? trMenuItems : enMenuItems);
  }, [localeCookie]);
  const [subMenuOpen, setSubMenuOpen] = useState(
    new Array(menuItems.length).fill(false)
  );

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".fixed");
      const links = document.querySelector(".links");
      const button1 = document.querySelector(".button1");
      const button2 = document.querySelector(".button2");

      if (window.pageYOffset > 0) {
        header.classList.remove("bg-transparent");
        header.classList.add("bg-white");

        links.classList.remove("text-white");
        links.classList.add("text-[#FD8204]");
        button1.classList.remove(
          "bg-transparent",
          "text-white",
          "border-white"
        );
        button1.classList.add("bg-white", "text-[#FD8204]", "border-[#FD8204]");

        button2.classList.remove("text-black", "border-white");
        button2.classList.add("text-[#FD8204]", "border-[#FD8204]");
      } else {
        header.classList.remove("bg-white");
        header.classList.add("bg-transparent");

        links.classList.remove("text-[#FD8204]");
        links.classList.add("text-white");

        button1.classList.remove(
          "text-[#FD8204]",
          "bg-white",
          "border-[#FD8204]"
        );
        button1.classList.add("text-white", "border-white", "bg-transparent");

        button2.classList.remove("text-[#FD8204]", "border-[#FD8204]");
        button2.classList.add("text-black", "border-white");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const SubMenu = ({ menuItem, subIndex, subMenuOpen }) => {
    return (
      <div className="absolute w-full z-50 flex left-0 top-20 bg-white flex-col">
        {subMenuOpen[subIndex] && (
          <div
            onMouseOut={() => {
              const newSubMenuOpen = [...subMenuOpen];
              newSubMenuOpen[subIndex] = false;
              setSubMenuOpen(newSubMenuOpen);
            }}
            className="flex justify-evenly h-64"
          >
            <div className="flex gap-4 items-center">
              <img src="https://yga.org.tr/svg/bird3.svg" alt="" />
              <h1 className="w-64">
                YGA çift kanatlı gençler yetiştirir. Bu gençler birlikte
                insanlığa faydalı ilklere imza atar.
              </h1>
            </div>
            <div className="w-[30rem] flex flex-col justify-center">
              {subMenuOpen[subIndex] &&
                menuItem.subItems.map((item, index) => {
                  return (
                    <p
                      className="cursor-pointer"
                      onClick={() => router.push(item.url)}
                      key={index}
                    >
                      {item.label}
                    </p>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className=" w-full p-0 z-50 fixed group hover:bg-white bg-transparent top-0 transition-all">
      <div className="flex md:bg-white justify-evenly md:justify-between md:px-4 relative items-center gap-12 py-4">
        <div className="w-28">
          <div onClick={() => router.push("/")}>
            <img
              src="https://yga.org.tr/_nuxt/img/logofoot.4b7be55.png"
              className="w-full cursor-pointer object-contain"
            />
          </div>
        </div>
        <div>
          {/* mobil menü */}
          <div className="hidden md:block ">
            <i
              onClick={() => setVisibleRight(true)}
              className="pi pi-align-justify"
              style={{ fontSize: "2rem", color: "#FD8204" }}
            ></i>
            <Sidebar
              style={{
                backgroundColor: "#ffff",
                width: "100%",
                zIndex: "999999999999999",
              }}
              visible={visibleRight}
              position="right"
              onHide={() => setVisibleRight(false)}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 ">
                  {menuItems.map((menuItem, index) => {
                    return (
                      <div className="relative" key={index}>
                        <p
                          onClick={() => {
                            setIsOpen({
                              ...isOpen,
                              [menuItem.id]: !isOpen[menuItem.id],
                            });
                            menuItem.url && router.push(menuItem.url);
                          }}
                          className="text-black text-lg cursor-pointer uppercase"
                        >
                          {menuItem.label}
                        </p>
                        {menuItem.subItems && isOpen[menuItem.id] && (
                          <div className="flex flex-col gap-4 pl-4 my-4">
                            {menuItem.subItems.map((subItem, index) => (
                              <p
                                onClick={() =>
                                  subItem.url && router.push(subItem.url)
                                }
                                key={index}
                                className="text-black cursor-pointer"
                              >
                                {subItem.label}
                              </p>
                            ))}
                          </div>
                        )}
                        <div className="absolute right-0 top-0">
                          {menuItem.subItems && (
                            <i
                              onClick={() =>
                                setIsOpen({
                                  ...isOpen,
                                  [menuItem.id]: !isOpen[menuItem.id],
                                })
                              }
                              className="pi pi-angle-down text-black"
                              style={{ fontSize: "1rem" }}
                            ></i>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Sidebar>
          </div>
          {/* mobil menü */}
          <div className="flex md:hidden gap-4 links text-white group-hover:text-[#FD8204]">
            {menuItems.map((menuItem, index) => {
              return (
                <div key={index}>
                  <p
                    onMouseOver={() => {
                      if (menuItem.subItems) {
                        const newSubMenuOpen = new Array(menuItems.length).fill(
                          false
                        );
                        newSubMenuOpen[index] = true;
                        setSubMenuOpen(newSubMenuOpen);
                      } else {
                        const newSubMenuOpen = new Array(menuItems.length).fill(
                          false
                        );
                        setSubMenuOpen(newSubMenuOpen);
                      }
                    }}
                    className="transition-all cursor-pointer text-lg"
                    onClick={() => menuItem.url && router.push(menuItem.url)}
                  >
                    {menuItem.label}
                  </p>
                  <ul className="">
                    <li>
                      {menuItem.subItems && menuItem.subItems.length > 0 && (
                        <SubMenu
                          menuItem={menuItem}
                          subIndex={index}
                          subMenuOpen={subMenuOpen}
                        />
                      )}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex md:hidden gap-4">
          <a
            target="_blank"
            href="https://bilimseferberligi.org/"
            className="bg-transparent button1 transition-all px-8 py-2 border-2 rounded text-white text-lg group-hover:text-[#FD8204] group-hover:border-[#FD8204] border-white"
          >
            {t("destekle")}
          </a>
          <button className="px-8 text-black py-2 button2 transition-all bg-white rounded text-lg border-2 border-white group-hover:border-[#FD8204]   group-hover:text-[#FD8204]">
            <KayıtOl name={t("basvur")} />
          </button>
          <Dropdown
            optionValue="key"
            optionLabel="value"
            value={router.locale}
            options={locales}
            onChange={(event) => {
              router.push("/", "/", { locale: event.value });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
