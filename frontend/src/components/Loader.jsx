import { Container, Row, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Loader = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">{t('homePage.loader')}</span>
        </Spinner>
      </Row>
    </Container>
  );
};

export default Loader;
