import { usePostQuery } from '@/apollo/graphql';
import { Spinner } from '@/components/Spinner';
import { NoumAuthorizationProvider } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useNoumDetails } from '@/features/noums/hooks/noums';
import { Stack } from '@/layout';
import SinglePageLayout from '@/layout/SinglePageLayout';
import { useThemeContext } from '@/providers/ThemeProvider';
import { DefaultFonts } from '@/screens/Chamber/components/ThemePanel/constants';
import { PostItem } from '@/screens/Chamber/components/elements/PostElement/components/PostItem';
import { useNavigate } from 'react-router';
import { useParams, useSearchParams } from 'react-router-dom';
import { getNoumDetailPath } from '@/utils/routes';
import { PostElementProvider } from '../Chamber/components/elements/PostElement/PostElementProvider';
import { CardContainer } from './styles';

export const SinglePost = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { setSelectedThemeId, setSelectedFonts } = useThemeContext();
  const { data, loading, refetch } = usePostQuery({
    variables: {
      _id: id,
    },
    fetchPolicy: 'cache-and-network',
    onError(error) {
      if (error.graphQLErrors[0].extensions.code === 'INTERNAL_SERVER_ERROR') {
        navigate(-1);
      }
    },
    onCompleted(postData) {
      if (!postData?.post?.chamber) {
        return;
      }
      const { theme, fonts } = postData.post.chamber;
      if (theme && theme?._id) {
        setSelectedThemeId(theme?._id);
      } else {
        setSelectedThemeId(undefined);
      }
      if (fonts && typeof fonts === 'object' && Object.keys(fonts).length > 0) {
        setSelectedFonts(fonts);
      } else {
        setSelectedFonts(DefaultFonts);
      }
    },
  });

  const handleRefetch = async () => {
    refetch();
  };

  const noumId = searchParams.get('noumId') ?? '';
  const { space } = useNoumDetails(noumId);

  if (loading && !data?.post?._id) {
    return <Spinner />;
  }

  if (!data?.post?._id) {
    return <></>;
  }

  return (
    <NoumAuthorizationProvider noumId={space?._id}>
      <SinglePageLayout
        showBackButton
        responsiveMain
        goBackUrl={getNoumDetailPath(noumId)}
      >
        <Stack fullWidth align="center" justify="center">
          <CardContainer>
            <PostElementProvider space={space}>
              <PostItem.Content
                data={data?.post}
                pageView
                refetch={handleRefetch}
              />
            </PostElementProvider>
          </CardContainer>
        </Stack>
      </SinglePageLayout>
    </NoumAuthorizationProvider>
  );
};

export default SinglePost;
