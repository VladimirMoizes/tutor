import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAccount,
  getUserSelectors,
  logout,
  updateUserProfile,
} from "../../services/slices/userSlice";
import Button from "../../components/button/button";
import { type AppDispatch } from "../../services/store";
import { ContentWrapper } from "../../components/contentWrapper/contentWrapper";
import styles from "./profile.module.css";
import { useState } from "react";
import { Modal } from "../../components/modal/modal";
import { CloseIcon } from "../../components/icons/icons";
import clsx from "clsx";
import { Input } from "../../components/input/input";
import { Form } from "../../components/form/form";

export const Profile = () => {
  const {
    data: dataUser,
    updateUserRequest,
    deleteUserRequest,
  } = useSelector(getUserSelectors);
  const dispatch = useDispatch<AppDispatch>();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [password, setPassword] = useState("");

  // Модалка редактирования
  const handleOpenEditModal = () => {
    if (dataUser) {
      setFormData({
        firstName: dataUser.firstName,
        lastName: dataUser.lastName,
        email: dataUser.email,
      });
    }
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  // Модалка удаления
  const handleOpenDeleteModal = () => {
    setPassword("");
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  // Модалка выхода
  const handleOpenLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmitEdit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!dataUser) return;

    try {
      const updateData: {
        firstName?: string;
        lastName?: string;
        email?: string;
      } = {};

      if (formData.firstName !== dataUser.firstName) {
        updateData.firstName = formData.firstName;
      }
      if (formData.lastName !== dataUser.lastName) {
        updateData.lastName = formData.lastName;
      }
      if (formData.email !== dataUser.email) {
        updateData.email = formData.email;
      }

      if (Object.keys(updateData).length > 0) {
        await dispatch(updateUserProfile(updateData)).unwrap();
        handleCloseEditModal();
      } else {
        console.log("Нет изменений для сохранения");
        handleCloseEditModal();
      }
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
    }
  };

  const handleSubmitDelete = async () => {
    if (!password) {
      alert("Введите пароль для подтверждения");
      return;
    }

    try {
      await dispatch(deleteUserAccount(password)).unwrap();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Ошибка при удалении профиля:", error);
      alert("Неверный пароль или ошибка при удалении");
    }
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    handleCloseLogoutModal();
  };

  const handleReset = () => {
    if (dataUser) {
      setFormData({
        firstName: dataUser.firstName,
        lastName: dataUser.lastName,
        email: dataUser.email,
      });
    }
  };

  return (
    <>
      {dataUser && (
        <>
          <ContentWrapper className={styles.profilePage}>
            <h2 className={styles.title}>Профиль</h2>
            <p className={styles.description}>Данные профиля</p>
            <div className={styles.profile}>
              <p className={styles.profileData}>Имя: {dataUser.firstName}</p>
              <p className={styles.profileData}>Фамилия: {dataUser.lastName}</p>
              <p className={styles.profileData}>Почта: {dataUser.email}</p>
              <Button
                className={clsx(`${styles.buttonEdit} ${styles.buttonProfile}`)}
                onClick={handleOpenEditModal}
              >
                Редактировать
              </Button>
              <Button
                className={clsx(`${styles.buttonLogout} ${styles.buttonProfile}`)}
                onClick={handleOpenLogoutModal}
              >
                Выйти
              </Button>
              <Button
                className={clsx(`${styles.buttonDelete} ${styles.buttonProfile}`)}
                onClick={handleOpenDeleteModal}
              >
                Удалить профиль
              </Button>
            </div>
          </ContentWrapper>

          {/* Модалка редактирования */}
          <Modal
            isOpen={editModalOpen}
            onClose={handleCloseEditModal}
            title="Редактировать"
            icon={<CloseIcon className={styles.closeIcon} />}
          >
            <Form className={styles.form} onSubmit={handleSubmitEdit}>
              <Input
                placeholder="Иван"
                name="firstName"
                label="Ваше имя"
                required
                className={styles.input}
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Иванов"
                name="lastName"
                label="Ваша фамилия"
                required
                className={styles.input}
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <Input
                placeholder="ivan@mail.ru"
                type="email"
                name="email"
                label="Почта"
                required
                className={styles.input}
                value={formData.email}
                onChange={handleInputChange}
              />

              <div className={styles.buttonList}>
                <Button
                  htmlType="submit"
                  className={clsx(
                    `${styles.formButton} ${styles.submitButton}`
                  )}
                  disabled={updateUserRequest}
                >
                  {updateUserRequest ? "Сохранение..." : "Сохранить"}
                </Button>
                <Button
                  onClick={handleReset}
                  className={clsx(`${styles.formButton} ${styles.resetButton}`)}
                  disabled={updateUserRequest}
                >
                  Сбросить
                </Button>
              </div>
            </Form>
          </Modal>

          {/* Модалка подтверждения выхода */}
          <Modal
            isOpen={logoutModalOpen}
            onClose={handleCloseLogoutModal}
            title="Выход из аккаунта"
            icon={<CloseIcon className={styles.closeIcon} />}
          >
            <div className={styles.logoutModal}>
              <p className={styles.logoutMessage}>
                Вы уверены, что хотите выйти из аккаунта?
              </p>
              <div className={styles.buttonList}>
                <Button
                  onClick={handleConfirmLogout}
                  className={clsx(
                    `${styles.formButton} ${styles.logoutConfirmButton}`
                  )}
                >
                  Да, выйти
                </Button>
                <Button
                  onClick={handleCloseLogoutModal}
                  className={clsx(`${styles.formButton} ${styles.resetButton}`)}
                >
                  Отмена
                </Button>
              </div>
            </div>
          </Modal>

          {/* Модалка удаления */}
          <Modal
            isOpen={deleteModalOpen}
            onClose={handleCloseDeleteModal}
            title="Удаление профиля"
            icon={<CloseIcon className={styles.closeIcon} />}
          >
            <div className={styles.deleteModal}>
              <p className={styles.deleteWarning}>
                Вы уверены, что хотите удалить свой профиль? Это действие нельзя
                отменить.
              </p>
              <Input
                type="password"
                placeholder="Введите ваш пароль"
                label="Подтвердите пароль"
                value={password}
                onChange={handlePasswordChange}
                className={clsx(`${styles.input} ${styles.inputDelete}`)}
              />
              <div className={styles.buttonList}>
                <Button
                  onClick={handleSubmitDelete}
                  className={clsx(
                    `${styles.formButton} ${styles.deleteConfirmButton}`
                  )}
                  disabled={deleteUserRequest}
                >
                  {deleteUserRequest ? "Удаление..." : "Да, удалить"}
                </Button>
                <Button
                  onClick={handleCloseDeleteModal}
                  className={clsx(`${styles.formButton} ${styles.resetButton}`)}
                  disabled={deleteUserRequest}
                >
                  Отмена
                </Button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};
