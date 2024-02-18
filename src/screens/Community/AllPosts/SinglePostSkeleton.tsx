import FooterActions from '@/screens/Chamber/components/elements/FooterActions/FooterActions';
import Skeleton from 'react-loading-skeleton';
import { UserAvatar } from '../components/Avatar';
import {
  ElementCnt,
  IconCnt,
  StyledName,
  TimeText,
  Wrapper,
  WrapperColumn,
} from './styles';

export const SinglePostSkeleton = () => (
  <ElementCnt data-testid="SinglePostWrap" isMarginTop>
    <Wrapper>
      <UserAvatar user={undefined} />
      <WrapperColumn>
        <StyledName isActive={false}>
          <Skeleton />
        </StyledName>
        <Wrapper>
          <TimeText>
            <Skeleton height="10px" width="120px" />
          </TimeText>
        </Wrapper>
      </WrapperColumn>
      <IconCnt>
        <Skeleton
          width="24px"
          height="16px"
          style={{
            position: 'relative',
            bottom: '10px',
            marginLeft: '8px',
          }}
        />
      </IconCnt>
    </Wrapper>
    <Wrapper>
      <div style={{ display: 'block', flex: 1 }}>
        <Skeleton count={3} />
      </div>
    </Wrapper>
    <FooterActions
      handleComment={() => {}}
      handleLike={() => {}}
      isSkeletonVisible={true}
    />
  </ElementCnt>
);
