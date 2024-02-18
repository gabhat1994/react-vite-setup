import { Chips } from '@/components/Chips/Chips';
import { useAuth } from '@/features/auth/contexts';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import SkeletonLoaderSkillElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderSkillElement';
import { ElementWrapper } from '../../ElementWrapper';
import { type SkillElementProps } from './types';
import { SkillItem, SkillListContainer } from './styles';

const SkillsViewElement = (props: SkillElementProps) => {
  const { user } = useAuth();
  const { isOwner, space } = useNoumContext();
  const skills = isOwner ? user?.skills : space?.uid?.skills || [];
  const { isLoading } = useSkeletonIsLoadingContext();
  if (isLoading) return <SkeletonLoaderSkillElement />;
  return (
    <>
      {skills && skills?.length > 0 && (
        <ElementWrapper {...props}>
          <SkillListContainer>
            {skills?.map((skill) => (
              <SkillItem key={skill?._id}>
                <Chips secondary size="large">
                  {skill?.name}
                </Chips>
              </SkillItem>
            ))}
          </SkillListContainer>
        </ElementWrapper>
      )}
    </>
  );
};

export default SkillsViewElement;
