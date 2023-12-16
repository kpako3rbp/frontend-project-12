import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import cn from 'classnames';
import { toast } from 'react-toastify';
import socket from '../socket.js';

const Rename = (props) => {
  const { t } = useTranslation();
  const { modalInfo, onHide, channels } = props;

  const submitBtnRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const AddChannelSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('errors.required'))
      .min(3, t('errors.channelName.counter.count_few', { minCount: 3, maxCount: 20 }))
      .max(20, t('errors.channelName.counter.count_few', { minCount: 3, maxCount: 20 })),
  });

  const formik = useFormik({
    initialValues: {
      name: modalInfo.channel.name,
    },
    validationSchema: AddChannelSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values) => {
    const renamedChannel = { id: modalInfo.channel.id, name: values.name };
    submitBtnRef.disabled = true;

    const hasChannelWithName = channels.find(({ name }) => name === values.name);
    if (hasChannelWithName) {
      formik.setErrors({
        name: t('errors.mustBeUnique'),
      });
      submitBtnRef.disabled = false;
      return;
    }

    socket.emit('renameChannel', renamedChannel, (response) => {
      if (response.status === 'ok') {
        onHide();
        submitBtnRef.disabled = false;
        toast.success(t('notifications.channelRenamed'));
      } else {
        toast.error(t('notifications.channelRenameFail'));
      }
    });
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
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
            <div className="invalid-feedback">{formik.errors.name}</div>
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

export default Rename;
