export const setCookie = (name: string, value: any, days: number) => {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};


export const getCookie = (name: string) => {
  const value = `; ${decodeURIComponent(document.cookie)}`;
  const parts: any = value.split(`; ${name}=`);
  if (parts.length === 2) {
    let cookieValue = parts?.pop().split(';').shift();
    // Remove surrounding quotes if present
    return cookieValue.replace(/^"(.*)"$/, '$1');
  }
};