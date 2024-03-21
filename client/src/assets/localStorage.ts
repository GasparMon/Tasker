interface User {
  id: string;
  email: string;
}

interface Location{
  pathname: string
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

  const setLocation = (value: Location) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const getLocation = () => {
    const location = window.localStorage.getItem(key);

    if (location) {
      return JSON.parse(location);
    }

    return null;
  };

  return { setItem, revomeItem, getItem, getLocation, setLocation };
};
