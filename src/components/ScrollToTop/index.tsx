import { type CSSProperties, useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';
import './index.css';
import useEvent from '@/hooks/useEvent';

const ANIMATION_TIME = 1000; // ms
const style = {
  position: 'fixed',
  bottom: '24px',
  right: '24px',
  width: '56px',
  height: '56px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'visibility 0.3s forward',
  backgroundColor: 'var(--bg-button-floating-neutral-alt-default)',
  borderRadius: '16px',
  boxShadow: '1px 0px 0px var(--shadow-neutral-alt-default)',
  cursor: 'pointer',
} as CSSProperties;

const ScrollToTopNoum = () => {
  const [className, setClassName] = useState('hidden');

  const scrollToTop = () => {
    hideButton();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleVisibility = useEvent(() => {
    if (window.scrollY > 120) {
      if (className === 'hidden') showButton();
      return;
    }
    if (className === 'visible') {
      hideButton();
    }
  });

  const showButton = () => {
    setClassName('fadeInEffect');
    setTimeout(() => {
      setClassName('visible');
      toggleVisibility();
    }, ANIMATION_TIME);
  };

  const hideButton = () => {
    setClassName('fadeOutEffect');
    setTimeout(() => {
      setClassName('hidden');
      toggleVisibility();
    }, ANIMATION_TIME);
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={`${className} desktop-only`}
      style={style}
      onClick={scrollToTop}
    >
      <Icon name="arrow_up_m" size={24} color="--icon-button-neutral-default" />
    </div>
  );
};
export default ScrollToTopNoum;
