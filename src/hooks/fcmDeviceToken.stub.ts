export function useFCMDeviceToken() {
  return {
    loading: false,
    fcmToken: 'fake-token',
    getToken: vi.fn(),
    refreshToken: vi.fn(),
    registerToken: vi.fn(),
    unregisterToken: vi.fn(),
  };
}
