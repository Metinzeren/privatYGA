import { getCookie } from "@/utils/common";
import axios from "axios";

export default function api() {
  const _vLang = getCookie("NEXT_LOCALE");
  return axios.create({
    baseURL: "https://yga.org.tr/cms/api/v1/" + _vLang,
    headers: {
      Accept: "application/json",
    },
  });
}

// export const getBannerImage = async () => await api().get("/slider");

// export const getStrategic = async () => await api().get("/summit-strategic");

// export const getHomePage = async () => await api().get("/page/homepage");

// export const contactAdress = async () => await api().get("/contact-addresses");

// export const dreamPartner = async () => await api().get("/dream-partners");

// export const getProjects = async () =>
//   await api().get("/project/bilimseferberligi");

// export const getProjectsWewalk = async () =>
//   await api().get("/project/we-walk");

// export const getProjectsPiri = async () => await api().get("/project/piri");

// export const getProjectsPoilabs = async () =>
//   await api().get("/project/poilabs");

// export const getProjectsTwin = async () => await api().get("/project/twin");

// export const getProjectsUpschool = async () =>
//   await api().get("/project/up-school");

// export const getGlobalHigh = async () =>
//   await api().get("/program/global-impact-high-school");

// export const getPrograms = async () => await api().get("/programs");

// export const getKvkkPage = async () => await api().get("/page/kvkk");

// export const getKvkkPdf = async () => await api().get("/kvkk-pdf");

// export const getAwards = async () => await api().get("/awards");

// export const getAllProjects = async () => await api().get("/projects");

// export const getEarthShotPage = async () =>
//   await api().get("/page/earthshot-prize");

// export const getOfficeTeam = async () => await api().get("/office-team");

// export const getGraduates = async () => await api().get("/graduates");

// export const getEntrepreneurs = async () => await api().get("/entrepreneurs");

// export const getAbout = async () => await api().get("/page/about-us");

// export const getActivityReports = async () =>
//   await api().get("/activity-reports");

// export const getFinancials = async () => await api().get("/page/financials");

// export const getCollaborations = async () =>
//   await api().get("/page/international-collaborations");

// export const getPartnerStudent = async () =>
//   await api().get("/partnership-student");

// export const getComments = async () => await api().get("/comments");

// export const getEartshotSlider = async () =>
//   await api().get("/earthshot-prize");

// export const getAdvistory = async () => await api().get("/advisory-board");

// export const getPeakSlider = async () => await api().get("/summit-slider");

// export const getSummit = async () => await api().get("/page/summit");

// export const getSummitSpeaker = async () => await api().get("/speaker");

// export const getPioneers = async () =>
//   await api().get("/program/global-impact-pioneers");

// export const getEmpWoman = async () =>
//   await api().get("/program/the-program-of-women-empowering-each-other");

// export const getMeetUs = async () => api().get("/program/bilimle-bulus");

// export const getMiddleSchool = async () =>
//   await api().get("/program/global-impact-middle-school");

// export const getUniversity = async () =>
//   await api().get("/program/global-impact-university");

// export const getAlmuni = async () =>
//   await api().get("/program/alumni-toplulugu");

// export const getVideos = async () => await api().get("/videos");

export const getUniversities = async () => {
  const response = await axios.get(
    "https://yga.org.tr/cms/api/v1/universities"
  );
  return response.data;
};

export const getUniSections = async () => {
  const response = await axios.get("https://yga.org.tr/cms/api/v1/sections");
  return response.data;
};

export const postFormData = async (formData) => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type":
        "multipart/form-data; boundary=---011000010111000001101001",
    },
    data: formData,
  };

  const response = await axios(
    "https://yga.org.tr/cms/api/v1/form/wdeo/save",
    options
  );
  return response.data;
};
export const postEmailData = async (formData) => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type":
        "multipart/form-data; boundary=---011000010111000001101001",
    },
    data: formData,
  };

  const response = await axios(
    "https://yga.org.tr/cms/api/v1/newsletter/save",
    options
  );
  return response.data;
};

export const postContact = async (formData) => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type":
        "multipart/form-data; boundary=---011000010111000001101001",
    },
    data: formData,
  };

  const response = await axios(
    "https://yga.org.tr/cms/api/v1/form/contact/save",
    options
  );
  return response.data;
};
