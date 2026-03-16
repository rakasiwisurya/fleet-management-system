export const webStorage = {
  set: (key: string, value: { [key: string]: any } | string) => {
    return localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key: string) => {
    const data = localStorage.getItem(key);

    if (data) return JSON.parse(data);
    return data;
  },
  remove: (key: string) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
};
