import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import DefaultImage from '@/assets/images/chamber_default.png';
import { Utils } from '../utils';

type Props = {
  name: string;
  image: string;
  status?: string;
};

const BaseNOUMCard = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Profile = styled.img`
  height: 24px;
  width: 24px;
  border-radius: 8px;
`;

export const NOUMCard = ({ name, status, image = DefaultImage }: Props) => (
  <BaseNOUMCard>
    <Profile src={image || DefaultImage} alt="profile" />
    <TSpan font="body-m">{name}</TSpan>
    {status && (
      <TSpan font="body-m" colorToken="--text-input-neutral-default">
        <div
          style={{
            width: '3.5px',
            height: '3.5px',
            borderRadius: '3px',
            backgroundColor: 'var(--text-input-neutral-default)',
            marginTop: '-1px',
          }}
        />
      </TSpan>
    )}
    {status && (
      <TSpan font="body-m" colorToken="--text-input-neutral-default">
        {Utils.capitalizeFirstLetter(status)}
      </TSpan>
    )}
  </BaseNOUMCard>
);
