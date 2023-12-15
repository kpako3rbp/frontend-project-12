import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import signupImg from '../assets/avatar_1.jpg';
import routes from '../routes.js';
import cn from 'classnames';
import useAuth from '../hooks';
import { useTranslation } from 'react-i18next';

const SignupPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('errors.required'))
      .min(3, t('errors.username.counter.count_few', { minCount: 3, maxCount: 20 }))
      .max(20, t('errors.username.counter.count_few', { minCount: 3, maxCount: 20 })),
    password: Yup.string()
      .required(t('errors.required'))
      .min(6, t('errors.password.counter.count', { count: 6 })),
    passwordConfirm: Yup.string()
      .required(t('errors.required'))
      .min(6, t('errors.password.counter.count', { count: 6 }))
      .oneOf([Yup.ref('password')], t('errors.passwordsMatch')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.signupPath(), {
          username: values.username,
          password: values.password,
        });
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 409) {
          formik.setErrors({
            username: t(' '),
            password: t(' '),
            passwordConfirm: t('errors.userExists'),
          });
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  const getInputClassName = (inputName) => {
    return cn({
      'form-control': true,
      'is-invalid': formik.errors[inputName] && formik.touched[inputName],
    });
  };

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src={signupImg} className="rounded-circle" alt={t('headers.signup')} />
            </div>
            <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
              <h1 className="text-center mb-4">{t('headers.signup')}</h1>
              <FormGroup className="form-floating mb-3">
                <FormControl
                  ref={inputRef}
                  type="text"
                  className={getInputClassName('username')}
                  name="username"
                  autoComplete="username"
                  placeholder={t('placeholders.nickname')}
                  id="username"
                  onChange={formik.handleChange}
                  value={formik.values.username.trim()}
                />
                {formik.errors.username && formik.touched.username ? (
                  <div className="invalid-tooltip">{formik.errors.username}</div>
                ) : null}
                <label className="form-label" htmlFor="username">
                  {t('placeholders.username')}
                </label>
              </FormGroup>
              <FormGroup className="form-floating mb-3">
                <FormControl
                  type="password"
                  className={getInputClassName('password')}
                  name="password"
                  autoComplete="current-password"
                  placeholder={t('placeholders.password')}
                  id="password"
                  onChange={formik.handleChange}
                  value={formik.values.password.trim()}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="invalid-tooltip">{formik.errors.password}</div>
                ) : null}
                <label className="form-label" htmlFor="password">
                  {t('placeholders.password')}
                </label>
              </FormGroup>
              <FormGroup className="form-floating mb-3">
                <FormControl
                  type="password"
                  className={getInputClassName('passwordConfirm')}
                  name="passwordConfirm"
                  autoComplete="new-password"
                  placeholder={t('placeholders.passwordsMatch')}
                  id="new-password"
                  onChange={formik.handleChange}
                  value={formik.values.passwordConfirm.trim()}
                />
                {formik.errors.passwordConfirm && formik.touched.passwordConfirm ? (
                  <div className="invalid-tooltip">{formik.errors.passwordConfirm}</div>
                ) : null}
                <label className="form-label" htmlFor="password">
                  {t('placeholders.passwordConfirm')}
                </label>
              </FormGroup>
              <Button className="w-100" variant="outline-primary" type="submit">
                {t('buttons.signup')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;