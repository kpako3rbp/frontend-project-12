import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h1 className="h4 text-muted">{t('notFoundPage.pageNotFound')}</h1>
      <p className="text-muted">
        {t('notFoundPage.youcan')}
        &nbsp;
        <Link to="/">{t('notFoundPage.mainPage')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
