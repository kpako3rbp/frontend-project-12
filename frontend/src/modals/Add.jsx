import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import socket from '../socket.js';
import cn from 'classnames';

const Add = (props) => {
  const { t } = useTranslation();
  const { onHide, channels } = props;

  const submitBtnRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const AddChannelSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('errors.required'))
      .min(3, t('errors.channelName.counter.count_few', { minCount: 3, maxCount: 20 }))
      .max(20, t('errors.channelName.counter.count_few', { minCount: 3, maxCount: 20 })),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: AddChannelSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values) => {
    const newChannel = { name: values.name };
    submitBtnRef.disabled = true;

    const hasChannelWithName = channels.find(({ name }) => name === values.name);
    if (hasChannelWithName) {
      formik.setErrors({
        name: t('errors.mustBeUnique'),
      });
      submitBtnRef.disabled = false;
      return;
    }

    socket.emit('newChannel', newChannel, (response) => {
      if (response.status === 'ok') {
        onHide();
        submitBtnRef.disabled = false;
      } else {
        formik.setErrors({
          name: t('errors.wentWrong'),
        });
      }
    });
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>

      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <FormGroup>
            <FormControl
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              data-testid="input-body"
              name="name"
              id="name"
              className={cn({ 'is-invalid': formik.errors.name && formik.touched.name })}
            />
            <label className="visually-hidden" htmlFor="name">
              {t('placeholders.channelName')}
            </label>
            {<div className="invalid-feedback">{formik.errors.name}</div>}
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            {t('buttons.cancel')}
          </Button>
          <Button ref={submitBtnRef} type="submit" variant="primary">
            {t('buttons.send')}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Add;
