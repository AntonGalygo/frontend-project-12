import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { selectors as channelsSelectors, addChannel } from '../../services/channelsSlice.js';
import routes from '../../routes';
import { setCurrentChannel } from '../../services/uiSlice';
import getAuthHeader from '../../utils/utils.js';
import { getChannelSchema } from '../../utils/validate';

const Add = ({ onHide, setCurrentChannelId }) => {
  const channels = useSelector(channelsSelectors.selectAll);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getChannelSchema(channels, t),
    onSubmit: async (values) => {
      const notifySuccess = () => toast.success(t('toasts.createChannel'));
      const notifyError = (type) => {
        switch (type) {
          case 'FETCH_ERROR':
            return toast.error(t('toasts.fetchError'));
          default:
            return toast.error(t('toasts.otherError'));
        }
      };
      try {
        const { data } = await axios.post(routes.channelsPath(), values, getAuthHeader());
        notifySuccess();
        setCurrentChannelId(data.id);
        dispatch(addChannel(data));
        dispatch(setCurrentChannel(data.id));
      } catch (err) {
        formik.setSubmitting(false);

        notifyError(err.status);
        console.log('err: ', err);
        throw err;
      }
      onHide();
    },
  });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title className="h4">{t('modal.add.heading')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              id="name"
              className={`mb-2 ${formik.errors.name && 'is-invalid'}`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="off"
              required
              ref={inputRef}
            />
            <Form.Label className="visually-hidden" htmlFor="name">
              {t('modal.name')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={onHide}>
              {t('modal.cancelBtn')}
            </Button>
            <Button type="submit" variant="primary">
              {t('modal.submitBtn')}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
