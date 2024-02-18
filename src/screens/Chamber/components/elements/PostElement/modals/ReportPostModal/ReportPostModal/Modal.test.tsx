import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, waitFor } from '@/test-utils';
import { type ReportPostProps } from './types';
import { ReportPostModal } from './Modal';

const repotPostProps: ReportPostProps = {
  postId: 'post_id',
  onClose: vi.fn(),
};

describe('<ReportPost />', () => {
  test('renders', async () => {
    const { container, getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ReportPostModal {...repotPostProps} />
      </ApolloProvider>,
    );

    await waitFor(() => {
      expect(container).toBeTruthy();
    });

    const reportPostModal = getByTestId('report_post');
    const reportHeader = getByTestId('report_header');
    const reportBtn = getByTestId('report_submit_btn');
    const reportReasonContainer = getByTestId('report_reason_wrapper');

    expect(reportPostModal).toBeTruthy();
    expect(reportHeader).toBeTruthy();
    expect(reportBtn).toBeTruthy();
    expect(reportReasonContainer).toBeTruthy();
  });
});
