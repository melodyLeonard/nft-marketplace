export const retreiveFromStorage = async (key: string) => {
  return await localStorage.getItem(key);
};

export const saveToStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const scrollTo = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const attachLoader =
  (setter: (setterFuc: any) => any) =>
  (name: string, callback: (param?: any) => Promise<any>) =>
  (...args: any) => {
    const setLoadingTo = (state: any) => (prevState: any) => {
      return {
        ...prevState,
        [name]: state,
      };
    };
    setter(setLoadingTo(true));
    return callback(...args)
      .catch((err: any) => {
        return Promise.reject(err);
      })
      .finally(() => setter(setLoadingTo(false)));
  };
