import { type FC, useCallback, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { cssVar, rgba } from 'polished';
import { Spacer } from '@/layout';
import { useToast } from '@/hooks/toast';
import errors from '@/constants/errors';
import { Icon } from '../Icon';
import { CircleProgressBar } from '../ProgressBar';
import { type AlertProps } from './types';
import {
  Message,
  Container,
  DismissIconButton,
  DismissTextButton,
} from './styles';

export const Alert: FC<AlertProps> = ({
  id,
  type,
  message,
  autoHideTime,
  autoHideDisable,
  buttonType = 'none',
  width,
}) => {
  const { t } = useTranslation();
  const { removeToast } = useToast();
  const [pct, setPct] = useState<number>(1);
  const [out, setOut] = useState<boolean>(false);

  const handleDismiss = useCallback(() => {
    setOut(true);
    const timeout = setTimeout(() => {
      removeToast(id);
      clearTimeout(timeout);
    }, 300);
  }, [id, removeToast]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    let timeout: NodeJS.Timeout;

    if (!autoHideDisable && autoHideTime) {
      interval = setInterval(() => {
        setPct((old) => old + (200 * 100) / autoHideTime);
      }, 200);

      timeout = setTimeout(() => {
        handleDismiss();

        clearInterval(interval);
        clearTimeout(timeout);
      }, autoHideTime);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [autoHideTime, autoHideDisable, handleDismiss]);

  return (
    <Container
      data-testid="alert-container"
      type={type}
      out={out}
      align="center"
      justify="space-between"
      width={width}
    >
      <Message
        font="body-m-bold"
        colorToken="--text-snackbar-neutral-alt-default"
        type={type}
      >
        {message === errors.BLOCKED_IP ? (
          <Trans
            i18nKey="noumena.login.error.blocked_IP"
            values={{ email: 'support@noumena.pro' }}
            components={{
              newline: <br />,
              link1: (
                <a href="mailto:support@noumena.pro">support@noumena.pro</a>
              ),
            }}
          />
        ) : (
          message
        )}
      </Message>
      {buttonType !== 'none' && <Spacer width={12} />}
      {buttonType === 'icon' && (
        <DismissIconButton align="center" justify="center">
          <div id="cpb-container">
            <CircleProgressBar
              percentage={pct}
              isLabel={false}
              backgroudColor={rgba(cssVar('--shadow-neutral-dark'), 0.1)}
              color={
                type !== 'subtle'
                  ? 'var(--icon-snackbar-neutral-alt-default)'
                  : 'var(--icon-snackbar-neutral-default)'
              }
              circleSize={22}
              barSize={2}
              transTime={200}
            />
          </div>
          <div id="button-container">
            <Icon
              name="close_s"
              size={20}
              onClick={handleDismiss}
              color="--icon-button-neutral-alt-default"
            />
          </div>
        </DismissIconButton>
      )}
      {buttonType === 'label' && (
        <DismissTextButton align="center" justify="center">
          <Message
            font="body-m"
            colorToken="--text-snackbar-neutral-alt-default"
            type={type}
            onClick={handleDismiss}
          >
            {t('noumena.close.upper_case')}
          </Message>
        </DismissTextButton>
      )}
    </Container>
  );
};

export default Alert;
