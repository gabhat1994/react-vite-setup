import React, { useEffect, useState, useRef } from 'react';

import { EDITOR_ID } from '../../constants';

interface Props {
  editorUUID: string;
  children: React.ReactNode;
}

export const InitializerWrapper: React.FC<Props> = ({
  editorUUID,
  children,
}) => {
  const timer = useRef<NodeJS.Timer | null>(null);

  const [contentLoaded, setContentLoaded] = useState<boolean>(false);

  useEffect(() => {
    timer.current = setInterval(() => {
      const qlEditor = document.querySelector(
        `#${EDITOR_ID}-${editorUUID} .ql-editor`,
      );
      if (qlEditor) {
        setContentLoaded(true);
      }
    }, 50);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [editorUUID]);

  useEffect(() => {
    if (contentLoaded && timer.current) {
      clearInterval(timer.current);
    }
  }, [contentLoaded]);

  if (contentLoaded) return <>{children}</>;

  return null;
};
