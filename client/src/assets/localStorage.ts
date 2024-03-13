interface User {
  id: string;
  email: string;
}

export const useLocalStorage = (key: string) => {
  const setItem = (value: User) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = () => {
    const user = window.localStorage.getItem(key);

    if (user) {
      return JSON.parse(user);
    }

    return null;
  };

  const revomeItem = () => {
    window.localStorage.removeItem(key);
  };

  return { setItem, revomeItem, getItem };
};
