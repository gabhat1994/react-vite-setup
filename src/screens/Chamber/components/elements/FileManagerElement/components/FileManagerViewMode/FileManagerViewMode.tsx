import { NetworkStatus } from '@apollo/client';
import FilePreviewModal from '@/screens/Chamber/components/modals/FilePreviewModal';
import FileUploadModal from '@/screens/Chamber/components/modals/FileUploadModal';
import FileManagerDeleteModal from '@/screens/Chamber/components/modals/FileManagerDeleteModal';
import FileManagerShowAllModal from '@/screens/Chamber/components/modals/FileManagerShowAllModal';
import SkeletonLoaderFileManagerElement from '../../../SkeletonLoader/SkeletonLoaderFileManagerElement';
import { useFileManagerElementContext } from '../../providers/FileManagerElementProvider';
import FileManagerHeader from '../FileManagerHeader';
import FileManagerBody from '../FileManagerBody';

const FileManagerViewMode = () => {
  const {
    showAddFileModal,
    setShowAddFileModal,
    showEditFileModalId,
    setShowEditFileModalId,
    showDeleteFileModalId,
    setShowDeleteFileModalId,
    files,
    showFilePreviewModalId,
    setShowFilePreviewModalId,
    loading,
    networkStatus,
    showAllFilesModal,
    hasFiles,
    setShowAllFilesModal,
  } = useFileManagerElementContext();

  if (loading && !hasFiles && networkStatus !== NetworkStatus.setVariables)
    return <SkeletonLoaderFileManagerElement />;

  return (
    <>
      <>
        <FileManagerHeader />
        <FileManagerBody />
      </>
      {!!showFilePreviewModalId && (
        <FilePreviewModal
          isOpen={!!showFilePreviewModalId}
          handleClose={() => setShowFilePreviewModalId(null)}
          file={files.find(({ _id }) => showFilePreviewModalId === _id)}
        />
      )}

      {showAddFileModal && (
        <FileUploadModal
          isOpen={showAddFileModal}
          handleClose={() => {
            setShowAddFileModal(false);
          }}
        />
      )}

      {!!showEditFileModalId && (
        <FileUploadModal
          isOpen={!!showEditFileModalId}
          file={files.find(({ _id }) => _id === showEditFileModalId)}
          handleClose={() => {
            setShowEditFileModalId(null);
          }}
        />
      )}

      {!!showDeleteFileModalId && (
        <FileManagerDeleteModal
          isOpenModal={!!showDeleteFileModalId}
          onClose={() => setShowDeleteFileModalId(null)}
          onConfirm={() => {
            setShowDeleteFileModalId(null);
            setShowFilePreviewModalId(null);
          }}
          fileId={showDeleteFileModalId}
        />
      )}
      {showAllFilesModal && (
        <FileManagerShowAllModal
          isOpenModal={showAllFilesModal}
          onClose={() => setShowAllFilesModal(false)}
        />
      )}
    </>
  );
};
export default FileManagerViewMode;
