import React, { useEffect, useRef } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import routes from '../../routes.js';
import useAuth from '../../hooks/useAuth';
import signupImg from '../../assets/images/avatar_1.jpg';
import createSignupSchema from '../../helpers/validation/signupSchema';

const SignupPage = () => {
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
      confirmPassword: '',
    },
    validationSchema: createSignupSchema(t),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.signupPath(), {
          username: values.username,
          password: values.password,
        });
        logIn(data);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 409) {
          formik.setErrors({
            username: t(' '),
            password: t(' '),
            confirmPassword: t('errors.userExists'),
          });
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  const getInputClassName = (inputName) => cn({
    'is-invalid': formik.errors[inputName] && formik.touched[inputName],
  });

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
                  required
                  ref={inputRef}
                  type="text"
                  className={getInputClassName('username')}
                  name="username"
                  autoComplete="username"
                  placeholder={t('errors.username.counter.count_few', {
                    minCount: 3,
                    maxCount: 20,
                  })}
                  id="username"
                  onChange={formik.handleChange}
                  value={formik.values.username.trim()}
                  onBlur={formik.handleBlur}
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
                  placeholder="Не менее 6 символов"
                  name="password"
                  aria-describedby="passwordHelpBlock"
                  required=""
                  autoComplete="new-password"
                  type="password"
                  id="password"
                  className={getInputClassName('password')}
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
              <FormGroup className="form-floating mb-3">
                <FormControl
                  placeholder={t('errors.passwordsMatch')}
                  name="confirmPassword"
                  required=""
                  autoComplete="new-password"
                  type="password"
                  id="confirmPassword"
                  className={getInputClassName('confirmPassword')}
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword.trim()}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                  <div className="invalid-tooltip">{formik.errors.confirmPassword}</div>
                ) : null}
                <label className="form-label" htmlFor="confirmPassword">
                  {t('placeholders.confirmPassword')}
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
