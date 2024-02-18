import { NetworkStatus } from '@apollo/client';
import { ElementWrapperV2 } from '@/screens/Chamber/components/ElementWrapperV2';
import SkeletonLoaderFileManagerBody from '../../../SkeletonLoader/SkeletonLoaderFileManagerBody';
import { useFileManagerElementContext } from '../../providers/FileManagerElementProvider';
import FileListItem from '../FileListItem';
import EmptyState from './EmptyState';
import S from './styles';

type FileListProps = {
  maxFilesToDisplay?: number;
};

const FileList: React.FC<FileListProps> = ({ maxFilesToDisplay }) => {
  const { files, networkStatus, hasFiles, searchQuery } =
    useFileManagerElementContext();

  return (
    <S.ListWrapper>
      {!hasFiles ? (
        networkStatus === NetworkStatus.ready ? (
          <EmptyState isSeachResult={!!searchQuery} />
        ) : (
          <SkeletonLoaderFileManagerBody />
        )
      ) : (
        <S.Container fullWidth>
          {files
            .slice(0, maxFilesToDisplay || files.length)
            .map((file, index) => (
              <ElementWrapperV2.BodyListItemWrapper
                key={file._id}
                type="file"
                isLastItem={index === files.length - 1}
                index={index}
              >
                <FileListItem file={file} />
              </ElementWrapperV2.BodyListItemWrapper>
            ))}
        </S.Container>
      )}
    </S.ListWrapper>
  );
};

export default FileList;
