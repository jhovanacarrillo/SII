
// import { createContext } from "react";

// export interface ThemeContextType {
//   theme: "light" | "dark";
//   toggleTheme: () => void;
// }

// export const ThemeContext = createContext<ThemeContextType>({
//   theme: "light",
//   toggleTheme: () => {},
// });


import { createContext, useContext } from "react";

export interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});


export const useTheme = () => useContext(ThemeContext);
