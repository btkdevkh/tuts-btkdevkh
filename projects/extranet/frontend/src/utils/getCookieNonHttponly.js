const getCookieNonHttponly = (name) =>
  document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1] ?? null;

export default getCookieNonHttponly;
