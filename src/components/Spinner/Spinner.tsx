import { useRef, useEffect } from 'react';
import { Spinner as SpinnerJS } from 'spin.js';
import Span from './styles';

const Spinner = ({
  color,
  zIndex = 10,
}: {
  color?: string;
  zIndex?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const spinConfig = {
      width: 1,
      radius: 5,
      length: 5,
      color: color ?? 'var(--icon-spinner-brand-primary-highlighted)',
    };

    const spinner = new SpinnerJS(spinConfig);
    if (ref.current) {
      spinner.spin(ref.current);
    }
  }, [color]);

  return <Span zIndex={zIndex} data-testid="spinner" ref={ref} />;
};

export { Spinner };

export default Spinner;
