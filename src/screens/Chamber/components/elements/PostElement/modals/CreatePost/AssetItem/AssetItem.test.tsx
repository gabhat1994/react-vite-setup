import { PostCategory } from '@/apollo/generated/types';
import { render, fireEvent, act, waitFor } from '@/test-utils';
import { AssetItem } from './AssetItem';
import { type AssetItemProps } from './types';

describe('<AssetItem />', () => {
  const props: AssetItemProps = {
    url: 'https://www.w3schools.com/howto/img_avatar2.png',
    index: 0,
    filetype: PostCategory.Image,
    onDelete: vi.fn(),
  };

  afterAll(() => {
    vi.clearAllMocks();
  });

  test('renders', async () => {
    const { getByTestId } = render(<AssetItem {...props} />);
    const containerEle = getByTestId('asset_item');
    const avatarEle = getByTestId('avatarContainer');
    const imageEle = getByTestId('avatarImage');
    const deleteBtnEle = getByTestId('asset_delete_btn');

    expect(containerEle).toBeTruthy();
    expect(avatarEle).toBeTruthy();
    expect(imageEle).toBeTruthy();
    expect(deleteBtnEle).toBeTruthy();

    act(() => {
      fireEvent.click(deleteBtnEle);
    });

    await waitFor(() => {
      expect(props.onDelete).toHaveBeenCalled();
    });
  });
});
