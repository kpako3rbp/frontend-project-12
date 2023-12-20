import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import routes from '../../routes.js';
import useAuth from '../../hooks/useAuth';
import loginImg from '../../assets/images/avatar.jpg';
import createLoginSchema from '../../helpers/validation/loginSchema.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: createLoginSchema(t),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        logIn(data);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          formik.setErrors({
            password: t('errors.wrongUserOfPassword'),
          });
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  const inputClassName = cn({
    'is-invalid': !formik.isValid,
  });

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src={loginImg} className="rounded-circle" alt={t('headers.login')} />
            </div>
            <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
              <h1 className="text-center mb-4">{t('headers.login')}</h1>
              <FormGroup className="form-floating mb-3">
                <FormControl
                  ref={inputRef}
                  type="text"
                  className={inputClassName}
                  name="username"
                  autoComplete="username"
                  placeholder={t('placeholders.nickname')}
                  id="username"
                  onChange={formik.handleChange}
                  value={formik.values.username.trim()}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.username && formik.touched.username ? (
                  <div className="invalid-tooltip">{formik.errors.username}</div>
                ) : null}
                <label className="form-label" htmlFor="username">
                  {t('placeholders.nickname')}
                </label>
              </FormGroup>
              <FormGroup className="form-floating mb-3">
                <FormControl
                  type="password"
                  className={inputClassName}
                  name="password"
                  autoComplete="current-password"
                  placeholder={t('placeholders.password')}
                  id="password"
                  onChange={formik.handleChange}
                  value={formik.values.password.trim()}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="invalid-tooltip">{formik.errors.password}</div>
                ) : null}
                <label className="form-label" htmlFor="password">
                  {t('placeholders.password')}
                </label>
              </FormGroup>
              <Button className="w-100" variant="outline-primary" type="submit">
                {t('buttons.login')}
              </Button>
            </form>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>{t('noAccount')}</span>
              &nbsp;
              <Link to="/signup">{t('signup')}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
