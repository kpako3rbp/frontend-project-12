import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import socket from '../socket.js';
import getModal from '../modals/index.js';

const renderModal = ({ modalInfo, hideModal, channels }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} channels={channels} />;
};

const Nav = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const [selectedChannelId, setSelectedChannelId] = useState(currentChannelId);
  const channelsBoxRef = useRef();

  const [modalInfo, setModalInfo] = useState({ type: null, channel: null });
  const hideModal = () => setModalInfo({ type: null, channel: null });
  const showModal = (type, channel = null) => setModalInfo({ type, channel });

  const renderChannel = ({ channel, showModal }) => {
    const { id, name, removable } = channel;
    const channelBtnClassName = cn({
      'w-100 rounded-0 text-start btn': true,
      'btn-secondary': id === selectedChannelId,
    });
    const menuBtnClassName = cn({
      'flex-grow-0 dropdown-toggle dropdown-toggle-split btn': true,
      'btn-secondary': id === selectedChannelId,
    });

    const handleClick = (id) => {
      setSelectedChannelId(id);
      dispatch(channelsActions.setCurrentChannel(id));
    };

    const renderEditableBtn = () => {
      return (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button onClick={() => handleClick(id)} variant="" className={channelBtnClassName}>
            <span className="me-1">#</span>
            {name}
          </Button>
          <Dropdown.Toggle className={menuBtnClassName} split variant="" id="dropdown-custom-2" />

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => showModal('removing', channel)} href="#/action-1">
              {t('controls.remove')}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => showModal('renaming', channel)} href="#/action-2">
              {t('controls.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    };

    const renderStaticBtn = () => {
      return (
        <button onClick={() => handleClick(id)} type="button" className={channelBtnClassName}>
          <span className="me-1">#</span>
          {name}
        </button>
      );
    };

    return (
      <li key={id} className="nav-item w-100">
        {removable ? renderEditableBtn() : renderStaticBtn()}
      </li>
    );
  };

  useEffect(() => {
    setSelectedChannelId(currentChannelId);
    if (channels[0].id === currentChannelId) {
      setTimeout(() => {
        channelsBoxRef.current.scrollTop = 0;
      }, 0);
    }
  }, [currentChannelId]);

  useEffect(() => {
    socket.on('newChannel', (payload) => {
      dispatch(channelsActions.addChannel(payload));
      setSelectedChannelId(payload.id);
      dispatch(channelsActions.setCurrentChannel(payload.id));
      setTimeout(() => {
        channelsBoxRef.current.scrollTop = channelsBoxRef.current.scrollHeight;
      }, 0);
    });
  }, []);

  useEffect(() => {
    socket.on('renameChannel', (payload) => {
      dispatch(channelsActions.renameChannel(payload));
    });
  }, []);

  useEffect(() => {
    socket.on('removeChannel', (payload) => {
      dispatch(channelsActions.removeChannel(payload));
    });
  }, []);

  return (
    <>
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>
          <button
            onClick={() => showModal('adding')}
            type="button"
            className="p-0 text-primary btn btn-group-vertical"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
            </svg>
            <span className="visually-hidden">+</span>
          </button>
        </div>
        <ul
          ref={channelsBoxRef}
          id="channels-box"
          className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        >
          {channels.map((channel) => renderChannel({ channel, showModal }))}
        </ul>
      </div>
      {renderModal({ modalInfo, hideModal, channels })}
    </>
  );
};

export default Nav;