import { object, string, ref } from 'yup';

export const getChannelSchema = (channels, t) =>
  object().shape({
    name: string()
      .required(t('modal.errors.validation.required'))
      .min(3, t('modal.errors.validation.minMax'))
      .max(20, t('modal.errors.validation.minMax'))
      .notOneOf(
        channels.map((channel) => channel.name),
        t('modal.errors.validation.unique')
      ),
  });

export const getSignUpSchema = (t) =>
  object().shape({
    username: string().required(t('loginAndSignUp.errors.validation.required')).min(3, t('loginAndSignUp.errors.validation.nameSymbols')).max(20, t('loginAndSignUp.errors.validation.nameSymbols')),
    password: string().required(t('loginAndSignUp.errors.validation.required')).min(6, t('loginAndSignUp.errors.validation.pasMinSymbols')),
    confirmPassword: string()
      .required(t('loginAndSignUp.errors.validation.required'))
      .oneOf([ref('password')], t('loginAndSignUp.errors.validation.confirmPassword')),
  });
