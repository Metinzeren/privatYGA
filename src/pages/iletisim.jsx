import { contactAdress, postContact } from "@/API/helper";
import Loading from "@/components/Loading";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const iletisim = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });
  const [status, setStatus] = useState({});
  //kanka loading var da çok kısa sürüyor nerde
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [adress, setAdress] = useState(null);
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  // dur burdan niye kayit ol sayfasını görüyor anlamadım hata orda ama niye buraya gelince onu söylüyor  bence buraya özewl değil rasgele sayfada oluyor nereye denk gelirse gibi geliyor bana
  useEffect(() => {
    const fetchContactAdress = async () => {
      setIsLoading(true);
      await contactAdress()
        .then((res) => {
          setAdress(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    };
    fetchContactAdress();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await postContact(formData);
      if (response) {
        setStatus(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Loading loading={isLoading}>
      <Head>
        <title>YGA - İletişim</title>
        <meta name="description" content="YGA İletişim" />
      </Head>
      <div className="w-full relative">
        <img
          className="w-full md:h-screen object-cover"
          src="https://yga.org.tr/cms/images/pages/contact-bg.jpg"
          alt=""
        />
        <div className="absolute md:left-0 top-96 left-48">
          <div className="text-white md:pl-4 md:pr-4 flex flex-col gap-2 w-[600px] md:w-full">
            <h1 className="text-6xl font-bold md:text-3xl">{t("cform")}</h1>
          </div>
        </div>
      </div>
      <div className="pl-48 md:pl-4 md:pr-4 pr-48 w-full md:gap-12 mt-16 mb-16 md:flex-col flex">
        <div className="w-1/2 md:w-full md:max-h-auto max-h-[500px] overflow-y-auto flex flex-col gap-12">
          <h1 className="text-4xl text-[#FD8204] font-bold">{t("offices")}</h1>
          {adress &&
            adress.map((item, index) => {
              const itemDescWithLineBreaks = item.desc.replace(
                /<br\s*\/?>/g,
                "<br/>"
              );
              return (
                <div key={index}>
                  <div className="flex flex-col gap-5">
                    <h1 className="text-3xl">{item.title}</h1>
                    <div
                      className="font-light"
                      dangerouslySetInnerHTML={{
                        __html: itemDescWithLineBreaks,
                      }}
                    />
                    <div>
                      <a
                        target="_blank"
                        className="px-12 py-4 bg-orange-400 text-base text-white rounded-md"
                        href={item.link}
                      >
                        {t("smap")}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="w-1/2 md:w-full flex flex-col pl-4 md:pr-4 gap-12">
          <h1 className="text-4xl text-[#FD8204] font-bold">{t("cform")}</h1>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">{t("summitPreNameSurname")}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t("summitPreEmail")}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">{t("summitPrePhone")}</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t("message")}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="form-group flex items-center">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={formData.consent}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="consent">
                Kişisel verilerin korunması ve işlemesine ilişkin politikayı
                okudum onaylıyorum.
              </label>
            </div>
            <div className="mt-4">
              <button
                className="px-12 py-4 bg-orange-400 text-base text-white rounded-md"
                type="submit"
              >
                {t("gonder")}
              </button>
            </div>
          </form>
          {status && status.success ? (
            <h1 className="text-lg text-black font-light">
              {status && status.message}
            </h1>
          ) : (
            <h1 className="text-lg text-black font-light">
              {status && status.message}
            </h1>
          )}
        </div>
      </div>
    </Loading>
  );
};

export default iletisim;
