import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Layout from '../components/Layout';
import loginImg from '../assets/avatar.jpg';

const LoginPage = () => {
  const inputRef = useRef();
  useEffect(() => {
    //inputRef.current.focus();
  }, []);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  });

  return (
    <Layout>
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginImg} className="rounded-circle" alt="Войти" />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                    <div className="form-floating mb-3">
                      <Field
                        className="form-control"
                        name="username"
                        autoComplete="username"
                        placeholder="Ваш ник"
                        id="username"
                      />
                      {errors.username && touched.username ? <div className='form-input-error'>{errors.username}</div> : null}
                      <label className="form-label" htmlFor="username">
                        Пароль
                      </label>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        className="form-control"
                        name="password"
                        autoComplete="current-password"
                        placeholder="Пароль"
                        id="password"
                      />
                      {errors.password && touched.password ? <div className='form-input-error'>{errors.password}</div> : null}
                      <label className="form-label" htmlFor="password">
                        Пароль
                      </label>
                    </div>
                    <button className="w-100 mb-3 btn btn-outline-primary" type="submit">Войти</button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span> <Link to="/signup">Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
