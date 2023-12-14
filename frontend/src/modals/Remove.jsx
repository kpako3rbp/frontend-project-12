import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import { Modal, FormGroup, FormControl, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import socket from '../socket.js';
import cn from 'classnames';

const Remove = (props) => {
  const { t } = useTranslation();
  const { modalInfo, onHide, channels } = props;
  const submitBtnRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    submitBtnRef.disabled = true;

    socket.emit('removeChannel', { id: modalInfo.channel.id }, (response) => {
      if (response.status === 'ok') {
        onHide();
        submitBtnRef.disabled = false;
      } else {
      }
    });
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <p className="lead">{t('modals.sure')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            {t('buttons.cancel')}
          </Button>
          <Button ref={submitBtnRef} type="submit" variant="danger">
            {t('buttons.remove')}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Remove;
