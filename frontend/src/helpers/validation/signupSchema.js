import * as Yup from 'yup';

const createSignupSchema = (t) => Yup.object().shape({
  username: Yup.string()
    .required(t('errors.required'))
    .min(3, t('errors.username.counter.count_few', { minCount: 3, maxCount: 20 }))
    .max(20, t('errors.username.counter.count_few', { minCount: 3, maxCount: 20 })),
  password: Yup.string()
    .required(t('errors.required'))
    .min(6, t('errors.password.counter.count', { count: 6 })),
  confirmPassword: Yup.string().when('password', {
    is: (password) => password && password.length > 0,
    then: Yup.string()
      .oneOf([Yup.ref('password')], t('errors.passwordsMatch'))
      .required(t('errors.passwordsMatch')),
    otherwise: Yup.string().notRequired(),
  }),
});

export default createSignupSchema;
