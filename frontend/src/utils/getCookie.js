export const getCookie = (name) => {
  let cookieValue = null;

  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const index = cookie.indexOf("=");
      const cookieName = cookie.substring(0, index).trim();

      if (cookieName === name) {
        cookieValue = decodeURIComponent(cookie.substring(index + 1));
        break;
      }
    }
  }
  return cookieValue;
};
