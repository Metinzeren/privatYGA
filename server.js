const { createServer } = require("http");
const { parse: parseUrl } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

function parseLanguageFromCookie(cookie) {
  const languageCookie = cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("NEXT_LOCALE="));
  if (languageCookie) {
    const [, language] = languageCookie.trim().split("=");
    return language;
  }
  return null;
}

app.prepare().then(() => {
  createServer((req, res) => {
    if (req.headers.cookie) {
      const cookie = req.headers.cookie;
      const language = parseLanguageFromCookie(cookie);
      if (language === "tr" && req.url === "/about") {
        req.url = req.url.replace(/^\/about/, "/hakkimizda");
      }
    }

    handle(req, res, parseUrl(req.url, true));
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
