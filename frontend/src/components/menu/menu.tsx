import { NavLink } from "react-router-dom";
import styles from "./menu.module.css";
import type { MenuProps } from "./type";
import { useEffect } from "react";
import { CloseIcon } from "../icons/icons";
import { menuItems } from "../../constants/constants";

export const Menu = ({
  isOpen = false,
  onClose,
  isMobile = false,
}: MenuProps) => {
  // Закрытие меню при клике на ссылку (только для мобильных)
  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  // Блокировка скролла при открытом мобильном меню
  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isMobile]);

  // Оверлей для закрытия меню
  const Overlay = () => (
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
      onClick={onClose}
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
      aria-hidden="true"
    />
  );

  return (
    <>
      {/* Десктопное меню */}
      {!isMobile && (
        <nav className={styles.desktopMenu} aria-label="Основное меню">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
              end={item.to === "/"}
              onClick={handleLinkClick}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}

      {/* Мобильное меню */}
      {isMobile && (
        <>
          <Overlay />
          <aside
            className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ""}`}
            aria-label="Мобильное меню"
            aria-hidden={!isOpen}
          >
            <div className={styles.mobileMenuContent}>
              <h2 className={styles.menuTitle}>Меню</h2>

              <nav className={styles.mobileNav}>
                {menuItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `${styles.mobileLink} ${isActive ? styles.mobileActive : ""}`
                    }
                    end={item.to === "/"}
                    onClick={handleLinkClick}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Закрыть меню"
              >
                <CloseIcon className={styles.closeIcon} />
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
};
