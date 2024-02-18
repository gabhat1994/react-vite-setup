const data = {
  story: {
    content: {
      Section_01: ['Section_01_0'],
      Section_02: ['Section_02_0', 'Section_02_1'],
    },
  },
};

module.exports = {
  async getCacheVersion() {
    return '1234';
  },

  async getHomePageMainPageLayout(_url) {
    return {
      data,
    };
  },
  async getArticleDetails(_url) {
    return {
      data,
    };
  },
  async getMoneyPageMainPageLayout(_url) {
    return {
      data,
    };
  },
  async getSignUpPageData(_url) {
    return {
      data,
    };
  },
  async getReferralPageContent(_url) {
    return {
      data,
    };
  },
  async getBannerContent(_url) {
    return {
      data,
    };
  },
};
