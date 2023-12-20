import React, { useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useSocket from '../hooks/useSocket';

const Remove = (props) => {
  const { t } = useTranslation();
  const socket = useSocket();
  const { modalInfo, onHide } = props;
  const submitBtnRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    submitBtnRef.disabled = true;

    socket.emit('removeChannel', { id: modalInfo.channel.id }, (response) => {
      if (response.status === 'ok') {
        onHide();
        submitBtnRef.disabled = false;
        toast.success(t('notifications.channelRemoved'));
      } else {
        toast.error(t('notifications.channelRemoveFail'));
      }
    });
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
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
