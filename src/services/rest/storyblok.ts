import StoryblokClient from 'storyblok-js-client';
import getStoryblokEnv from './utils/getStoryblokEnv';

const { env, token } = getStoryblokEnv();

const version = env === 'prod' ? 'published' : 'draft';

const urls = {
  cv: `cdn/spaces/me?token=${token}`,
  homePageMainPageLayout: `cdn/stories/home-page/${env}/main-page-layout`,
  moneyPageMainPageLayout: `cdn/stories/money-page/${env}/money-page-layout`,
  getArticleDetails: `cdn/stories`,
  getSignUpPageData: `cdn/stories/sign-up-page/${env}`,
  getReferralPageContent: `cdn/stories/referral-page/${env}/referral-page-content`,
  getBannerContent: `cdn/stories/banner/${env}/content`,
};

const StoryblokInstance = new StoryblokClient({ accessToken: token });

export const getHomePageMainPageLayout = async () =>
  StoryblokInstance.get(urls.homePageMainPageLayout, { version });

export const getArticleDetails = async (articleUrl: string) =>
  StoryblokInstance.get(`${urls.getArticleDetails}/${articleUrl}`, { version });

export const getMoneyPageMainPageLayout = async () =>
  StoryblokInstance.get(urls.moneyPageMainPageLayout, { version });

export const getSignUpPageData = async (referralCode: string) =>
  StoryblokInstance.get(`${urls.getSignUpPageData}/${referralCode}`, {
    version,
  });

export const getReferralPageContent = async () =>
  StoryblokInstance.get(`${urls.getReferralPageContent}`, { version });

export const getBannerContent = async () =>
  StoryblokInstance.get(`${urls.getBannerContent}`, { version });
