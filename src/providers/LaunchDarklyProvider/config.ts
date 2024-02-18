// No matter how the feature flag is called in LD admin panel, it's always converted to camelCase automatically.
export const featureFlagNames = [
  'broadcast',
  'campaigns',
  'contacts',
  'contractTool',
  'cqInHomeNoumsProfile',
  'customNoums',
  'discoveryNewNoums',
  'elementPermission',
  'enableNewWalletFlow',
  'filesManager',
  'invoiceTool',
  'messageLinkPreviews',
  'newAppNavigation',
  'nonNmUsers',
  'noumAds',
  'noumCoManager',
  'noumCustomPreivewV2',
  'noumDashboardMetrics',
  'noumEditor2',
  'noumRequestsInvitesV2',
  'noumsSocialHall',
  'payments',
  'paymentSubscriptions',
  'postRte',
  'principlesYou',
  'quickConsult',
  'references',
  'shInstantEvent',
  'socialHallMessaging',
  'socialHallVideoCall',
  'webTips',
  'newSignUp',
  'createNewEventV2',
  'postItemTimestamp',
  'socialhallUniqueLink',
  /* @deprecated Use individual flags for each type */
  'geniusCompletion',
  'geniusCompletionText',
  'geniusCompletionImage',
] as const;

export const defaultFeatureFlags = featureFlagNames.reduce(
  (acc, name) => ({ ...acc, [name]: false }),
  {} as FeatureFlagsMap,
);

type FeatureFlagName = typeof featureFlagNames[number];
export type FeatureFlagsMap = Record<FeatureFlagName, boolean>;
