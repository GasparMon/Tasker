interface User {
  id: string;
  email: string;
}

interface Location {
  pathname: string;
}

export const useLocalStorage = (key: string) => {
  const setItem = (value: User) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = (): User | null => {
    const user = window.localStorage.getItem(key);
    return user ? JSON.parse(user) : null;
  };

  const removeItem = () => {
    window.localStorage.removeItem(key);
  };

  const setLocation = (value: Location) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const getLocation = (): Location | null => {
    const location = window.localStorage.getItem(key);
    return location ? JSON.parse(location) : null;
  };

  return { setItem, removeItem, getItem, setLocation, getLocation };
};
