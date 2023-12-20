import cn from 'classnames';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as channelsActions } from '../slices/channelsSlice';

const ChannelItem = ({ channel, showModal }) => {
  const { t } = useTranslation();
  const { id, name, removable } = channel;
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((state) => state.channelsInfo);

  const channelBtnClassName = cn({
    'w-100 rounded-0 text-start btn': true,
    'btn-secondary': id === currentChannelId,
  });
  const menuBtnClassName = cn({
    'flex-grow-0 dropdown-toggle dropdown-toggle-split btn': true,
    'btn-secondary': id === currentChannelId,
  });

  const handleClick = (channelId) => {
    dispatch(channelsActions.setCurrentChannel(channelId));
  };

  const renderEditableBtn = () => (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button onClick={() => handleClick(id)} variant="" className={channelBtnClassName}>
        <span className="me-1">#</span>
        {name}
      </Button>
      <Dropdown.Toggle className={menuBtnClassName} split variant="" id="dropdown-custom-2">
        <span className="visually-hidden">{t('buttons.manageChannel')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => showModal('removing', channel)}>
          {t('controls.remove')}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => showModal('renaming', channel)}>
          {t('controls.rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const renderStaticBtn = () => (
    <button onClick={() => handleClick(id)} type="button" className={channelBtnClassName}>
      <span className="me-1">#</span>
      {name}
    </button>
  );

  return (
    <li key={id} className="nav-item w-100">
      {removable ? renderEditableBtn() : renderStaticBtn()}
    </li>
  );
};

export default ChannelItem;
