import { Menu } from "../menu/menu";
import styles from "./header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, toggleTheme } from "../../services/slices/themeSlice";
import Button from "../button/button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BurgerIcon, MoonIcon, ProfileIcon, SunIcon } from "../icons/icons";
import { NavLink, useLocation } from "react-router-dom";
import { getUserSelectors } from "../../services/slices/userSlice";

const AppHeader = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useSelector(selectTheme);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userData = useSelector(getUserSelectors).data;
  const userName = userData ? userData.firstName : null;


  const handleThemeToggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const { themeIcon } = useMemo(
    () => ({
      themeIcon:
        theme === "light" ? (
          <MoonIcon className={styles.themeIcon} />
        ) : (
          <SunIcon className={styles.themeIcon} />
        ),
    }),
    [theme]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1025px)");

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = "unset";
      }
    };

    if (mql.matches) {
      setIsMobileMenuOpen(false);
      document.body.style.overflow = "unset";
    }

    mql.addEventListener("change", handleChange);

    return () => {
      mql.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerMain}>
        <div className={styles.headerLogo}>
          <button
            className={styles.button}
            aria-label="Калькулятор"
            type="button"
          >
            <img
              className={styles.imageCalc}
              src="/images/calculator.png"
              alt="Калькулятор"
            />
          </button>
          <div className={styles.headerLogoText}>
            <h3>MathTutor</h3>
            <p>Точные науки</p>
          </div>
        </div>

        {/* Десктопное меню */}
        <Menu />

        <div className={styles.headerEnd}>
          <button
            className={styles.buttonThemeIcon}
            onClick={handleThemeToggle}
            aria-label="Переключить тему"
            type="button"
          >
            {themeIcon}
          </button>

          <NavLink to={!userName ? "/auth" : "/profile"}>
            <Button
              disabled={location.pathname === "/auth"}
              className={styles.buttonProfile}
            >
              <ProfileIcon className={styles.iconProfile} />
              <p>Личный кабинет</p>
            </Button>
          </NavLink>

          {/* Кнопка бургер-меню */}
          <button
            className={styles.burgerButton}
            onClick={toggleMobileMenu}
            aria-label="Открыть меню"
            aria-expanded={isMobileMenuOpen}
          >
            <BurgerIcon />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <Menu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        isMobile={true}
      />
    </header>
  );
};

export default AppHeader;
