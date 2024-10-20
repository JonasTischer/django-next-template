import Cookies from 'js-cookie';

export const setCookie = (
  name: string,
  value: string,
  options = {}
) => {
  Cookies.set(name, value, options);
  console.log('setting cookie', name, value, options);
};

export const getCookie = (name: string) => {
  console.log('getting cookie', name);
  return Cookies.get(name);
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};
