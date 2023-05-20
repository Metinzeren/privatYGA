export const getCookie = (name) => {
  if (typeof document !== "undefined") {
    const cookies = decodeURIComponent(document.cookie).split("; ");
    return cookies
      .find((cookie) => cookie.split("=")[0] === name)
      ?.split("=")[1];
  }
  return null;
};

export const setCookie = (name, value, path, expireHours) => {
  if (typeof document !== "undefined") {
    if (expireHours) {
      const date = new Date();
      date.setHours(date.getHours() + expireHours);
      document.cookie = `${name}=${value};path=${path};expires=${date.toUTCString()};samesite=strict`;
    } else {
      document.cookie = `${name}=${value};path=${path};samesite=strict`;
    }
  }
};
