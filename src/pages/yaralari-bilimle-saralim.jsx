import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css";
import { earthquakeData, earthquakeImageData } from "@/utils/data";
import Head from "next/head";
const earthquake = () => {
  return (
    <div>
      <Head>
        <title>
          Çocukların Görünmeyen Yaralarını, Vicdanlı Bilimle Saralım
        </title>
        <meta
          name="description"
          content="Çocukların Görünmeyen Yaralarını, Vicdanlı Bilimle Saralım"
        />
      </Head>
      <div className="w-full relative">
        <img
          src="https://yga.org.tr/_nuxt/img/header-bg-overlay-min.656d9ac.jpg"
          alt="image"
        />
        <div className="absolute top-96 left-48">
          <div className="text-white">
            <h1 className="text-6xl font-bold">
              Çocukların Görünmeyen Yaralarını,
              <br /> Vicdanlı Bilimle Saralım
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col pl-48 pr-48 gap-5 text-xl mt-16 mb-16 text-[#122B3E] font-light justify-center items-center">
        <p className="font-light text-center">
          6-7 Şubat 2023 tarihlerinde gerçekleşen depremlerden
          <strong className="font-extrabold"> 11 </strong>
          ilimizde <strong className="font-extrabold">4.6 milyon</strong> çocuk
          etkilendi. çocuk etkilendi. Okullar ve diğer eğitim altyapılarında
          meydana gelen geniş çaplı zararlar nedeniyle çocukların eğitimleri ve
          gelişimleri sekteye uğradı. YGA olarak bu ulusal felakette, tecrübemiz
          doğrultusunda en çok katkı sağlayabileceğimiz alanları tespit ederek
          barınma ve temel gereksinimleri sağlanmış çocukların,
          <strong className="font-extrabold"> oyunla öğrenme </strong>
          üzerinden sosyal ve bilişsel olarak desteklenmelerine odaklandık.
        </p>
        <p className="font-light">
          Deprem sonrasında belirsizlik, güvensizlik, içe kapanıklık ve
          karamsarlık ile mücadele eden çocuklarda, görünen yaraların dışında
          görünmeyen yaralar da oluştu. Çocukların dış dünyayı keşfe, olayları
          anlamlandırmaya başladıkları bu yaşlarda; onlara hayatları boyunca
          tutunabilecekleri güçlü bir dal vermek çok önemli.
        </p>
        <a
          className="px-12 py-4 bg-orange-400 text-base text-white font-bold rounded-md"
          href="/"
        >
          Bağış için tıklayın
        </a>
      </div>
      <div className="pl-48 pr-48 w-full flex items-center">
        <div className="w-1/2 p-4 pr-24">
          <img
            className="w-full "
            src="https://yga.org.tr/cms/images/projects/bilim2.png"
            alt=""
          />
        </div>
        <div className="w-1/2 flex flex-col pl-16 text-[#0B2538] gap-6">
          <p className="tracking-wide text-xl font-light">
            Çocuklarda kontrol ve güven duygusunu yeniden inşa etmenin en
            verimli yollarından biri
            <strong className="font-extrabold">oyunla öğrenme</strong>
          </p>
          <p className="text-xl font-light">
            Çocuklarda kontrol ve güven duygusunu yeniden inşa etmenin en
            verimli yollarından biri
            <strong className="font-extrabold"> uzman psikologlar </strong> ve
            <strong className="font-extrabold"> bilim insanlarından </strong>
            alınan eğitimler ile bilim atölyelerini ve içeriklerini, depremden
            etkilenen çocukların ihtiyaçlarına uygun olarak yeniledik ve
            geliştirdik.
          </p>
          <p className="text-xl font-light">
            Bilim atölyeleri, çocuklara elleriyle geliştirebilecekleri projeler
            üretme fırsatı veriyor. Sorunlarla başa çıkma becerilerini, problem
            çözme yetilerini ve özgüvenlerini geliştiriyor. Atölye sonrası
            <strong className="font-extrabold">dijital entegrasyon</strong>
            ile çocukların gelişimi destekleniyor.
          </p>
        </div>
      </div>
      <div className="pl-48 pr-48 w-full flex items-center">
        <div className="w-1/2 flex flex-col text-[#0B2538] gap-6">
          <h1 className="text-5xl font-bold">Hedefimiz</h1>
          <div className="flex flex-col pr-12">
            <p className="tracking-wide text-xl font-light">
              Depremden etkilenen{" "}
              <strong className="font-extrabold">10-12 yaş</strong> aralığındaki
              1.1 Milyon çocuğu vicdanlı bilimle buluşturmak
            </p>
          </div>
        </div>
        <div className="w-1/2 p-24">
          <img
            className="w-full "
            src="https://yga.org.tr/cms/images/pages/about-us-1.png"
            alt=""
          />
        </div>
      </div>

      <div className="pl-48 pr-48 w-full mt-16 mb-16 flex ">
        <div className="w-1/2 p-4 pr-24">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/c2E6hlTIe6g"
          ></iframe>
        </div>
        <div className="w-1/2 flex flex-col pl-16 text-[#0B2538] gap-6">
          <h1 className="text-5xl font-bold">
            Deprem Bölgelerinde Neler Yapıyoruz
          </h1>
          <div className="flex flex-col">
            <ul className="list-disc text-xl flex flex-col gap-4 font-light">
              <li>
                Pasif değil <strong className="font-extrabold">aktif</strong>
                bir şekilde dahil olabilcekleri bilim atölyeleri yapıyoruz.
              </li>
              <li>
                Sahada olan kurumlar, YGA mezunları, gönüllüleri ve şirket
                gönüllüleri ile bilim atölyelerinin
                <strong className="font-extrabold">
                  {" "}
                  sürdürülebilirliğini{" "}
                </strong>
                sağlıyoruz
              </li>
              <li>
                <strong className="font-extrabold">
                  Prof. Acar Baltaş, Prof. Mehmet Toner
                </strong>
                gibi konusunda uzman bilim insanı ve psikologlar ile sahaya özel
                moderasyon eğitimleri hazırladık. Tüm gönüllülerin eğitim saha
                öncesinde gerçekleştiriyoruz.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex mt-16 mb-16">
        {earthquakeImageData?.map((item, index) => {
          return (
            <div className="relative text-white" key={index}>
              <img src={item.image} alt="" className="w-full object-contain" />
              <h1 className="absolute top-3 text-2xl left-3">{item.title}</h1>
              <p className="absolute bottom-3 left-3 text-lg">{item.desc}</p>
            </div>
          );
        })}
      </div>
      <div className="pl-48 pr-48 w-full flex items-center">
        <div className="w-1/2 flex flex-col pl-16 text-[#0B2538] gap-6">
          <h1 className="text-5xl font-bold">
            Bilim Atölyeleri, Çocuklara Ne kazandırıyor?
          </h1>
          <div className="flex flex-col">
            <ul className="list-disc text-xl flex flex-col gap-4 font-light">
              <li>
                Depremden etkilenmiş birincil ihtiyaçları karşılanmış çocukların{" "}
                <strong className="font-extrabold">iyi olma</strong> haline
                destek olur
              </li>
              <li>
                Çocuklarda,
                <strong className="font-extrabold"> post travma </strong>
                döneminde, stresin etkilerini azalır; belirsizlikle baş edebilme
                becerileri gelişir.
              </li>
              <li>
                Çocuklarda,
                <strong className="font-extrabold"> Merak Duygusunu </strong>
                tetiklenir
              </li>
              <li>
                Çocuklar gelceğe{" "}
                <strong className="font-extrabold">umutla </strong>
                bakar
              </li>
            </ul>
          </div>
        </div>
        <div className="w-1/2 p-4 pr-24">
          <img
            className="w-full "
            src="https://yga.org.tr/cms/images/projects/bilim2.png"
            alt=""
          />
        </div>
      </div>
      <div className="pl-48 pr-48 w-ful mt-36">
        <div className="flex items-center justify-center">
          <h1 className="items-center text-4xl text-[#FD8204] mb-12">
            Projenin sürdürülebilirliğini Nasıl Sağlıyoruz?
          </h1>
        </div>
        <div className="sliderBg mb-16">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            loop={true}
            scrollbar={{ draggable: true }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            spaceBetween={50}
            slidesPerView={1}
          >
            {earthquakeData?.map((item, index) => (
              <SwiperSlide className="w-full" key={index}>
                <div className="relative flex">
                  <div className="w-1/2 flex p-20 flex-col">
                    <h1 className="mb-16 text-4xl font-bold">{item.title}</h1>
                    <p className="text-xl font-light text-[#0B2538]">
                      {item.desc}
                    </p>
                  </div>
                  <div className="w-1/2 p-24">
                    {" "}
                    <img
                      className="w-full  object-cover"
                      src={item.image}
                      alt={`Slide ${index}`}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
            {/* <div className="swiper-button-prev md:hidden">
            <i
              className="pi pi-angle-left bg-[#52B846] cursor-pointer text-white rounded-full p-3"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>
          <div className="swiper-button-next md:hidden">
            <i
              className="pi pi-angle-right bg-[#52B846] text-white  rounded-full p-3"
              style={{ fontSize: "2rem" }}
            ></i>
          </div> */}
          </Swiper>
        </div>
      </div>
      <div className="flex flex-col pl-48 pr-48 gap-5 text-xl mt-16 mb-16 text-[#122B3E] font-light justify-center items-center">
        <p className="font-light text-center">
          6-7 Şubat 2023 tarihlerinde gerçekleşen depremlerden
          <strong className="font-extrabold"> 11 </strong>
          ilimizde <strong className="font-extrabold">4.6 milyon</strong> çocuk
          etkilendi. çocuk etkilendi. Okullar ve diğer eğitim altyapılarında
          meydana gelen geniş çaplı zararlar nedeniyle çocukların eğitimleri ve
          gelişimleri sekteye uğradı. YGA olarak bu ulusal felakette, tecrübemiz
          doğrultusunda en çok katkı sağlayabileceğimiz alanları tespit ederek
          barınma ve temel gereksinimleri sağlanmış çocukların,
          <strong className="font-extrabold"> oyunla öğrenme </strong>
          üzerinden sosyal ve bilişsel olarak desteklenmelerine odaklandık.
        </p>
        <p className="font-light">
          Deprem sonrasında belirsizlik, güvensizlik, içe kapanıklık ve
          karamsarlık ile mücadele eden çocuklarda, görünen yaraların dışında
          görünmeyen yaralar da oluştu. Çocukların dış dünyayı keşfe, olayları
          anlamlandırmaya başladıkları bu yaşlarda; onlara hayatları boyunca
          tutunabilecekleri güçlü bir dal vermek çok önemli.
        </p>
        <img src="https://yga.org.tr/img/ipsos.png" alt="" className="w-48" />
      </div>
      <div className="pl-48 pr-48 flex flex-col items-center mb-16">
        <h1 className="text-[#FD8204] mb-12 text-4xl">
          NASIL DESTEK OLABİLİRİM
        </h1>
        <div className="flex gap-12 mb-12">
          <div className="flex flex-col">
            <h1 className="text-3xl">TL Bağış</h1>
            <p className="font-light">
              Hesap adı: Hayal Ortakları Derneği <br /> TR71 0006 4000 0011 2260
              4303 74 <br /> Açıklama: Bilim Atölyesi
            </p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl">USD Bağış</h1>
            <p className="font-light">
              Hesap adı: Hayal Ortakları Derneği <br /> TR71 0006 4000 0011 2260
              4303 74 <br /> Açıklama: Bilim Atölyesi
            </p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl">EURO Bağış</h1>
            <p className="font-light">
              Hesap adı: Hayal Ortakları Derneği <br /> TR71 0006 4000 0011 2260
              4303 74 <br /> Açıklama: Bilim Atölyesi
            </p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl">GBP Bağış</h1>
            <p className="font-light">
              Hesap adı: Hayal Ortakları Derneği <br /> TR71 0006 4000 0011 2260
              4303 74 <br /> Açıklama: Bilim Atölyesi <br />
            </p>
          </div>
        </div>
      </div>
      <div className="pl-48 pr-48 flex flex-col gap-5 mb-16">
        <h1 className="text-3xl">Kredi Kartı ile Online Bağış:</h1>
        <div className="flex gap-3 font-bold">
          <a href="" className="border-r-2 font-light border-[#122B3E] pr-2">
            Depremzede Çocukların Yaralarını Bilimle Saralım!
          </a>
          <a href="" className="border-r-2 font-light border-[#122B3E] pr-2">
            YGA
          </a>
          <a href="">Fonzip</a>
        </div>
        <p>
          Bilim Gönüllüsü olmak için{" "}
          <a className="font-bold" href="">
            didem.cevik@yga.org.tr
          </a>
          (Didem Çevik, Bilim Seferberliği Proje Lideri) adresine e-posta atarak
          iletişime geçebilirsiniz.
        </p>
        <h1 className="text-3xl">Kurumsal Bağış ve Destek:</h1>
        <p>
          Kurumsal iş birlikleri, bağışlar ve fonlar için{" "}
          <a href="" className="font-bold">
            {" "}
            ahmet.tonel@yga.{" "}
          </a>{" "}
          (Ahmet Tonel, Kaynak Geliştirme Direktörü) adresine e-posta atarak
          iletişime geçebilirsiniz.
        </p>
      </div>
    </div>
  );
};

export default earthquake;
