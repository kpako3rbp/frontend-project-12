import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import loginImg from '../assets/avatar.jpg';
import routes from '../routes.js';
import cn from 'classnames';
import useAuth from '../hooks';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required(t('errors.required')),
    password: Yup.string().required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          formik.setErrors({
            username: t('errors.wrongUserOfPassword'),
            password: t('errors.wrongUserOfPassword'),
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
              <img src={loginImg} className="rounded-circle" alt="Войти" />
            </div>
            <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
              <div className="form-floating mb-3">
                <input
                  ref={inputRef}
                  type="text"
                  className={getInputClassName('username')}
                  name="username"
                  autoComplete="username"
                  placeholder={t('placeholders.nickname')}
                  id="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                {formik.errors.username && formik.touched.username ? <div className="invalid-tooltip">{formik.errors.username}</div> : null}
                <label className="form-label" htmlFor="username">
                {t('placeholders.username')}
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className={getInputClassName('password')}
                  name="password"
                  autoComplete="current-password"
                  placeholder={t('placeholders.password')}
                  id="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password ? <div className="invalid-tooltip">{formik.errors.password}</div> : null}
                <label className="form-label" htmlFor="password">
                {t('placeholders.password')}
                </label>
              </div>
              <button className="w-100 mb-3 btn btn-outline-primary" type="submit">
              {t('buttons.login')}
              </button>
            </form>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>{t('noAccount')}</span> <Link to="/signup">{t('signup')}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
