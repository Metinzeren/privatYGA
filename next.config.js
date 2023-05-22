const { i18n } = require("./next-i18next.config");
module.exports = {
  reactStrictMode: false,
  i18n,
  images: {
    domains: ["yga.org.tr"],
  },
  async rewrites() {
    return [
      {
        source: "/about-us",
        destination: "/hakkimizda",
      },
      {
        source: "/contact-us",
        destination: "/iletisim",
      },
      {
        source: "/dream-partners",
        destination: "/hayal-ortaklari",
      },
      {
        source: "/ventures/piri",
        destination: "/girisimler/piri",
      },
      {
        source: "/ventures/we-walk",
        destination: "/girisimler/we-walk",
      },
      {
        source: "/ventures/up-school",
        destination: "/girisimler/up-school",
      },
      {
        source: "/ventures/poilabs",
        destination: "/girisimler/poilabs",
      },
      {
        source: "/ventures/twin",
        destination: "/girisimler/twin",
      },
      {
        source: "/ventures",
        destination: "/girisimler",
      },
      {
        source: "/meet-with-science",
        destination: "/bilimle-bulus",
      },
      {
        source: "/financials",
        destination: "/finansallar",
      },
      {
        source: "/partnerships",
        destination: "/uluslararasi-is-birlikleri",
      },
      {
        source: "/office-team",
        destination: "/ofis-ekibi",
      },
      {
        source: "/projects",
        destination: "/projeler",
      },
      {
        source: "/office-team",
        destination: "/ofis-ekibi",
      },
      {
        source: "/projects/bilimseferberligi",
        destination: "/projeler/bilimseferberligi",
      },
      {
        source: "/yga-alumni",
        destination: "/yga-mezunlari",
      },
      {
        source: "/summit",
        destination: "/zirve",
      },
      {
        source: "/the-program-of-women-empowering-each-other",
        destination: "/birbirini-gelistiren-kadinlar",
      },
      {
        source: "/alumni",
        destination: "/alumni-toplulugu",
      },
    ];
  },
};
