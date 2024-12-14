import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import routes from '../../routes';
import { selectors as channelsSelectors, updateChannel } from '../../services/channelsSlice';
import getAuthHeader from '../../utils/utils';
import { getChannelSchema } from '../../utils/validate';

const Rename = ({ onHide, currentChannelId }) => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const inputRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    // Используем setTimeout, чтобы гарантировать, что элемент полностью смонтирован
    setTimeout(() => inputRef.current && inputRef.current.select(), 0);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema: getChannelSchema(channels, t),
    enableReinitialize: true,
    onSubmit: async (values) => {
      const nostifySuccess = () => toast.success(t('toasts.renameChannel'));
      try {
        nostifySuccess();
        const newChannel = { changes: { name: values.name }, id: currentChannelId };
        await axios.patch(routes.channelPath(currentChannelId), values, getAuthHeader());
        dispatch(updateChannel(newChannel));
        onHide();
      } catch (err) {
        formik.setSubmitting(false);
        throw err;
      }
    },
  });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title className="h4">{t('modal.rename.heading')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              autoComplete="off"
              name="name"
              id="name"
              className={`mb-2 ${formik.errors.name && 'is-invalid'}`}
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
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

export default Rename;
