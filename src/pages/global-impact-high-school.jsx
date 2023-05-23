import { getGlobalHigh } from "@/API/helper";
import Loading from "@/components/Loading";
import { rooms } from "@/utils/data";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "next-i18next";
import Head from "next/head";

const globalimpacthighschool = () => {
  const [globalData, setGlobalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const selectionOptions = [
    {
      id: 1,
      button: t("tab1"),
      label: ["section-1", "section-2", "section-3"],
    },
    {
      id: 2,
      button: t("tab2"),
      label: ["section-4", "section-5", "section-6", "section-7"],
    },
    {
      id: 3,
      button: t("tab4"),
      label: ["section-8", "section-9"],
    },
  ];

  const [selection, setSelection] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const fetchGlobal = async () => {
      await getGlobalHigh()
        .then((res) => {
          setGlobalData(res.data.detail);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchGlobal();
  }, []);
  const obj = JSON.parse(globalData && globalData.content);
  const ref = useRef(null);
  const filterPageBySectionSlug = (sectionSlug) => {
    var _vFindTab = selectionOptions.find((y) => y.id === sectionSlug);
    if (_vFindTab !== null) {
      return obj?.page?.filter((o) =>
        _vFindTab.label.includes(o["section-slug"])
      );
    }
  };
  const socialLinksData = JSON.parse(globalData && globalData.links);

  const globalTitle =
    globalData && globalData.title.replace(/<br\s*\/?>/g, "<br/>");
  return (
    <Loading loading={isLoading}>
      <Head>
        <title>{globalData && globalData.meta_title}</title>
        <meta name="description" content={globalData && globalData.meta_desc} />
      </Head>
      {globalData && (
        <div className="w-full relative">
          <img
            className="w-full md:h-screen object-cover"
            src={globalData.image_background}
            alt=""
          />
          <div className="absolute  md:top-64 md:left-0 top-96 left-48">
            <div className="text-white md:pl-4 md:pr-4 flex flex-col gap-2 w-[600px] md:w-full">
              <img className="w-56" src={globalData.logo} alt="" />
              <h1 className="text-3xl md:text-2xl">{t("ygaprogramlari")}</h1>
              <h1
                className="text-6xl font-bold md:text-3xl "
                dangerouslySetInnerHTML={{
                  __html: globalTitle,
                }}
              ></h1>
              <p className="mt-2 text-2xl md:text-base">{globalData.desc}</p>
            </div>
            <div className="mt-24 md:hidden bg-white p-7 flex items-center rounded-2xl gap-6">
              {selectionOptions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelection(item.id)}
                  className={
                    selection === item.id
                      ? "text-white bg-[#FD8204] px-10 py-3 rounded-xl"
                      : ""
                  }
                >
                  {item.button}
                </button>
              ))}
            </div>
          </div>
          <div className="absolute  bottom-20 right-48">
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
      {/* mobil tab */}
      <div className="hidden md:block">
        <div className="fixed  z-50 top-16 w-full">
          <div>
            <Dropdown
              value={selectionOptions.find((option) => option.id === selection)}
              onChange={(e) => setSelection(e.value.id)}
              options={selectionOptions}
              optionLabel="button"
              placeholder="Select an option"
              className="w-full md:w-14rem"
            />
          </div>
        </div>
      </div>
      {/* mobil tab */}
      <div className="">
        {filterPageBySectionSlug(selection)?.map((o, index) => {
          const findOption = selectionOptions.find((y) => y.id === selection);

          return (
            <div key={index}>
              <div id={findOption.label[index]}>
                <div
                  ref={ref}
                  dangerouslySetInnerHTML={{ __html: o.content }}
                />
              </div>
              {o["section-slug"] == "section-2" && (
                <div className="flex md:flex-col md:gap-4">
                  {globalData &&
                    globalData.rooms.map((item, index) => {
                      const itemDescWithLineBreaks =
                        item && item.desc.replace(/<br\s*\/?>/g, "<br/>");
                      return (
                        <div key={index}>
                          <div className="w-full pl-0 pr-0 flex relative">
                            <img src={item.image_background} alt="" />
                            <div className="absolute text-white left-4 bottom-6">
                              <h1 className="text-4xl font-bold">
                                {item.title}
                              </h1>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: itemDescWithLineBreaks,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
              {o["section-slug"] == "section-4" && (
                <div>
                  <div className="flex md:flex-col md:gap-3">
                    {rooms &&
                      rooms.map((item, index) => {
                        return (
                          <div key={index}>
                            <div className="w-full pl-0 pr-0 flex relative">
                              <img src={item.image} alt="" />
                              <div className="absolute text-white left-4 bottom-6">
                                {index === 0 && (
                                  <h1>
                                    {t("box1mini").split("<br>").join("")}
                                  </h1>
                                )}

                                {index === 3 && (
                                  <h1>
                                    {t("box4mini").split("<br>").join("")}
                                  </h1>
                                )}

                                {index === 0 && (
                                  <p className="text-2xl">
                                    {t("box1").split("<br>").join("")}
                                  </p>
                                )}
                                {index === 1 && (
                                  <p className="text-2xl">
                                    {t("box2").split("<br>").join("")}
                                  </p>
                                )}
                                {index === 2 && (
                                  <p className="text-2xl">
                                    {t("box3").split("<br>").join("")}
                                  </p>
                                )}
                                {index === 3 && (
                                  <p className="text-2xl">
                                    {t("box4").split("<br>").join("")}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {selection === 1 && (
        <div className="mt-24 mb-16">
          <div className="pl-48 md:pl-4 md:pr-4 pr-48 w-full flex flex-col items-center mb-16">
            <div className="flex flex-wrap items-center justify-center gap-12 mt-24">
              {globalData &&
                globalData.graduates.map((item, index) => {
                  return (
                    <div
                      className="flex flex-col items-center w-1/5 md:w-1/2"
                      key={index}
                    >
                      <img
                        className="w-36 h-36 rounded-full object-cover"
                        src={item.image}
                      />
                      <h1 className="text-2xl font-bold text-[#0B2538]">
                        {item.name_surname}
                      </h1>
                      <span className="text-[#B5BEC4] ">{item.school}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
      {selection === 3 && (
        <div className="pl-48 md:pl-0 md:pr-0 pr-48 md:mt-0 mt-32">
          <div className="flex md:hidden  w-full p-8">
            <div className="w-1/3 pl-8">Program</div>
            <div className="w-1/3 pl-8">Organizasyonlar</div>
            <div className="w-[16%] pl-8">Program Ücreti</div>
            <div className="w-[16%] pl-8">Ödeme Paketi</div>
          </div>
          <div className="w-full px-16 py-24 flex md:flex-col bg-[#fff1dc]">
            <div className="w-1/3 md:w-full md:mb-12 md:pl-0 pl-8">
              <ul className="border-r-4 md:border-none  text-[#677b86] text-lg border-white">
                <li>Mentorluk</li>
                <li>Lider Gelişim Programları</li>
                <li>Know Self Seansları</li>
                <li>Know How Seansları</li>
                <li>Canlı Yayınlar</li>
              </ul>
            </div>
            <div className="w-1/3 md:w-full  md:pl-0 pl-8">
              <ul className="border-r-4 text-[#677b86] md:border-none text-lg border-white">
                <li>101 & Sosyal İnovasyon Kampı</li>
                <li>201 Bootcamp</li>
                <li>Bilim Seansları</li>
                <li>YGA Zirvesi</li>
                <li>YGA Mezuniyeti</li>
              </ul>
            </div>
            <div className="w-[16%] md:w-full text-2xl pl-8 md:pl-0 md:mt-8 border-r-4 md:border-none border-white flex md:justify-start items-center justify-center text-[#FD8204]">
              <span className="text-xs text-[#677b86] pr-4">
                Program Ücreti:
              </span>
              <h1>$3000</h1>
            </div>
            <div className="w-[16%] md:w-full  md:pl-0 pl-8 text-xs md:mt-8 text-[#FD8204] flex items-center md:justify-start justify-center">
              <h1>
                Global Impact High School Programı ile ilgilenen velilerimizin
                ödeme paketleri hakkında Program Koordinatörü Elif Girgin
                Harmancı’ya mail atmalarını rica ederiz:{" "}
                <a href="mailto:elif@ygauk.org">elif@ygauk.org</a>
              </h1>
            </div>
          </div>
          <div className="flex flex-col mt-8 text-[#0a2639] gap-3">
            <h1>
              *Organizasyonlarda konaklama ve yemek ücreti YGA tarafından
              karşılanır. Şehir içi ve şehir dışı ulaşım katılımcılarımıza
              aittir.​
            </h1>
            <h1>
              ** Global Impact High School Programı'nda ihtiyaç bursu ile okuyan
              öğrencilere program bursu sağlanmaktadır. Programa giren
              öğrencilerin 1/3'ü burslu programa olarak dahil olur. Özel
              okullardaki başarı bursu burs kapsamına dahil değildir. Burslu
              başvurmak isteyen öğrenciler başvuru formundan burslu adımını
              seçerek başvurusunu tamamlayabilir.
            </h1>
          </div>
        </div>
      )}
      <div className="director md:pl-4 md:pr-4 pl-48 pr-48 mt-16 flex">
        {globalData &&
          globalData.director.map((item, index) => {
            return (
              <div
                key={index}
                className="flex md:flex-col-reverse items-center w-full"
              >
                <div className="w-1/2 md:w-full flex flex-col">
                  <img
                    className="w-36 md:w-32 object-cover"
                    src={item.image}
                    alt={item.item_alt_title}
                  />
                  <h1 className="text-2xl text-white">{item.name_surname}</h1>
                  <span className="text-white">{item.director_title}</span>
                  <a className="text-[#FD8204] text-lg mt-5" href={item.email}>
                    E-posta Gönder
                  </a>
                </div>
                <div className="w-1/2 md:w-full flex gap-2 flex-col">
                  <h1 className="text-5xl md:text-3xl font-bold text-white">
                    {item.title}
                  </h1>
                  <h1 className="text-xl text-white">{item.desc}</h1>
                </div>
              </div>
            );
          })}
      </div>
    </Loading>
  );
};

export default globalimpacthighschool;
