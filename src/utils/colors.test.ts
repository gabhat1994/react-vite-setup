import { alertColor } from './colors';

describe('getAlertColor', () => {
  test('get Alert colors', () => {
    expect(alertColor.primary).toBe('var(--bg-snackbar-neutral-default)');
    expect(alertColor.success).toBe(
      'var(--bg-snackbar-success-primary-default)',
    );
    expect(alertColor.error).toBe('var(--bg-snackbar-danger-primary-default)');
    expect(alertColor.subtle).toBe('var(--bg-snackbar-neutral-light)');
  });
});
