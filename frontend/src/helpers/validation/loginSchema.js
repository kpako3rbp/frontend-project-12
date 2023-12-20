import * as Yup from 'yup';

const createLoginSchema = (t) => Yup.object().shape({
  username: Yup.string().required(t('errors.required')),
  password: Yup.string().required(t('errors.required')),
});

export default createLoginSchema;
