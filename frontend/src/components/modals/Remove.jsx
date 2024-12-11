import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import routes from '../../routes';
import { setCurrentChannel } from '../../services/uiSlice';
import { removeChannel } from '../../services/channelsSlice';
import getAuthHeader from '../../utils/utils';

const Remove = ({ onHide, currentChannelId, setCurrentChannelId, modalInfo: { item } }) => {
  const dispatch = useDispatch();
  const defaultChannelId = useSelector((state) => state.ui.defaultChannelId);
  const { t } = useTranslation();

  const notify = () => toast.success(t('toasts.removeChannel'));
  const notifyError = (type) => {
    switch (type) {
      case 'FETCH_ERROR':
        return toast.error(t('toasts.fetchError'));
      default:
        return toast.error(t('toasts.otherError'));
    }
  };

  const handleRemoveChannel = async () => {
    try {
      await axios.delete(routes.channelPath(item), getAuthHeader());
      notify();
      setCurrentChannelId(defaultChannelId);
      dispatch(removeChannel(currentChannelId));
      dispatch(setCurrentChannel(defaultChannelId));
    } catch (err) {
      console.log('err.isAxiosError: ', err.isAxiosError);
      console.log('err.response.status: ', err.response.status);
      console.log('err: ', err);
      notifyError(err.status);
    }

    onHide();
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title className="h4">{t('modal.remove.heading')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('modal.remove.body')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={onHide}>
            {t('modal.cancelBtn')}
          </Button>
          <Button variant="danger" onClick={handleRemoveChannel}>
            {t('modal.remove.submitBtn')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
