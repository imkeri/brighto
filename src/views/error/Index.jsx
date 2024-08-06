import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import NotFoundImage from "@assets/img/layout/not-found.avif"; // Adjust the path to your 404 image if needed

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <img src={NotFoundImage} alt="404 Not Found" className="w-1/4 mx-auto" />
        <h1 className="text-4xl font-bold text-brand-900  mb-4">{t('notFound.title')}</h1>
        <p className="text-lg text-gray-600 mb-4">{t('notFound.message')}</p>
        <Link to="/" className="text-brand-800 underline text-lg">
          {t('notFound.backToHome')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
