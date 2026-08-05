import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const KioskId = (): null => {
  const { kioskId } = useParams<{ kioskId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.localStorage) {
      console.log('no local storage');
    }

    if (kioskId) {
      localStorage.setItem('kiosk-id', kioskId);
      console.info('kiosk ID set', kioskId);
    }

    if (!localStorage.getItem('kiosk-id')) {
      console.log('No kiosk ID provided');
    }

    navigate('/');
  }, [kioskId, navigate]);

  return null;
};

export default KioskId;
