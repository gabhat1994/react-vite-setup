import { Dropdown } from '@/components/Dropdown';
import { ModalBody } from '@/components/ExtendedModal';
import { Icon } from '@/components/Icon';
import { TextField } from '@/components/TextField';
import { TSpan } from '@/components/Typography';
import { PostMention } from '@/features/posts/components';
import { useBreakpoints, useLaunchDarkly } from '@/hooks';
import { Stack } from '@/layout';
import { t } from 'i18next';
import generate from 'uniqid';
import PostRichTextEditor from '../../components/PostRichTextEditor';
import { AssetItem } from './AssetItem';
import PostModalUserInfo from './PostModalUserInfo';
import {
  EditorContainer,
  ImageContainers,
  StyledTextAreaContainer,
  VisibilitySelect,
} from './styles';
import { type CreatePostBodyProps } from './types';

const PostModalBody = (props: CreatePostBodyProps) => {
  const {
    images,
    showVisibility,
    options,
    postVisibility,
    setPostVisibility,
    text,
    setText,
    addTag,
    categories,
    handleDeleteAssetItem,
    overflow,
    onClipboard,
    post,
    setRawJson,
  } = props;
  const {
    flags: { postRte },
  } = useLaunchDarkly();
  const { isMobile } = useBreakpoints();

  return (
    <ModalBody overflow={overflow}>
      <EditorContainer
        fullWidth
        vertical
        data-testid="post_editor_container"
        isRTE={postRte}
        gap={16}
      >
        <Stack fullWidth justify="space-between" align="center" gap={16}>
          <PostModalUserInfo />
          {!isMobile && showVisibility && (
            <VisibilitySelect data-testid="post_visibility_selector">
              <TSpan font="footnote" colorToken="--text-input-neutral-default">
                {t('noumena.chambers.element.posts.visible_for')}
              </TSpan>
              <Dropdown
                hideIcons
                placement="bottom-start"
                options={options}
                inputValue={postVisibility?.value || undefined}
                onSelectOption={(option) => setPostVisibility(option)}
                usePortal={false}
                containerWidth="211px"
                minHeight="100px"
              >
                {({ inputProps, inputRef, toggle }) => (
                  <TextField
                    readOnly
                    {...inputProps}
                    ref={inputRef}
                    value={String(postVisibility.label)}
                    spellCheck="false"
                    rightIcon={
                      <Icon
                        name="chevron_down_m"
                        color="--icon-input-neutral-default"
                        size={16}
                        onClick={toggle}
                      />
                    }
                  />
                )}
              </Dropdown>
            </VisibilitySelect>
          )}
        </Stack>

        <StyledTextAreaContainer>
          {postRte ? (
            <PostRichTextEditor
              initialData={post}
              onSetEditorValue={setText}
              onSetEditorRawValue={setRawJson}
              isEdit={true}
            />
          ) : (
            <PostMention
              val={text}
              setVal={setText}
              addTag={addTag}
              isTextArea
              isFullHeight
              autoFocus
              placeholder={t('noumena.chambers.element.posts.text_placeholder')}
              error={false}
              minHeight={350}
              maxHeight={350}
              textAreaHeight={350}
              onClipboard={onClipboard}
            />
          )}
        </StyledTextAreaContainer>
        {images.length > 0 && (
          <ImageContainers>
            {images.map((image, idx) => (
              <AssetItem
                index={idx}
                key={generate()}
                url={image}
                filetype={categories[idx]}
                onDelete={handleDeleteAssetItem}
              />
            ))}
          </ImageContainers>
        )}
      </EditorContainer>
    </ModalBody>
  );
};

export default PostModalBody;
