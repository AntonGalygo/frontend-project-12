import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Nav, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import MessageBox from './MessageBox.jsx';
import routes from '../routes.js';
import { selectors as channelsSelectors, addChannels } from '../services/channelsSlice.js';
import { selectors as messagesSelectors, addMessages } from '../services/messagesSlice.js';
import { setCurrentChannel } from '../services/uiSlice.js';
import getModal from './modals/index.js';
import getAuthHeader from '../utils/utils.js';
import Loader from './Loader.jsx';

const renderModal = ({ modalInfo, hideModal, setCurrentChannelId, currentChannelId }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} setCurrentChannelId={setCurrentChannelId} currentChannelId={currentChannelId} />;
};

const HomePage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannel = useSelector((state) => state.ui.currentChannelId);
  const [isLoading, setIsLoading] = useState(true);
  const [currentChannelId, setCurrentChannelId] = useState(currentChannel);
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  useEffect(() => {
    const fetchChannels = async () => {
      const { data } = await axios.get(routes.channelsPath(), getAuthHeader());
      dispatch(addChannels(data));
      setIsLoading(false);
    };

    const fetchMessages = async () => {
      const { data } = await axios.get(routes.messagesPath(), getAuthHeader());
      dispatch(addMessages(data));
      setIsLoading(false);
    };

    fetchChannels();
    fetchMessages();
  }, [dispatch]);

  const handleSetCurrentChannelId = (id) => () => {
    setCurrentChannelId(id);
    dispatch(setCurrentChannel(id));
  };

  const getVariant = (channelId) => (channelId === currentChannelId ? 'secondary' : '');

  const renderUnremovableChannel = ({ id, name }) => (
    <Button className="w-100 rounded-0 text-start" variant={getVariant(id)}>
      <span className="me-1">{t('homePage.prefix')}</span>
      {filter.clean(name)}
    </Button>
  );

  const renderRemovableChannel = ({ name, id }) => (
    <Dropdown className="d-flex" as={ButtonGroup}>
      <Button variant={getVariant(id)} className="w-100 rounded-0 text-start text-truncate">
        <span className="me-1">{t('homePage.prefix')}</span>
        {filter.clean(name)}
      </Button>
      <Dropdown.Toggle className="flex-grow-0 btn" split id="dropdown-split-basic" variant={getVariant(id)}>
        <span className="visually-hidden">{t('homePage.channelСontrolBtn')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Button} onClick={() => showModal('removing', id)}>
          {t('homePage.remove')}
        </Dropdown.Item>
        <Dropdown.Item as={Button} onClick={() => showModal('renaming', id)}>
          {t('homePage.rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const renderChannels = () => {
    if (channels.length === 0) return null;

    return channels.map((channel) => (
      <Nav.Item key={channel.id} className="w-100" onClick={handleSetCurrentChannelId(channel.id)}>
        {channel.removable ? renderRemovableChannel(channel) : renderUnremovableChannel(channel)}
      </Nav.Item>
    ));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col bsPrefix="col-4" className="col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('homePage.heading')}</b>
            <Button variant="group-vertical" className="p-0 text-primary" onClick={() => showModal('adding')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              <span className="visually-hidden">{t('homePage.addChannel')}</span>
            </Button>
            {renderModal({
              modalInfo,
              hideModal,
              setCurrentChannelId,
              currentChannelId,
            })}
          </div>
          <Nav as="ul" id="channels-box" className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {renderChannels()}
          </Nav>
        </Col>
        <Col className="p-0 h-100">
          <MessageBox messages={messages} currentChannelId={currentChannelId} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
