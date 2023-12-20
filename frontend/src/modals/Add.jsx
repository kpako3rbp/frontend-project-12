import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { toast } from 'react-toastify';
import useSocket from '../hooks/useSocket';
import editChannelSchema from '../helpers/validation/editChannelSchema';

const Add = (props) => {
  const { t } = useTranslation();
  const { onHide, channels } = props;
  const socket = useSocket();

  const submitBtnRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (values, formikData) => {
    const newChannel = { name: values.name };
    submitBtnRef.disabled = true;

    const hasChannelWithName = channels.find(({ name }) => name === values.name);
    if (hasChannelWithName) {
      formikData.setErrors({
        name: t('errors.mustBeUnique'),
      });
      submitBtnRef.disabled = false;
      return;
    }

    socket.emit('newChannel', newChannel, (response) => {
      if (response.status === 'ok') {
        onHide();
        submitBtnRef.disabled = false;
        toast.success(t('notifications.channelAdded'));
      } else {
        toast.error(t('notifications.channelAddFail'));
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: editChannelSchema(t),
    onSubmit: (values) => handleSubmit(values, formik),
  });

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

export default Add;
