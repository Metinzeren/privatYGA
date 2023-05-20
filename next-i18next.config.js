// // eslint-disable-next-line @typescript-eslint/no-var-requires
const HttpBackend = require("i18next-http-backend");

const { i18n } = require("next-i18next");

const isBrowser = typeof window !== "undefined";

module.exports = {
  backend: {
    loadPath: "/api/localizations/{{lng}}",
    backends: isBrowser ? [HttpBackend] : [],
  },

  i18n: {
    defaultLocale: "tr",
    locales: ["en", "tr"],
  },
  use: isBrowser ? [HttpBackend] : [],
};
