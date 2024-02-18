import { type NoumLinkFragment } from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { LinkedNoumContainer } from '../styles';
import NoumContent from './NoumContent';

type LinkedNoumsProps = {
  data: NoumLinkFragment[];
};
const LinkedNoums = ({ data }: LinkedNoumsProps) => (
  <LinkedNoumContainer>
    {data.map((value) => (
      <NoumContent
        key={value?._id}
        noumLinkId={value?._id ?? ''}
        noumsCount={value?.linkedNoums?.length ?? 0}
        linkedNoums={cleanList(value?.linkedNoums)}
        connectionsCount={value?.connectionsCount ?? 0}
        followersCount={value?.followersCount ?? 0}
        linkedAt={value?.linkedAt ?? new Date()}
        projectType={value?.projectType || undefined}
      />
    ))}
  </LinkedNoumContainer>
);

export default LinkedNoums;
