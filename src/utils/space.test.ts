import {
  BodyContentEnum,
  ElementStatusEnum,
  type NetworkOutput,
  SpaceStatusEnum,
  SpaceTypeEnum,
  type ElementOutput,
  type UserOutput,
} from '@/apollo/generated/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';
import { SpaceUtils } from './space';

describe('SpaceUtils', () => {
  const user: UserOutput = {
    _id: '60e8051f986d605182c85af7',
    firstName: 'Morhaf',
    lastName: 'Shamia',
    title: null,
    bio: 'Morhafty',
    profile: {
      profilePicture:
        'https://noumena-img.s3-accelerate.amazonaws.com/60e8051f986d605182c85af7/profile/mrrYRf6ulLCC4eK9DoODx',
      profilePictureThumbnail:
        'https://noumena-img.s3-accelerate.amazonaws.com/60e8051f986d605182c85af7/profile/60e8051f986d605182c85af7-1632394671274-thumbnail.png',
    },
  };

  const elements1: ElementOutput = {
    _id: '617926f92ae574272443a81e',
    elementType: 'HOME',
    position: 1,
    status: 'PUBLISHED',
    tempStatus: null,
    bodyContentType: BodyContentEnum.Text,
    bodyContent: null,
    headerContent: null,
    bodyContentJson: null,
    viewOnly: true,
    draft: null,
    unSaved: null,
  };

  const elements2: ElementOutput = {
    _id: '617926f92ae574594643a81f',
    elementType: 'INVITATION',
    position: 2,
    status: 'PUBLISHED',
    tempStatus: null,
    bodyContentType: BodyContentEnum.Text,
    bodyContent: null,
    headerContent: null,
    bodyContentJson: null,
    viewOnly: true,
    draft: null,
    unSaved: null,
  };

  const elements3: ElementOutput = {
    _id: '617926f92ae574810143a820',
    elementType: 'MESSAGE',
    position: 6,
    status: 'PUBLISHED',
    tempStatus: null,
    bodyContentType: BodyContentEnum.Text,
    bodyContent: null,
    headerContent: null,
    bodyContentJson: null,
    viewOnly: false,
    draft: null,
    unSaved: null,
  };

  const elements4: ElementOutput = {
    _id: '617926f92ae5746d3743a821',
    elementType: 'CONNECTION',
    position: 7,
    status: 'PUBLISHED',
    tempStatus: null,
    bodyContentType: BodyContentEnum.Text,
    bodyContent: null,
    headerContent: null,
    bodyContentJson: null,
    viewOnly: false,
    draft: null,
    unSaved: null,
  };

  const elements5: ElementOutput = {
    _id: '617926f92ae5745ba643a822',
    elementType: 'SKILLS',
    position: 3,
    status: 'PUBLISHED',
    tempStatus: null,
    bodyContentType: BodyContentEnum.Text,
    bodyContent: null,
    headerContent: null,
    bodyContentJson: null,
    viewOnly: false,
    draft: null,
    unSaved: null,
  };

  const elements6: ElementOutput = {
    _id: '617926f92ae574380043a823',
    elementType: 'USERPOSTS',
    position: 4,
    status: 'PUBLISHED',
    tempStatus: null,
    bodyContentType: BodyContentEnum.Text,
    bodyContent: null,
    headerContent: null,
    bodyContentJson: null,
    viewOnly: false,
    draft: null,
    unSaved: null,
  };

  const elements7: ElementOutput = {
    _id: '617926f92ae574770e43a824',
    elementType: 'USERNETWORK',
    position: 5,
    status: 'PUBLISHED',
    tempStatus: null,
    bodyContentType: BodyContentEnum.Text,
    bodyContent: null,
    headerContent: null,
    bodyContentJson: null,
    viewOnly: false,
    draft: null,
    unSaved: null,
  };

  const elements8: ElementOutput = {
    _id: '617b48dee3633b6d1061d9c3',
    elementType: 'VIDEO',
    position: 8,
    status: 'PUBLISHED',
    tempStatus: null,
    bodyContentType: BodyContentEnum.Video,
    bodyContent:
      'https://noumena-img.s3-accelerate.amazonaws.com/undefined/chamber_video/NpmzaPplUoJ-yr84JjwFW',
    headerContent: '',
    bodyContentJson: null,
    viewOnly: false,
    draft: null,
    unSaved: null,
  };

  const elements9: ElementOutput = {
    _id: '617b4b18e3633b2efd61d9dd',
    elementType: 'VIDEO',
    position: 9,
    status: 'PUBLISHED',
    tempStatus: null,
    bodyContentType: BodyContentEnum.Video,
    bodyContent:
      'https://noumena-img.s3-accelerate.amazonaws.com/60e8051f986d605182c85af7/chamber_video/v9hda1l5ZP0em0OLO1wNW',
    headerContent: 'test',
    bodyContentJson: null,
    viewOnly: false,
    draft: null,
    unSaved: null,
  };

  const elements10: ElementOutput = {
    _id: '61c41167dda76910985c3391',
    elementType: 'USERNETWORK',
    position: 7,
    status: ElementStatusEnum.Published,
    bodyContentType: BodyContentEnum.Text,
    bodyContent:
      '{"twitter":"inmogr","linkedin":"","github":"","instagram":"inmogr","behance":"","dribbble":"","medium":"","www":"www.ahappygoodbye.com"}',
    headerContent: null,
    bodyContentJson: null,
    viewOnly: false,
    draft: null,
    unSaved: null,
  };

  const elements11: ElementOutput = {
    _id: '6252b84f0fa61a17bd425ed2',
    elementType: 'VIDEO',
    position: 8,
    status: ElementStatusEnum.Published,
    tempStatus: ElementStatusEnum.Unsaved,
    bodyContentType: BodyContentEnum.Url,
    bodyContent: 'https://domain.com/R38ZtWS55y.mp4',
    headerContent: null,
    bodyContentJson: null,
    viewOnly: false,
    draft: null,
    unSaved: {
      bodyContent:
        'https://noumena-img.s3-accelerate.amazonaws.com/619bf2009ab9294236a76848/chamber_video/sJH5oYZ2y7C983_YuZ9qZ',
      bodyContentJson: {
        thumbnail:
          'https://noumena-img.s3-accelerate.amazonaws.com/619bf2009ab9294236a76848/chamber_video/dD3IrCEh5_HrKYXWuiQVd',
        videoURL:
          'https://noumena-img.s3-accelerate.amazonaws.com/619bf2009ab9294236a76848/chamber_video/sJH5oYZ2y7C983_YuZ9qZ',
      },
      headerContent: 'Test',
      position: 8,
      isDeleted: null,
    },
  };

  const elements12: ElementOutput = {
    _id: '625bb2f5ccd5656b8ab07e30',
    elementType: 'IMAGE',
    position: null,
    status: null,
    tempStatus: ElementStatusEnum.Unsaved,
    bodyContentType: BodyContentEnum.Image,
    bodyContent: null,
    headerContent: null,
    bodyContentJson: null,
    viewOnly: false,
    draft: null,
    unSaved: {
      bodyContent:
        'https://noumena-img.s3-accelerate.amazonaws.com/619bf2009ab9294236a76848/chamber_image/wkM4pURASVs2S5llB_qtD',
      bodyContentJson: null,
      headerContent: 'Test',
      position: 9,
      isDeleted: null,
    },
  };

  const elements13: ElementOutput = {
    _id: '61c41167dda76910985c3391',
    elementType: 'INSTAGRAM',
    position: 7,
    status: ElementStatusEnum.Published,
    bodyContentType: BodyContentEnum.Text,
    bodyContent:
      '{"twitter":"inmogr","linkedin":"","github":"","instagram":"inmogr","behance":"","dribbble":"","medium":"","www":"www.ahappygoodbye.com"}',
    headerContent: null,
    bodyContentJson: null,
    viewOnly: false,
    draft: null,
    unSaved: null,
  };

  const elements14: ElementOutput = {
    _id: '617b48dee3633b6d1061d9c3',
    elementType: 'VIDEO',
    status: 'PUBLISHED',
    tempStatus: null,
    bodyContentType: BodyContentEnum.Video,
    bodyContent:
      'https://noumena-img.s3-accelerate.amazonaws.com/undefined/chamber_video/NpmzaPplUoJ-yr84JjwFW',
    headerContent: '',
    bodyContentJson: null,
    viewOnly: false,
    draft: null,
    unSaved: null,
  };

  const elements15: ElementOutput = {
    _id: '617b48dee3633b6d10634253',
    elementType: 'VIDEO',
    status: 'PUBLISHED',
    tempStatus: null,
    bodyContentType: BodyContentEnum.Video,
    bodyContent:
      'https://noumena-img.s3-accelerate.amazonaws.com/undefined/chamber_video/NpmzaPplUoJ-yr84JjwFW',
    headerContent: '',
    bodyContentJson: null,
    viewOnly: false,
    draft: {
      isDeleted: null,
    },
    unSaved: null,
  };
  const elements16: ElementOutput = {
    _id: '617b48dee3633b6d1061d9c3',
    elementType: 'VIDEO',
    status: 'PUBLISHED',
    tempStatus: null,
    bodyContentType: BodyContentEnum.Video,
    bodyContent:
      'https://noumena-img.s3-accelerate.amazonaws.com/undefined/chamber_video/NpmzaPplUoJ-yr84JjwFW',
    headerContent: '',
    bodyContentJson: null,
    viewOnly: false,
    draft: null,
    unSaved: {
      isDeleted: null,
    },
  };

  const elements17: ElementOutput = {
    _id: '61c4116543376910985c3391',
    elementType: 'INSTAGRAM',
    position: 7,
    status: ElementStatusEnum.Published,
    bodyContentType: BodyContentEnum.Text,
    bodyContent:
      '{"twitter":"inmogr","linkedin":"","github":"","instagram":"inmogr","behance":"","dribbble":"","medium":"","www":"www.ahappygoodbye.com"}',
    headerContent: null,
    bodyContentJson: null,
    viewOnly: false,
    draft: {
      isDeleted: true,
    },
    unSaved: null,
  };

  const elements18: ElementOutput = {
    _id: '61c411676543210985c3391',
    elementType: 'INSTAGRAM',
    position: 7,
    status: ElementStatusEnum.Published,
    bodyContentType: BodyContentEnum.Text,
    bodyContent:
      '{"twitter":"inmogr","linkedin":"","github":"","instagram":"inmogr","behance":"","dribbble":"","medium":"","www":"www.ahappygoodbye.com"}',
    headerContent: null,
    bodyContentJson: null,
    viewOnly: false,
    draft: null,
    unSaved: {
      isDeleted: true,
    },
  };

  const elements19: ElementOutput = {
    _id: '617926f92ae574380043a823',
    elementType: 'USERPOSTS',
    position: 4,
    status: 'PUBLISHED',
    tempStatus: null,
    bodyContentType: BodyContentEnum.Text,
    bodyContent: null,
    headerContent: null,
    bodyContentJson: null,
    viewOnly: false,
    draft: {
      isDeleted: true,
    },
    unSaved: null,
  };

  const elements20: ElementOutput = {
    _id: '617926f92ae574380043a823',
    elementType: 'USERPOSTS',
    position: 4,
    status: 'PUBLISHED',
    tempStatus: null,
    bodyContentType: BodyContentEnum.Text,
    bodyContent: null,
    headerContent: null,
    bodyContentJson: null,
    viewOnly: false,
    draft: null,
    unSaved: {
      isDeleted: true,
    },
  };

  const elements21: ElementOutput = {
    _id: '617926f92ae574770e43a824',
    elementType: 'USERNETWORK',
    position: 5,
    status: 'PUBLISHED',
    tempStatus: null,
    bodyContentType: BodyContentEnum.Text,
    bodyContent: null,
    headerContent: null,
    bodyContentJson: null,
    viewOnly: false,
    draft: {
      isDeleted: true,
    },
    unSaved: null,
  };

  const elements22: ElementOutput = {
    _id: '617926f92ae574770e43a824',
    elementType: 'USERNETWORK',
    position: 5,
    status: 'PUBLISHED',
    tempStatus: null,
    bodyContentType: BodyContentEnum.Text,
    bodyContent: null,
    headerContent: null,
    bodyContentJson: null,
    viewOnly: false,
    draft: null,
    unSaved: {
      isDeleted: true,
    },
  };

  const networks1: NetworkOutput[] = [
    {
      _id: '1',
      accessToken: 'test',
    },
  ];

  const networks2: NetworkOutput[] = [
    {
      _id: '1',
      accessToken: 'test',
    },
  ];

  const spaces: SpaceOutputFragment[] = [
    {
      _id: 'space1',
      name: 'HOME Chamber',
      title: 'space1 title',
      description: 'space1 description',
      type: SpaceTypeEnum.Home,
      status: SpaceStatusEnum.Published,
      uid: user,
      elements: [
        elements1,
        elements2,
        elements3,
        elements6,
        elements10,
        elements13,
      ],
      networks: networks1,
    },
    {
      _id: 'space2',
      name: 'space2',
      title: 'space2 title',
      description: 'space2 description',
      type: SpaceTypeEnum.Project,
      status: SpaceStatusEnum.Draft,
      elements: [
        elements1,
        elements2,
        elements3,
        elements4,
        elements5,
        elements6,
        elements7,
        elements8,
        elements9,
        elements10,
        elements11,
        elements12,
      ],
      networks: networks2,
    },
    {
      _id: 'space3',
      name: 'space3',
      title: 'space3 title',
      description: 'space3 description',
      type: SpaceTypeEnum.Project,
      status: SpaceStatusEnum.Published,
      elements: [
        elements1,
        elements2,
        elements3,
        elements7,
        elements8,
        elements9,
      ],
      networks: networks2,
    },
    {
      _id: 'space4',
      name: 'space4',
      title: 'space4 title',
      description: 'space4 description',
      type: SpaceTypeEnum.Project,
      status: SpaceStatusEnum.Published,
      elements: [elements14],
      networks: networks2,
    },
    {
      _id: 'space5',
      name: 'space5',
      title: 'space5 title',
      description: 'space5 description',
      type: SpaceTypeEnum.Project,
      status: SpaceStatusEnum.Published,
      elements: [elements15],
      networks: networks2,
    },
    {
      _id: 'space6',
      name: 'space6',
      title: 'space6 title',
      description: 'space6 description',
      type: SpaceTypeEnum.Project,
      status: SpaceStatusEnum.Published,
      elements: [elements16],
      networks: networks2,
    },
  ];
  const spacesDraftDelete: SpaceOutputFragment[] = [
    {
      _id: 'space1',
      name: 'HOME Chamber',
      title: 'space1 title',
      description: 'space1 description',
      type: SpaceTypeEnum.Home,
      status: SpaceStatusEnum.Published,
      uid: user,
      elements: [elements17, elements19, elements21],
      networks: networks1,
    },
  ];

  const spacesUnsaveDelete: SpaceOutputFragment[] = [
    {
      _id: 'space1',
      name: 'HOME Chamber',
      title: 'space1 title',
      description: 'space1 description',
      type: SpaceTypeEnum.Home,
      status: SpaceStatusEnum.Published,
      uid: user,
      elements: [elements18, elements20, elements22],
      networks: networks1,
    },
  ];

  describe('getSpace', () => {
    it('should identify if a space is published or not', () => {
      expect(SpaceUtils.filterPublished(spaces[0])).toEqual(true);
      expect(SpaceUtils.filterPublished(spaces[1])).toEqual(false);
      expect(SpaceUtils.filterPublished(spaces[2])).toEqual(true);
    });

    it('should get space by id', () => {
      expect(SpaceUtils.getSpace(spaces, 'space1')).toEqual(spaces[0]);
      expect(SpaceUtils.getSpace(spaces, 'space2')).toEqual(spaces[1]);
      expect(SpaceUtils.getSpace(spaces, 'space3')).toEqual(spaces[2]);
    });

    it('should get space by id if published', () => {
      expect(SpaceUtils.getSpace(spaces, 'space1', true)).toEqual(spaces[0]);
      expect(SpaceUtils.getSpace(spaces, 'space2', true)).toEqual(undefined);
      expect(SpaceUtils.getSpace(spaces, 'space3', true)).toEqual(spaces[2]);
    });

    it('should get space elements by id', () => {
      expect(SpaceUtils.getSpaceElements(spaces, 'space1')).toEqual(
        spaces[0].elements,
      );
      expect(SpaceUtils.getSpaceElements(spaces, 'space2')).toEqual(
        spaces[1].elements,
      );
      expect(SpaceUtils.getSpaceElements(spaces, 'space3')).toEqual(
        spaces[2].elements,
      );
    });

    it('should get space elements by id if published', () => {
      expect(SpaceUtils.getSpaceElements(spaces, 'space1', true)).toEqual(
        spaces[0].elements,
      );
      expect(SpaceUtils.getSpaceElements(spaces, 'space2', true)).toEqual([]);
      expect(SpaceUtils.getSpaceElements(spaces, 'space3', true)).toEqual(
        spaces[2].elements,
      );
    });

    it('should be able to get the home space', () => {
      expect(SpaceUtils.getHomeSpace(spaces)).toEqual(spaces[0]);
    });

    it('should be able to get the home space elements', () => {
      expect(SpaceUtils.getHomeSpaceElements(spaces)).toEqual(
        spaces[0].elements,
      );
    });

    it('should be able to get the home space networks', () => {
      expect(SpaceUtils.getHomeSpaceNetworks(spaces)).toEqual(
        spaces[0].networks,
      );
    });

    it('should be able to get the home space chamber networks', () => {
      expect(SpaceUtils.getHomeSpaceUserNetworks(spaces)).toEqual(true);
      expect(SpaceUtils.getHomeSpaceUserNetworks(spacesDraftDelete)).toEqual(
        false,
      );
      expect(SpaceUtils.getHomeSpaceUserNetworks(spacesUnsaveDelete)).toEqual(
        false,
      );
    });

    it('should be able to get the home space chamber posts', () => {
      expect(SpaceUtils.getHomeSpaceUserPosts(spaces)).toEqual(true);
      expect(SpaceUtils.getHomeSpaceUserPosts(spacesDraftDelete)).toEqual(
        false,
      );
      expect(SpaceUtils.getHomeSpaceUserPosts(spacesUnsaveDelete)).toEqual(
        false,
      );
    });

    it('should be able to get the home space chamber instagram', () => {
      expect(SpaceUtils.getHomeSpaceInstagram(spaces)).toEqual(true);
      expect(SpaceUtils.getHomeSpaceInstagram(spacesDraftDelete)).toEqual(
        false,
      );
      expect(SpaceUtils.getHomeSpaceInstagram(spacesUnsaveDelete)).toEqual(
        false,
      );
    });

    it('Max Position Should be greathet then 0 or equal to 0', () => {
      expect(SpaceUtils.getMaxPosition(spaces[0], true)).toBeGreaterThan(1);
      expect(SpaceUtils.getMaxPosition(spaces[3], false)).toBe(0);
    });

    it('Some of the elements may be in draft', () => {
      expect(SpaceUtils.hasDraftElement(spaces[4])).toEqual(true);
    });

    it('Some of the elements may be unsaved', () => {
      expect(SpaceUtils.hasUnsavedElement(spaces[5])).toEqual(true);
    });

    it('Must Have some Published Elements', () => {
      expect(SpaceUtils.hasPublishedElement(spaces[0])).toEqual(true);
    });

    it('should be able to get the home space chamber user', () => {
      expect(SpaceUtils.getHomeSpace(spaces)?.uid).toEqual(user);
    });
  });
});
