import { render } from '@/test-utils';
import SkeletonLoaderCalendarElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderCalendarElement';
import SkeletonLoaderConnectionsElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderConnectionsElement';
import SkeletonLoaderElementHeader from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderElementHeader';
import SkeletonLoaderHeaderSubElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderHeaderSubElement';
import SkeletonLoaderDocumentElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderDocumentElement';
import SkeletonLoaderHoumHeader from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderHoumHeader';
import SkeletonLoaderImageElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderImageElement';
import SkeletonLoaderMessageElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderMessageElement';
import SkeletonLoaderNetworkElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderNetworkElement';
import SkeletonLoaderParagraph from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderParagraph';
import SkeletonLoaderPostElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderPostElement';
import SkeletonLoaderProjectsWorkExperienceElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderProjectsWorkExperienceElement';
import { SkeletonLoaderQuickQuestionElement } from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderQuickQuestionElement';
import SkeletonLoaderSkillElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderSkillElement';
import SkeletonLoaderTextElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderTextElement';
import SkeletonLoaderWalletElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderWalletElement';
import SkeletonLoaderBusinessBriefElement from './SkeletonLoaderBusinessBriefElement';

[
  SkeletonLoaderBusinessBriefElement,
  SkeletonLoaderCalendarElement,
  SkeletonLoaderConnectionsElement,
  SkeletonLoaderDocumentElement,
  SkeletonLoaderElementHeader,
  SkeletonLoaderHeaderSubElement,
  SkeletonLoaderHoumHeader,
  SkeletonLoaderImageElement,
  SkeletonLoaderMessageElement,
  SkeletonLoaderNetworkElement,
  SkeletonLoaderParagraph,
  SkeletonLoaderPostElement,
  SkeletonLoaderProjectsWorkExperienceElement,
  SkeletonLoaderQuickQuestionElement,
  SkeletonLoaderSkillElement,
  SkeletonLoaderTextElement,
  SkeletonLoaderWalletElement,
].map((Element) =>
  describe(`Skeleton Loader Element ${Element.name}`, () => {
    test('Testing for rendering', () => {
      const { container } = render(<Element />);
      expect(container).toBeTruthy();
    });
  }),
);
