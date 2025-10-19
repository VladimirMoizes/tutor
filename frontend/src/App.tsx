import { Route, Routes } from "react-router-dom";
import { Schedule } from "./pages/schedule/schedule";
import AppHeader from "./components/header/header";
import { Main } from "./pages/main/main";
import { About } from "./pages/about/about";
import { Subjects } from "./pages/subjects/subjects";
import { Materials } from "./pages/materials/materials";
import { NotFound404 } from "./pages/NotFound404/NotFound404";
import { selectTheme } from "./services/slices/themeSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { AppFooter } from "./components/footer/footer";
import type { TTheme } from "./types/types";
import { ContactsPage } from "./pages/contacts/contactsPage";
import { ScrollToTop } from "./utils/utils";
import { Auth } from "./pages/auth/auth";

const App = () => {
  const theme: TTheme = useSelector(selectTheme);

  // Применяем тему при загрузке приложения
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <>
      <AppHeader />
      <ScrollToTop />
      <Routes>
        <Route path="*" element={<NotFound404 />} />
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <AppFooter />
    </>
  );
};

export default App;
