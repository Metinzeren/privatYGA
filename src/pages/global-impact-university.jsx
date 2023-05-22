import { getUniversity } from "@/API/helper";
import React, { useEffect, useRef, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Dropdown } from "primereact/dropdown";
import Loading from "@/components/Loading";
import { useTranslation } from "next-i18next";
import Head from "next/head";

const Globalimpactuniversity = () => {
  const [uniData, setUniData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const selectionOptions = [
    {
      id: 1,
      button: t("tab1"),
      label: [
        "section-1",
        "section-2",
        "section-3",
        "section-4",
        "section-5",
        "section-6",
        "section-7",
        "section-8",
      ],
    },
    {
      id: 2,
      button: t("tab3"),
      label: ["sikca-sorulan-sorular-section-1"],
    },
  ];
  const [selection, setSelection] = useState(1);
  useEffect(() => {
    const fetchUniversity = async () => {
      setIsLoading(true);
      await getUniversity()
        .then((res) => {
          setUniData(res.data.detail);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchUniversity();
  }, []);
  const obj = uniData && JSON.parse(uniData.content);
  const ref = useRef(null);
  const filterPageBySectionSlug = (sectionSlug) => {
    var _vFindTab = selectionOptions.find((y) => y.id === sectionSlug);
    if (_vFindTab !== null) {
      return obj?.page?.filter((o) =>
        _vFindTab.label.includes(o["section-slug"])
      );
    }
  };
  const FaqPage = ({ faq }) => {
    return (
      <div className="pl-48 md:pl-4 md:pr-4 pr-48 md:mb-16 mt-16">
        <div className="flex flex-col gap-5">
          <h1 className="text-black font-bold text-5xl md:texh-4xl">
            {t("faqTitle").split("<br>").join("")}
          </h1>
          <div>
            <a
              className="px-12 py-4 bg-orange-400 text-base text-white rounded-md"
              href="/"
            >
              {t("howtob")}
            </a>
          </div>
        </div>
        <div className="w-full md:flex-col flex">
          <div className="w-1/3 md:hidden"></div>
          <div className="w-2/3 md:w-full mt-8">
            {faq &&
              faq.map((item, index) => {
                const itemDescWithLineBreaks = item.answer.replace(
                  /<br\s*\/?>/g,
                  "<br/>"
                );
                return (
                  <div key={index}>
                    <Accordion activeIndex={1}>
                      <AccordionTab
                        style={{ fontSize: "25px", color: "black" }}
                        header={item.question}
                      >
                        <div
                          className="font-light text-base"
                          dangerouslySetInnerHTML={{
                            __html: itemDescWithLineBreaks,
                          }}
                        />
                      </AccordionTab>
                    </Accordion>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  };
  const itemDescWithLineBreaks =
    uniData && uniData.title.replace(/<br\s*\/?>/g, "<br/>");
  return (
    <Loading loading={isLoading}>
      <Head>
        <title>{uniData && uniData.meta_title}</title>
        <meta name="description" content={uniData && uniData.meta_desc} />
      </Head>
      {uniData && (
        <div className="w-full relative">
          <img
            className="w-full md:h-screen object-cover"
            src={uniData.image_background}
            alt=""
          />
          <div className="absolute  md:top-64 md:left-0 top-96 left-48">
            <div className="text-white md:pl-4 md:pr-4 flex flex-col gap-2 w-[600px] md:w-full">
              <h1 className="text-4xl md:text-2xl">{t("ygaprogramlari")}</h1>
              <div
                className="text-6xl md:text-3xl font-bold"
                dangerouslySetInnerHTML={{
                  __html: itemDescWithLineBreaks,
                }}
              />
              <p className="mt-8 md:text-base text-2xl">{uniData.desc}</p>
            </div>
            <div className="mt-40 md:hidden bg-white p-7 flex items-center rounded-2xl gap-6">
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
      {filterPageBySectionSlug(selection)?.map((o, i) => {
        const findOption = selectionOptions.find((y) => y.id === selection);
        return (
          <div key={i}>
            {o["section-slug"] == "section-7" && (
              <div className="pl-48 pr-48 flex items-center justify-center mt-36">
                <h1 className="text-4xl text-[#FD8204] text-center font-bold">
                  {t("yetkinliks")}
                </h1>
              </div>
            )}
            <div className="middle">
              <div id={"uni" + findOption.label[i]}>
                <div
                  className=""
                  ref={ref}
                  dangerouslySetInnerHTML={{ __html: o.content }}
                />
              </div>
            </div>
          </div>
        );
      })}
      {selection === 2 && <FaqPage faq={uniData.faq} />}
      <div className="director md:pl-4 md:pr-4 md:flex-col pl-48 pr-48 mt-16 flex">
        {uniData &&
          uniData.director.map((item, index) => {
            return (
              <div
                key={index}
                className="flex md:flex-col md:pt-16 items-center w-full"
              >
                <div className="w-1/2 md:w-full flex flex-col">
                  <img
                    className="w-36 object-cover rounded-full"
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
                  <h1 className="text-5xl font-bold text-white">
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

export default Globalimpactuniversity;
