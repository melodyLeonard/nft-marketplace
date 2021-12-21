import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { retreiveFromStorage } from '../functions/global.function';

export type ITheme = 'light' | 'dark';

type IContext = [ITheme, (theme: ITheme | ((theme: ITheme) => ITheme)) => void];

const ThemeContext = createContext<IContext>(['light', () => 'light']);

const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  const [theme, setTheme] = useState<ITheme>('light');

  const getAndSetTheme = async () => {
    const loadedTheme = await retreiveFromStorage('theme');
    if (loadedTheme === 'light' || loadedTheme === 'dark') setTheme(loadedTheme);
  };
  useEffect(() => {
    getAndSetTheme();
  }, []);

  return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeProvider;
