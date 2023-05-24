import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "next-i18next";
import { removeBlank } from "@/utils/helper";
import { useRouter } from "next/router";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { getUniSections, getUniversities, postFormData } from "@/API/helper";

const KayıtOl = ({ name }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const registerTranslate = removeBlank(t("programkyt"));
  const nameTranslate = removeBlank(t("studentName"));
  const schoolTranslate = removeBlank(t("schoolName"));
  const studentEmailTranslate = removeBlank(t("studentMail"));
  const studentPhoneTranslate = removeBlank(t("studentTel"));
  const studentBirthTranslate = removeBlank(t("ogrencidt"));
  //   1.modal stateleri
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [selectedOption, setSelectedOption] = useState(null);
  const [secondOption, setSecondOption] = useState(null);
  const [classOption, setClassOption] = useState(null);
  const [isSecondDropdownVisible, setIsSecondDropdownVisible] = useState(false);
  const options = [{ label: t("uni"), value: t("uni") }];
  const options1 = [
    {
      label: "Birbirini Geliştiren Kadınlar",
      value: "Birbirini geliştiren Kadınlar",
    },
  ];

  const option2 = [
    {
      label: t("hazirl"),
      value: t("hazirl"),
    },
    {
      label: "1. sınıf",
      value: "1_sınıf",
    },
    {
      label: "2. sınıf",
      value: "2_sınıf",
    },
  ];
  const onOptionSelected = (event) => {
    setSelectedOption(event.value);
    setIsSecondDropdownVisible(true);
  };
  const onProgramSelected = (event) => {
    setSecondOption(event.value);
  };
  const onClassSelected = (event) => {
    setClassOption(event.value);
  };
  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };
  //  1.modal stateleri

  //   2.modal stateleri
  const [visible2, setVisible2] = useState(false);
  const [position2, setPosition2] = useState("center");
  const [schools, setSchools] = useState(null);
  const [selectedSchools, setSelectedSchools] = useState(null);
  const [uniSections, setUniSections] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentBirth, setStudentBirth] = useState("");
  const [whereHear, setWhereHear] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [kvkkCheck, setKvkkCheck] = useState(false);
  const genderSection = [
    {
      label: t("kiz"),
      value: t("kiz"),
    },
    {
      label: t("erkk"),
      value: t("erkk"),
    },
    {
      label: t("other"),
      value: t("other"),
    },
    {
      label: t("notwant"),
      value: t("notwant"),
    },
  ];
  const cities = [
    { label: "Adana", value: "Adana" },
    { label: "Adıyaman", value: "Adıyaman" },
    { label: "Afyonkarahisar", value: "Afyonkarahisar" },
    { label: "Ağrı", value: "Ağrı" },
    { label: "Amasya", value: "Amasya" },
    { label: "Ankara", value: "Ankara" },
    { label: "Antalya", value: "Antalya" },
    { label: "Artvin", value: "Artvin" },
    { label: "Aydın", value: "Aydın" },
    { label: "Balıkesir", value: "Balıkesir" },
    { label: "Bilecik", value: "Bilecik" },
    { label: "Bingöl", value: "Bingöl" },
    { label: "Bitlis", value: "Bitlis" },
    { label: "Bolu", value: "Bolu" },
    { label: "Burdur", value: "Burdur" },
    { label: "Bursa", value: "Bursa" },
    { label: "Çanakkale", value: "Çanakkale" },
    { label: "Çankırı", value: "Çankırı" },
    { label: "Çorum", value: "Çorum" },
    { label: "Denizli", value: "Denizli" },
    { label: "Diyarbakır", value: "Diyarbakır" },
    { label: "Edirne", value: "Edirne" },
    { label: "Elazığ", value: "Elazığ" },
    { label: "Erzincan", value: "Erzincan" },
    { label: "Erzurum", value: "Erzurum" },
    { label: "Eskişehir", value: "Eskişehir" },
    { label: "Gaziantep", value: "Gaziantep" },
    { label: "Giresun", value: "Giresun" },
    { label: "Gümüşhane", value: "Gümüşhane" },
    { label: "Hakkâri", value: "Hakkâri" },
    { label: "Hatay", value: "Hatay" },
    { label: "Isparta", value: "Isparta" },
    { label: "Mersin", value: "Mersin" },
    { label: "İstanbul", value: "İstanbul" },
    { label: "İzmir", value: "İzmir" },
    { label: "Kars", value: "Kars" },
    { label: "Kastamonu", value: "Kastamonu" },
    { label: "Kayseri", value: "Kayseri" },
    { label: "Kırklareli", value: "Kırklareli" },
    { label: "Kırşehir", value: "Kırşehir" },
    { label: "Kocaeli", value: "Kocaeli" },
    { label: "Konya", value: "Konya" },
    { label: "Kütahya", value: "Kütahya" },
    { label: "Malatya", value: "Malatya" },
    { label: "Manisa", value: "Manisa" },
    { label: "Kahramanmaraş", value: "Kahramanmaraş" },
    { label: "Mardin", value: "Mardin" },
    { label: "Muğla", value: "Muğla" },
    { label: "Muş", value: "Muş" },
    { label: "Nevşehir", value: "Nevşehir" },
    { label: "Niğde", value: "Niğde" },
    { label: "Ordu", value: "Ordu" },
    { label: "Rize", value: "Rize" },
    { label: "Sakarya", value: "Sakarya" },
    { label: "Samsun", value: "Samsun" },
    { label: "Siirt", value: "Siirt" },
    { label: "Sinop", value: "Sinop" },
    { label: "Sivas", value: "Sivas" },
    { label: "Tekirdağ", value: "Tekirdağ" },
    { label: "Tokat", value: "Tokat" },
    { label: "Trabzon", value: "Trabzon" },
    { label: "Tunceli", value: "Tunceli" },
    { label: "Şanlıurfa", value: "Şanlıurfa" },
    { label: "Uşak", value: "Uşak" },
    { label: "Van", value: "Van" },
    { label: "Yozgat", value: "Yozgat" },
    { label: "Zonguldak", value: "Zonguldak" },
    { label: "Aksaray", value: "Aksaray" },
    { label: "Bayburt", value: "Bayburt" },
    { label: "Karaman", value: "Karaman" },
    { label: "Kırıkkale", value: "Kırıkkale" },
    { label: "Batman", value: "Batman" },
    { label: "Şırnak", value: "Şırnak" },
    { label: "Bartın", value: "Bartın" },
    { label: "Ardahan", value: "Ardahan" },
    { label: "Iğdır", value: "Iğdır" },
    { label: "Yalova", value: "Yalova" },
    { label: "Karabük", value: "Karabük" },
    { label: "Kilis", value: "Kilis" },
    { label: "Osmaniye", value: "Osmaniye" },
    { label: "Düzce", value: "Düzce" },
  ];
  // 2.modal stateleri

  //3.modal stateleri
  const [visible3, setVisible3] = useState(false);
  const [position3, setPosition3] = useState("center");

  //3.modal stateleri
  const onCitySelected = (event) => {
    setSelectedCity(event.value);
  };
  const show2 = (position2) => {
    setPosition2(position2);
    setVisible2(true);
  };

  // 2. modal istekleri//
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res1 = await getUniSections();
    setUniSections(res1);
    const res2 = await getUniversities();
    setSchools(res2);
  };
  //2.modal istekleri//

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !studentName ||
      !selectedSchools ||
      !selectedSection ||
      !studentEmail ||
      !studentPhone ||
      !studentBirth ||
      !whereHear ||
      !selectedGender ||
      !selectedCity ||
      !kvkkCheck
    ) {
      console.log("Lütfen tüm alanları doldurun.");
      return;
    }

    const formData = {
      name_surname: studentName,
      university: selectedSchools,
      section: selectedSection,
      email: studentEmail,
      which_grade: classOption,
      city: selectedCity,
      phone: studentPhone,
      birthday: studentBirth,
      free_text: whereHear,
      gender: selectedGender,
    };

    try {
      const response = await postFormData(formData);
      if (response.status) {
        setVisible3(true);
        setTimeout(() => {
          setVisible3(false);
          setVisible2(false);
          setVisible(false);
        }, 5000); // 5000ms = 5s
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div onClick={() => show("top")}>{name}</div>
      <Dialog
        visible={visible}
        position={position}
        className="registerDialog"
        style={{
          width: "100%",
          maxHeight: "100%",
          height: "100%",
          margin: "0",
        }}
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
      >
        <div className="flex w-full">
          <div className="w-1/2  flex pl-48 pr-4 flex-col">
            <img
              className="w-24 object-contain"
              src="https://yga.org.tr/_nuxt/img/graduate.b67d559.png"
              alt=""
            />
            <div
              className="text-[#FD8204] text-4xl"
              dangerouslySetInnerHTML={{
                __html: registerTranslate,
              }}
            />
            <p>
              YGA, geleceğe umutla bakmamızı sağlayan çift kanatlı gençler
              yetiştirir.
            </p>
            <div className="flex flex-col gap-4 mt-8">
              <div className="flex flex-col gap-2">
                <span className="font-bold">Okul Seçimi</span>
                <Dropdown
                  options={options}
                  value={selectedOption}
                  onChange={onOptionSelected}
                  placeholder={t("okulpl")}
                />
              </div>

              {isSecondDropdownVisible && (
                <div className="flex flex-col gap-2">
                  <span className="font-bold">Program Seçiniz</span>
                  <Dropdown
                    placeholder={t("programpl")}
                    options={options1}
                    onChange={onProgramSelected}
                    value={secondOption}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-1/2 h-screen overflow-y-hidden bg-[#F9F7F4]">
            {isSecondDropdownVisible && (
              <div className="flex flex-col pr-12 pl-12 pt-36">
                <p className="pr-12">{t("formtxt")}</p>
                <div className="flex flex-col gap-2 mt-2">
                  <span className="font-bold">Sınıf Seçiniz</span>
                  <Dropdown
                    placeholder={t("sinifs")}
                    options={option2}
                    onChange={onClassSelected}
                    value={classOption}
                  />
                </div>
                {classOption && secondOption && selectedOption && (
                  <div className="mt-12">
                    <button
                      onClick={() => show2("top")}
                      className="px-12 py-4 bg-orange-400 text-white rounded-md"
                    >
                      Başvur
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Dialog>

      {/* İKİNCİ MODAL !!! */}

      <Dialog
        visible={visible2}
        position={setPosition2}
        className="registerDialog"
        style={{
          width: "100%",
          maxHeight: "100%",
          height: "100%",
          margin: "0",
        }}
        onHide={() => setVisible2(false)}
        draggable={false}
        resizable={false}
      >
        <div className="">
          <form
            className="pl-48 pr-48 flex gap-24 justify-center"
            onSubmit={handleSubmit}
          >
            <div className="w-1/2 flex flex-col">
              <h1 className="text-[#FD8204] text-4xl">
                Birbirini Geliştiren Kadınlar
                <br />
                Program Başvurusu
              </h1>
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex flex-col gap-2">
                  <span className="font-bold">
                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: nameTranslate,
                      }}
                    />
                  </span>
                  <InputText
                    required={true}
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-bold">
                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: schoolTranslate,
                      }}
                    />
                  </span>
                  <Dropdown
                    placeholder={t("programpl")}
                    required={true}
                    options={
                      schools &&
                      schools.map((school) => ({
                        label: school.title,
                        value: school.id,
                      }))
                    }
                    onChange={(e) => setSelectedSchools(e.value)}
                    value={selectedSchools && selectedSchools}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold">{t("bolum")}</span>
                  <Dropdown
                    placeholder={t("bolum")}
                    required={true}
                    options={
                      uniSections &&
                      uniSections.map((section) => ({
                        label: section.title,
                        value: section.id,
                      }))
                    }
                    onChange={(e) => setSelectedSection(e.value)}
                    value={selectedSection && selectedSection}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold">{t("sinif")}</span>
                  <Dropdown
                    placeholder={t("sinif")}
                    required={true}
                    options={option2}
                    onChange={onClassSelected}
                    value={classOption}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold">
                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: studentEmailTranslate,
                      }}
                    />
                  </span>
                  <InputText
                    value={studentEmail}
                    required={true}
                    type="email"
                    onChange={(e) => setStudentEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold">
                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: studentPhoneTranslate,
                      }}
                    />
                  </span>
                  <InputMask
                    value={studentPhone}
                    required={true}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    id="phone"
                    mask="(999) 999-9999"
                    placeholder="(999) 999-9999"
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2 flex flex-col">
              <h1 className="text-2xl">{t("gelecek")}</h1>
              <div className="flex flex-col gap-4 mt-11">
                <div className="flex flex-col gap-2">
                  <span className="font-bold">{t("sehir")}</span>
                  <Dropdown
                    required={true}
                    placeholder={t("sehirs")}
                    options={cities}
                    onChange={onCitySelected}
                    value={selectedCity}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-bold">{t("cinsiyet")}</span>
                  <Dropdown
                    placeholder={t("cinsiyets")}
                    required={true}
                    options={genderSection}
                    onChange={(e) => setSelectedGender(e.value)}
                    value={selectedGender}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold">
                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: studentBirthTranslate,
                      }}
                    />
                  </span>
                  <InputMask
                    value={studentBirth}
                    required={true}
                    onChange={(e) => setStudentBirth(e.target.value)}
                    mask="99/99/9999"
                    placeholder="99/99/9999"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold">{t("neredend")}</span>
                  <InputText
                    value={whereHear}
                    required={true}
                    onChange={(e) => setWhereHear(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-3">
                    <input
                      required
                      className="w-5 h-5 appearance-none rounded-md text-white border-gray-400 bg-gray-400 checked:bg-red-500 checked:border-transparent"
                      onClick={() => setKvkkCheck(true)}
                      type="checkbox"
                    />
                    <span className="flex gap-1">
                      <p
                        className="decoration underline"
                        onClick={() => router.push("/kvkk")}
                      >
                        {t("kvkktext")}
                      </p>
                      {t("kvkktext2")}
                    </span>
                  </div>
                  <div className="flex justify-end mt-8">
                    <button
                      type="submit"
                      className="px-12 md:px-10 py-4 bg-orange-400 text-white rounded-md"
                    >
                      {t("hemenBasvur")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Dialog>

      {/* İKİNCİ MODAL */}

      {/* başarılı modal */}
      <Dialog
        visible={visible3}
        position={position3}
        className="registerDialog"
        style={{
          width: "100%",
          maxHeight: "100%",
          height: "100%",
          margin: "0",
        }}
        onHide={() => setVisible3(false)}
        draggable={false}
        resizable={false}
      >
        <div className="flex flex-col gap-4 pl-48 pr-48 mt-48">
          <h1 className="text-3xl text-black font-light">
            {t("ygaprogramlari")}
          </h1>
          <h1 className="text-5xl text-[#FD8204] font-bold">
            Birbirini Geliştiren <br />
            Kadınlar
          </h1>
          <p className="text-2xl font-light text-black">{t("successtext")}</p>
          <div>
            <button
              className="text-2xl decoration underline font-light"
              onClick={() => router.push("/")}
            >
              {t("anasayfayagit")}
            </button>
          </div>
        </div>
      </Dialog>

      {/* başarılı modal */}
    </div>
  );
};

export default KayıtOl;
