import moment from 'moment';
import * as Yup from 'yup';

export const userSchema = Yup.object({
  firstName: Yup.string().required('Данное поле не может быть пустым'),
  lastName: Yup.string().required('Данное поле не может быть пустым'),
  patronymic: Yup.string(),
  birthDay: Yup.date()
    .max(new Date(), 'Выбранная дата не должна превышать текущую')
    .min(new Date('1960-01-01'), 'Выбранная дата не должная быть меньше 1961 года')
    .required('Данное поле не может быть пустым'),
  genderId: Yup.number().required('Данное поле не может быть пустым'),
  email: Yup.string()
    .matches(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      'Неверный формат адреса электронной почты'
    )
    .required('Данное поле не может быть пустым'),
  phoneNumber: Yup.string()
    .matches(/^[+][0-9]\s[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Неверный формат номера телефона')
    .required('Данное поле не может быть пустым'),
  password: Yup.string()
    .min(6, 'Длина пароля должна быть не менее 6 символов')
    .max(30, 'Длина пароля не должна превышать 30 символов')
    .required(),
});

export type User = Yup.InferType<typeof userSchema>;
