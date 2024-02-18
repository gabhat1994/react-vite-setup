import axios from 'axios';
import getApiUrl from '@/apollo/getApiUrl';
import ReferenceService from './reference';

const API_URL = `${getApiUrl()}/chamber/v2`;
vi.mock('axios');

const mockedAxios = vi.mocked(axios, true);

describe('ReferenceService', () => {
  beforeEach(() => {
    mockedAxios.post.mockReset();
  });

  it('fillOutReferenceByExternalUser', async () => {
    const referenceText = 'This is a reference text';
    const referenceToken = 'token';
    const capacity = 'Co-Worker';
    const imageUrl =
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60';
    mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));
    await ReferenceService.fillOutReferenceByExternalUser({
      referenceText,
      referenceToken,
      capacity,
      imageUrl,
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://noudev-api.noumenati.com/chamber/v2/noum-references/external',
      {
        capacity,
        referenceText,
        imageUrl,
      },
      {
        headers: {
          'x-reference-token': referenceToken,
        },
      },
    );
  });

  describe('getNoumReferenceMetadata', () => {
    it('should call getNoumReferenceMetadata', async () => {
      const token = 'asmasklasklaksl';
      mockedAxios.get.mockImplementationOnce(() => Promise.resolve({}));
      await ReferenceService.getNoumReferenceMetadata(token);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${API_URL}/noum-references/metadata`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-reference-token': token,
          },
        },
      );
    });
  });
});
