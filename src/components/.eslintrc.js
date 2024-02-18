module.exports = {
  extends: '../../.eslintrc.js',
  rules: {
    'import/no-restricted-paths': [
      // TODO: Change to "error" when all feature-related components are moved to appropriate folders.
      'error',
      {
        zones: [
          {
            target: 'src/components',
            from: 'src/features',
            message:
              "\n\nShared components can't rely on feature-specific things. If you need to import from a feature, move your component to @/features/name/components.",
          },
          {
            target: 'src/components',
            from: 'src/screens',
            message:
              "\n\nShared components can't rely on screen-specific things. If you need to import from a screen, move your component to @/screens/name/components.",
          },
          {
            target: 'src/components',
            from: ['src/apollo', 'src/services/rest'],
            message:
              "\n\nShared components can't rely on API-specific things. If you need to import something from an API-related folder, it means your component is not generic and presentational-only and should be moved to a feature.",
          },
        ],
      },
    ],
  },
};
