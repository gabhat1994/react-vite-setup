import { useEffect, useMemo, useState } from 'react';
import MoneyLayout from '@/layout/MoneyLayout';
import * as Storyblok from '@/services/rest/storyblok';
import { Spinner } from '@/components/Spinner';
import { useLaunchDarkly } from '@/hooks';
import FinancialSolutionHeader from './FinancialSolution/Content/FinancialSolutionHeader';
import MoneyWrapper, { SectionWarpper } from './styles';
import PaymentSideBar from './Payments/PaymentSideBar';
import PaymentMain from './Payments/PaymentMain';
import { type Content, type RootObject } from './types';
import HowItWorksSection from './FinancialSolution/HowItWorksSection/HowItWorksSection';
import NoumsForYouSection from './FinancialSolution/NoumsForYouSection/NoumsForYouSection';

const Money = () => {
  const [content, setContent] = useState<Content>();
  const { flags } = useLaunchDarkly();

  useEffect(() => {
    async function getContent() {
      const { data }: { data: RootObject } =
        await Storyblok.getMoneyPageMainPageLayout();
      setContent(data?.story?.content);
    }
    getContent();
  }, []);
  const noumIds = useMemo(() => {
    if (!content?.Money_Page_Layout[1]?.Description) return [];
    const idsArray = content?.Money_Page_Layout[1]?.Description.split(',').map(
      (_id) => _id.trim(),
    );
    return idsArray;
  }, [content]);

  if (!content) {
    return (
      <MoneyLayout
        type="Chambers"
        rightContent={<PaymentSideBar />}
        data-testid="money-layout"
      >
        <MoneyWrapper isAppUiV2={flags.newAppNavigation}>
          <Spinner />
        </MoneyWrapper>
      </MoneyLayout>
    );
  }
  return (
    <MoneyLayout
      type="Money"
      rightContent={<PaymentSideBar />}
      data-testid="money-layout"
    >
      <MoneyWrapper isAppUiV2={flags.newAppNavigation}>
        <FinancialSolutionHeader
          data={content?.Money_Page_Header[0] || undefined}
        />
        <SectionWarpper isAppUiV2={flags.newAppNavigation}>
          <PaymentMain />
        </SectionWarpper>
        <SectionWarpper isAppUiV2={flags.newAppNavigation}>
          <HowItWorksSection
            data={content?.Money_Page_Layout[0]}
            showOnlyNavigationIcons={true}
            showCategory={false}
          />
        </SectionWarpper>
        <SectionWarpper isAppUiV2={flags.newAppNavigation}>
          <NoumsForYouSection
            recommendedNoumIds={noumIds}
            storyBlockTitle={content?.Money_Page_Layout[1].Title || ''}
          />
        </SectionWarpper>
        <SectionWarpper isAppUiV2={flags.newAppNavigation}>
          <HowItWorksSection
            data={content?.Money_Page_Layout[2]}
            showOnlyNavigationIcons={true}
          />
        </SectionWarpper>
      </MoneyWrapper>
    </MoneyLayout>
  );
};

export default Money;
