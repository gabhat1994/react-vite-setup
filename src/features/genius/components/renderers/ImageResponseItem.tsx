import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Icon, Spinner } from '@/components';
import S from './styles';
import { useGeniusContext } from '../../contexts/GeniusContextProvider';

type ImageResponseItemProps = {
  src: string;
  index: number;
};

export const ImageResponseItem: React.FC<ImageResponseItemProps> = ({
  src,
  index,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { selectImage, selectedIndex } = useGeniusContext();

  return (
    <AnimatePresence>
      <S.ImageContainer
        selected={selectedIndex === index}
        onClick={() => selectImage(index)}
      >
        {selectedIndex === index && (
          <S.CheckIconContainer>
            <Icon
              name="check_xs"
              color="--icon-button-neutral-alt-default"
              size={24}
            />
          </S.CheckIconContainer>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          transition={{ delay: 0.5 }}
          animate={{
            opacity: isLoaded ? 1 : 0,
          }}
        >
          <S.StyledImage src={src} onLoad={() => setIsLoaded(true)} />
        </motion.div>
        {!isLoaded && <Spinner />}
      </S.ImageContainer>
    </AnimatePresence>
  );
};
