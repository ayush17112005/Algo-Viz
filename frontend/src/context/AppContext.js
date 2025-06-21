import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [showCode, setShowCode] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const scrollToCategories = () => {
    document
      .getElementById("categories")
      .scrollIntoView({ behavior: "smooth" });
  };
  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
  const toggleCode = () => {
    setShowCode(!showCode);
    if (showInfo) {
      setShowInfo(false);
    }
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
    if (showCode) {
      setShowCode(false);
    }
    if (!showInfo) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  const value = {
    fadeInUp,
    staggerContainer,
    scrollToCategories,
    floatingAnimation,
    showCode,
    setShowCode,
    showInfo,
    setShowInfo,
    toggleCode,
    toggleInfo,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
