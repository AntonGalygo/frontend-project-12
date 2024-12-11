import { Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <Image fluid className="h-25" alt="Страница не найдена" src="/images/not-found-avatar.svg" />
      <h1 className="h4 text-muted">{t('notFoundPage.heading')}</h1>
      <p className="text-muted">
        {t('notFoundPage.body')}
        <Link to="/">{t('notFoundPage.homeLink')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
