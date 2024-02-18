import {
  type FC,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { t } from 'i18next';
import ImageElement from '@/screens/Chamber/components/elements/ImageElement';
import VideoElement from '@/screens/Chamber/components/elements/VideoElement';
import {
  type ElementInput,
  ElementStatusEnum,
  ElementTypeEnum,
  SpaceTypeEnum,
} from '@/apollo/generated/types';
import { ElementUtils } from '@/utils/element';
import { HomeChambers } from '@/features/homeNoums/components/HomeChambers';
import { CalendarElement } from '@/screens/Chamber/components/elements/CalendarEvent/CalendarElement/CalendarElement';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import BusinessBrief from '@/screens/Chamber/components/elements/BusinessBrief/BusinessBrief';
import TextElement from '@/screens/Chamber/components/elements/TextElement';
import MessageElementV2 from '@/screens/Chamber/components/elements/MessageElementV2';
import WalletElement from '@/screens/Chamber/components/elements/WalletElement';
import QuickQuestionsElement from '@/screens/Chamber/components/elements/QuickQuestionsElement';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { DisablePublishOrDraftContext } from '@/providers';
import SkeletonLoaderProvider, {
  useSkeletonIsLoadingContext,
} from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { NoumElementProvider } from '@/features/noums/contexts/NoumElementContext';
import { useUpdateElementHelper } from '@/features/noums/hooks/spaceQuery';
import PostElement from '@/screens/Chamber/components/elements/PostElement';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { SpaceUtils } from '@/utils/space';
import NetworkElement from '../elements/NetworkElement';
import SkillElement from '../elements/SkillElement';
import {
  type ElementProps,
  type HomeChambersElementsProps,
  type HomeChambersEnum,
  type TitleProps,
  type TypeEnum,
  type ChangeMeta,
} from './types';
import FileManagerElement from '../elements/FileManagerElement';
import ContractManagerElement from '../elements/ContractManagerElement';
import { useNoumContext } from '../../ViewChamber/ChamberProvider';

const homeChambersElements: HomeChambersElementsProps = {
  [ElementTypeEnum.PublicationDesignPatterns]: {
    image: 'bulb_m',
    text: 'No Publications, Designs or Patents Added Yet',
    buttonText: 'Add New',
  },
  [ElementTypeEnum.EducationTraining]: {
    image: 'education_m',
    text: 'No Education Added Yet',
    buttonText: 'Add Education',
  },
  [ElementTypeEnum.AchievementAward]: {
    image: 'avard_m',
    text: 'No Achievements Added Yet',
    buttonText: 'Add Achievement',
  },
  [ElementTypeEnum.PersonalInterest]: {
    image: 'interest_m',
    text: 'No Personal Interests Added Yet',
    buttonText: 'Add New',
  },
  [ElementTypeEnum.SocialInterest]: {
    image: 'heart_m',
    text: 'No Social Interests Added Yet',
    buttonText: 'Add New',
  },
  [ElementTypeEnum.ProjectWorkExperience]: {
    image: 'briefcase_m',
    text: 'No Experience Added Yet',
    buttonText: 'Add Experience',
  },
};

const sectionTitle: TitleProps = {
  [ElementTypeEnum.Image]: t('noumena.chambers.toolbox.element.image'),
  [ElementTypeEnum.Text]: t('noumena.chambers.toolbox.element.text'),
  [ElementTypeEnum.Video]: t('noumena.chambers.toolbox.element.video'),
  [ElementTypeEnum.QuickQuestions]: t(
    'noumena.chambers.toolbox.element.quick_questions',
  ),
};

export const Element: FC<ElementProps> = memo((props) => {
  const { flags } = useLaunchDarkly();
  const { space, isOwner } = useNoumContext();
  const { updateToolMutation, noumSidePanelId } = useEditChamberState();
  const { isConnected } = useNoumUserConnectionContext();
  const spaceId = space?._id;

  const { setDisableUpdate } = useContext(DisablePublishOrDraftContext);
  const { updateElementHelper, loading: updateElementLoader } =
    useUpdateElementHelper();
  useEffect(() => {
    setDisableUpdate(updateElementLoader);
  }, [setDisableUpdate, updateElementLoader]);

  const {
    element,
    isEditing,
    hideContent,
    isHighlight,
    columnWidth,
    textEditorContentPadding,
  } = props;
  const [bodyContent, setBodyContent] = useState<string | undefined>(
    ElementUtils.getBodyContent(
      element,
      !isEditing && element.status === 'PUBLISHED',
      undefined,
    ) || undefined,
  );

  const headerContent = useMemo(() => {
    const type = element?.elementType || '';
    switch (type) {
      case ElementTypeEnum.Message:
        return t('noumena.chambers.toolbox.element.message');
      case ElementTypeEnum.Text:
        return (
          ElementUtils.getHeaderContent(element, !isEditing) ||
          t('noumena.chambers.toolbox.element.text')
        );
      case ElementTypeEnum.Wallet:
        return t(`noumena.chambers.toolbox.element.wallet`, {
          name: isEditing
            ? `${space?.name || ''} ${'Wallet'} `
            : `${space?.name} ${'Wallet'}`,
        });
      case ElementTypeEnum.Userposts:
        return t('noumena.chambers.toolbox.element.posts');
      case ElementTypeEnum.Calendar:
        return t('noumena.chambers.toolbox.element.calendar');
      case ElementTypeEnum.Usernetwork:
        return t('noumena.chambers.toolbox.element.usernetwork');
      case ElementTypeEnum.Skills:
        return t('noumena.homenoum.skills.title');
      case ElementTypeEnum.FilesManager:
        return t('noumena.chambers.toolbox.element.file');
      case ElementTypeEnum.ContractManager:
        return t('noumena.chambers.toolbox.element.contracts');
      default:
        return (
          ElementUtils.getHeaderContent(element, !isEditing) ||
          (sectionTitle[type as TypeEnum] ?? element.elementType ?? 'UNKNOWN')
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, isEditing]);

  const getElementBodyContentJson = useCallback(
    (meta?: ChangeMeta) => {
      const json = {
        ...ElementUtils.getBodyContentJson(element),
        fileSize: meta?.fileSize,
        fileName: meta?.fileName,
        ...(meta?.type === 'video' && {
          thumbnail: meta.thumbnail,
          videoURL: meta.videoURL,
        }),
      };

      if (Object.keys(json).length === 0) {
        return null;
      }

      return json;
    },
    [element],
  );
  const handleContentChange = useCallback(
    (value?: string, meta?: ChangeMeta) => {
      setBodyContent(value);
      const input: ElementInput = {
        elementId: element._id,
        bodyContent: value,
        bodyContentJson: getElementBodyContentJson(meta),
        headerContent: ElementUtils.getHeaderContent(element),
        position: ElementUtils.getPosition(element),
        status: ElementStatusEnum.Unsaved,
      };
      if (spaceId) {
        if (ElementUtils.isMediaElement(element)) {
          updateToolMutation?.(input);
        } else {
          updateElementHelper(spaceId, input);
        }
      }
    },
    [
      element,
      getElementBodyContentJson,
      spaceId,
      updateElementHelper,
      updateToolMutation,
    ],
  );

  const handleNetworkChange = useCallback(
    (networkDetails: object) => {
      const input: ElementInput = {
        elementId: element._id,
        bodyContent: JSON.stringify(networkDetails),
        headerContent: ElementUtils.getHeaderContent(element),
        position: ElementUtils.getPosition(element),
        status: ElementStatusEnum.Unsaved,
      };
      if (spaceId) {
        updateElementHelper(spaceId, input);
      }
    },
    [element, spaceId, updateElementHelper],
  );

  const content = useMemo(() => {
    if (!spaceId) return null;

    switch (element.elementType) {
      case ElementTypeEnum.Text:
        if (!isEditing && (!bodyContent || bodyContent === '<p><br></p>'))
          return null;
        return (
          <TextElement
            {...props}
            currentTitle={headerContent}
            hideContent={hideContent}
            isBorder={false}
            isEditing={isEditing}
            textEditor={{
              initialValue: bodyContent,
              onContentChange: (next) => {
                if (next.isChanged) {
                  handleContentChange(next.value, { type: 'text' });
                }
              },
              editEnabled: isEditing,
              contentPadding: textEditorContentPadding,
            }}
          />
        );
      case ElementTypeEnum.Userposts:
        return (
          <PostElement
            {...props}
            currentTitle={headerContent}
            hideContent={hideContent}
            isBorder={false}
            isEditing={isEditing}
          />
        );
      case ElementTypeEnum.Message:
        return SpaceUtils.isMasterNoum(space) ||
          isOwner ||
          isConnected ||
          isEditing ? (
          <MessageElementV2 {...props} currentTitle={headerContent} />
        ) : null;
      case ElementTypeEnum.Wallet:
        return (
          <WalletElement
            id={element._id || ''}
            {...props}
            currentTitle={headerContent}
            isOwner={isOwner}
          />
        );
      case ElementTypeEnum.QuickQuestions:
        return (
          <QuickQuestionsElement
            isOwner={isOwner}
            {...props}
            currentTitle={headerContent}
          />
        );
      case ElementTypeEnum.Calendar:
        return flags.noumsSocialHall ? (
          <CalendarElement
            {...props}
            isOwner={isOwner}
            currentTitle={headerContent}
          />
        ) : null;
      case ElementTypeEnum.BusinessBrief:
        return (
          <BusinessBrief
            wrapperProps={{ ...props }}
            currentTitle={headerContent}
            isBorder={false}
            spaceId={spaceId}
            elementId={element._id}
            elementPosition={ElementUtils.getPosition(element)}
            isEditing={isEditing}
            textEditor={{
              initialValue: bodyContent,
              onContentChange: (next) => {
                if (next.isChanged) {
                  handleContentChange(next.value, { type: 'text' });
                }
              },
              editEnabled: isEditing,
              contentPadding: textEditorContentPadding,
            }}
            basicToolbar={
              space?.type !== SpaceTypeEnum.Home &&
              space?.type !== SpaceTypeEnum.Project
            }
          />
        );
      case ElementTypeEnum.Image:
        return (
          <ImageElement
            {...props}
            isActiveTool={noumSidePanelId === element._id}
            currentTitle={headerContent}
            hideContent={hideContent}
            url={bodyContent}
            onContentChange={handleContentChange}
          />
        );
      case ElementTypeEnum.Video:
        return (
          <VideoElement
            {...props}
            currentTitle={headerContent}
            hideContent={hideContent}
            url={bodyContent}
            onContentChange={handleContentChange}
          />
        );
      case ElementTypeEnum.Usernetwork:
        return (
          <NetworkElement
            {...props}
            currentTitle={headerContent}
            hideContent={hideContent}
            body={bodyContent}
            onContentChange={handleNetworkChange}
            element={element}
          />
        );
      case ElementTypeEnum.Skills:
        return (
          <SkillElement
            {...props}
            currentTitle={headerContent}
            isOwner
            isBorder={false}
          />
        );
      case ElementTypeEnum.FilesManager:
        return flags.filesManager ? (
          <FileManagerElement
            {...props}
            currentTitle={headerContent}
            isOwner={isOwner}
            isBorder={false}
          />
        ) : null;
      case ElementTypeEnum.ContractManager:
        return flags.contractTool ? (
          <ContractManagerElement
            {...props}
            currentTitle={headerContent}
            isOwner={isOwner}
            isBorder={false}
          />
        ) : null;
      default:
        return (
          <TextElement
            {...props}
            currentTitle={headerContent}
            textEditor={{
              initialValue: bodyContent,
              onContentChange: (next) => {
                if (next.isChanged) {
                  handleContentChange(next.value, { type: 'text' });
                }
              },
              editEnabled: isEditing,
              contentPadding: textEditorContentPadding,
            }}
          />
        );
    }
  }, [
    bodyContent,
    element,
    flags.contractTool,
    flags.filesManager,
    flags.noumsSocialHall,
    handleContentChange,
    handleNetworkChange,
    headerContent,
    hideContent,
    isConnected,
    isEditing,
    isOwner,
    noumSidePanelId,
    props,
    spaceId,
    textEditorContentPadding,
    space,
  ]);

  const homeChambersObject =
    element.elementType &&
    homeChambersElements[element.elementType as HomeChambersEnum];
  const { isLoading } = useSkeletonIsLoadingContext();

  if (!spaceId) return null;

  if (!homeChambersObject || isLoading)
    return (
      <SkeletonLoaderProvider isLoading={isLoading}>
        <NoumElementProvider
          columnWidth={columnWidth}
          isEditing={isEditing ?? false}
        >
          {content}
        </NoumElementProvider>
      </SkeletonLoaderProvider>
    );

  return (
    <HomeChambers
      isHighlight={isHighlight}
      image={homeChambersObject.image}
      text={homeChambersObject.text}
      buttonText={homeChambersObject.buttonText}
      elementType={element.elementType as HomeChambersEnum}
      isEditing={isEditing}
      wrapperProps={{ ...props }}
      currentTitle={headerContent}
      isBorder={false}
      spaceId={spaceId}
      elementId={element._id}
      position={ElementUtils.getPosition(element)}
      hideContent={hideContent}
      bodyContentJson={
        isEditing
          ? ElementUtils.getBodyContentJson(element)
          : ElementUtils.getBodyContentJson(element, true)
      }
      columnWidth={columnWidth}
    />
  );
});
