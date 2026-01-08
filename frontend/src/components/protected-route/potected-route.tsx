import { useSelector } from "../../services/store";
import { getUserSelectors } from "../../services/slices/userSlice";
import { Navigate, useLocation } from "react-router-dom";
import { Preloader } from "../preloader/preloader";

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth, // true для страниц, доступных только НЕавторизованным (логин, регистрация)
  children,
}: ProtectedRouteProps) => {
  const { isAuthChecked, isAuthenticated } = useSelector(getUserSelectors);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  // Страницы только для НЕавторизованных (логин, регистрация)
  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: "/" };
    return <Navigate to={from} replace />;
  }

  // Страницы только для авторизованных (профиль)
  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};
