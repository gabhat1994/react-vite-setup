import {
  BodyContentEnum,
  type ElementOutput,
  ElementStatusEnum,
  ElementTypeEnum,
} from '@/apollo/generated/types';

import { ElementUtils } from './element';

describe('elements', () => {
  const elements1: ElementOutput = {
    _id: '617926f92ae574272443a81e',
    elementType: 'HOME',
    position: 1,
    status: 'PUBLISHED',
    tempStatus: null,
    bodyContentType: BodyContentEnum.Text,
    bodyContent: `"<br>"`,
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
    tempStatus: ElementStatusEnum.Draft,
    bodyContentType: BodyContentEnum.Url,
    bodyContent: 'https://domain.com/R38ZtWS55y.mp4',
    headerContent: null,
    bodyContentJson: null,
    viewOnly: false,
    draft: {
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
      isDeleted: true,
    },
    unSaved: null,
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
      isDeleted: true,
    },
  };

  const elements13: ElementOutput = {
    _id: '61c41167dda76910985c3391',
    elementType: 'TEXT',
    position: 7,
    status: 'PUBLISHED',
    tempStatus: ElementStatusEnum.Unsaved,
    bodyContentType: BodyContentEnum.Text,
    bodyContent: '{}',
    headerContent: null,
    bodyContentJson: {},
    viewOnly: false,
    draft: null,
    unSaved: {
      bodyContent: '{<p> this is text content <p>}',
      bodyContentJson: null,
      headerContent: null,
      position: 7,
      isDeleted: null,
    },
  };

  const elements14: ElementOutput = {
    _id: '61c41167dda76910985c3391',
    elementType: 'TEXT',
    position: 7,
    status: 'PUBLISHED',
    tempStatus: ElementStatusEnum.Unsaved,
    bodyContentType: BodyContentEnum.Text,
    bodyContent: '{}',
    headerContent: null,
    bodyContentJson: '{}',
    viewOnly: false,
    draft: {
      bodyContent: '',
      bodyContentJson: null,
      headerContent: null,
      position: 7,
      isDeleted: null,
    },
    unSaved: {
      bodyContent: '',
      bodyContentJson: null,
      headerContent: null,
      position: 7,
      isDeleted: null,
    },
  };

  const elements15: ElementOutput = {
    _id: '61c41167dda76910985c3391',
    elementType: 'TEXT',
    position: 7,
    status: 'PUBLISHED',
    tempStatus: ElementStatusEnum.Unsaved,
    bodyContentType: BodyContentEnum.Text,
    bodyContent: '{"foo": 1.}',
    headerContent: null,
    bodyContentJson: '{"foo": 1.}',
    viewOnly: false,
  };

  const elements16: ElementOutput = {
    _id: '6252b84f0fa61a17bd425ed2',
    bodyContent:
      'https://noumena-img.s3-accelerate.amazonaws.com/Screen Recording 2022-04-28 at 4,58,11 PM.9FfKOH2N.mov',
    bodyContentJson: {
      thumbnail:
        'https://noumena-img.s3-accelerate.amazonaws.com/619bf2009ab9294236a76848/chamber_video/dD3IrCEh5_HrKYXWuiQVd',
      videoURL:
        'https://noumena-img.s3-accelerate.amazonaws.com/619bf2009ab9294236a76848/chamber_video/sJH5oYZ2y7C983_YuZ9qZ',
    },
    bodyContentType: BodyContentEnum.Url,
    draft: null,
    elementType: ElementTypeEnum.Video,
    headerContent: 'Test',
    position: 10,
    status: ElementStatusEnum.Published,
    tempStatus: null,
    unSaved: null,
    viewOnly: null,
  };

  test('check if the element is in a draft mode', () => {
    expect(ElementUtils.isDraft(elements10)).toEqual(false);
    expect(ElementUtils.isDraft(elements11)).toEqual(true);
    expect(ElementUtils.isDraft(elements12)).toEqual(false);
  });

  test('check if the element is in an unsaved mode', () => {
    expect(ElementUtils.isUnsaved(elements10)).toEqual(false);
    expect(ElementUtils.isUnsaved(elements11)).toEqual(false);
    expect(ElementUtils.isUnsaved(elements12)).toEqual(true);
  });

  test('check if the element is in a published mode', () => {
    expect(ElementUtils.filterPublished(elements10)).toEqual(true);
    expect(ElementUtils.filterPublished(elements11)).toEqual(true);
    expect(ElementUtils.filterPublished(elements12)).toEqual(false);
  });

  test('check if the element is in an editing mode', () => {
    expect(ElementUtils.filterEditing(elements1)).toEqual(true);
    expect(ElementUtils.filterEditing(elements2)).toEqual(true);
    expect(ElementUtils.filterEditing(elements3)).toEqual(true);
    expect(ElementUtils.filterEditing(elements4)).toEqual(true);
    expect(ElementUtils.filterEditing(elements5)).toEqual(true);
    expect(ElementUtils.filterEditing(elements6)).toEqual(true);
    expect(ElementUtils.filterEditing(elements7)).toEqual(true);
    expect(ElementUtils.filterEditing(elements8)).toEqual(true);
    expect(ElementUtils.filterEditing(elements9)).toEqual(true);
    expect(ElementUtils.filterEditing(elements10)).toEqual(true);
    expect(ElementUtils.filterEditing(elements11)).toEqual(false);
    expect(ElementUtils.filterEditing(elements12)).toEqual(false);
  });

  test('sortPublished elements', () => {
    expect(ElementUtils.sortPublished(elements1, elements2)).toEqual(-1);
    expect(ElementUtils.sortPublished(elements2, elements1)).toEqual(1);

    expect(ElementUtils.sortPublished(elements3, elements1)).toEqual(5);
    expect(ElementUtils.sortPublished(elements1, elements3)).toEqual(-5);
  });

  test('sortUnpublished elements', () => {
    expect(ElementUtils.sortUnpublished(elements1, elements2)).toEqual(-1);
    expect(ElementUtils.sortUnpublished(elements2, elements1)).toEqual(1);

    expect(ElementUtils.sortUnpublished(elements3, elements1)).toEqual(5);
    expect(ElementUtils.sortUnpublished(elements1, elements3)).toEqual(-5);
  });

  test('filterAndSortPublished', () => {
    const elementArr = [elements1, elements2, elements3, elements4, elements5];
    const expectedElementArr = [elements1, elements5, elements3, elements4];
    expect(ElementUtils.filterAndSortPublished(elementArr)).toEqual(
      expectedElementArr,
    );
  });

  test('filterAndSortUnpublished', () => {
    const elementArr = [elements11, elements12, elements13, elements14];
    const expectedElementArr = [elements13, elements14];
    expect(ElementUtils.filterAndSortUnpublished(elementArr)).toEqual(
      expectedElementArr,
    );
  });

  test('check if the element is empty for image', () => {
    const tempElement = JSON.parse(JSON.stringify(elements12));
    tempElement.unSaved = { ...tempElement.unSaved, isDeleted: false };
    expect(ElementUtils.isEmpty(tempElement)).toEqual(false);

    tempElement.unSaved = { ...tempElement.unSaved, bodyContent: '' };
    expect(ElementUtils.isEmpty(tempElement)).toEqual(true);

    tempElement.unSaved = { ...tempElement.unSaved, bodyContent: undefined };
    expect(ElementUtils.isEmpty(tempElement)).toEqual(true);
  });

  test('check if the element is empty for Text', () => {
    const tempElement = JSON.parse(JSON.stringify(elements13));
    expect(ElementUtils.isEmpty(tempElement)).toEqual(false);
  });

  test('check if the element PositionChanged (1)', () => {
    const element1Arr = [elements1, elements2, elements5, elements6];
    const element2Arr = [elements2, elements1, elements4, elements3];
    expect(ElementUtils.isElementPositionChanged1(element1Arr)).toEqual(false);
    expect(ElementUtils.isElementPositionChanged1(element2Arr)).toEqual(true);
  });

  test('check if the element PositionChanged (2)', () => {
    const element1Arr = [elements1, elements2, elements3, elements4];
    const element2Arr = [elements2, elements1, elements4, elements3];
    expect(
      ElementUtils.isElementPositionChanged2(element1Arr, element2Arr),
    ).toEqual(true);
    expect(
      ElementUtils.isElementPositionChanged2(element1Arr, element1Arr),
    ).toEqual(false);
  });

  test('check if space has message element', () => {
    const element1Arr = [elements1, elements2, elements5, elements6];
    const element2Arr = [elements2, elements1, elements4, elements3];
    expect(ElementUtils.hasMessageElement(element1Arr)).toEqual(false);
    expect(ElementUtils.hasMessageElement(element2Arr)).toEqual(true);
  });

  test('check if the BodyContentJson', () => {
    const tempElement = JSON.parse(JSON.stringify(elements14));
    expect(ElementUtils.getBodyContentJson(tempElement, true)).toEqual('{}');
    const tempElement2 = { ...tempElement, bodyContentJson: undefined };
    expect(ElementUtils.getBodyContentJson(tempElement2, true)).toEqual(null);

    expect(ElementUtils.getBodyContentJson(tempElement2, false)).toEqual(null);
    tempElement2.draft = { ...tempElement2.draft, bodyContentJson: '{}' };
    expect(ElementUtils.getBodyContentJson(tempElement2, false)).toEqual('{}');

    tempElement2.draft = { ...tempElement2.draft, bodyContentJson: null };
    expect(ElementUtils.getBodyContentJson(tempElement2, false)).toEqual(null);
    tempElement2.unSaved = { ...tempElement2.unSaved, bodyContentJson: '{}' };
    expect(ElementUtils.getBodyContentJson(tempElement2, false)).toEqual('{}');
  });

  test("get the element's body content type from element type", () => {
    expect(
      ElementUtils.getBodyContentTypeFromElementType(ElementTypeEnum.Text),
    ).toEqual(BodyContentEnum.Text);
    expect(
      ElementUtils.getBodyContentTypeFromElementType(ElementTypeEnum.Video),
    ).toEqual(BodyContentEnum.Url);
    expect(
      ElementUtils.getBodyContentTypeFromElementType(ElementTypeEnum.Image),
    ).toEqual(BodyContentEnum.Url);
  });

  test("get the element's published body", () => {
    expect(ElementUtils.getPublished(elements1).bodyContent).toEqual(
      elements1.bodyContent,
    );
    expect(ElementUtils.getPublished(elements2).bodyContent).toEqual(
      elements2.bodyContent,
    );
    expect(ElementUtils.getPublished(elements3).bodyContent).toEqual(
      elements3.bodyContent,
    );
    expect(ElementUtils.getPublished(elements4).bodyContent).toEqual(
      elements4.bodyContent,
    );
    expect(ElementUtils.getPublished(elements5).bodyContent).toEqual(
      elements5.bodyContent,
    );
    expect(ElementUtils.getPublished(elements6).bodyContent).toEqual(
      elements6.bodyContent,
    );
    expect(ElementUtils.getPublished(elements7).bodyContent).toEqual(
      elements7.bodyContent,
    );
    expect(ElementUtils.getPublished(elements8).bodyContent).toEqual(
      elements8.bodyContent,
    );
    expect(ElementUtils.getPublished(elements9).bodyContent).toEqual(
      elements9.bodyContent,
    );
    expect(ElementUtils.getPublished(elements10).bodyContent).toEqual(
      elements10.bodyContent,
    );
    expect(ElementUtils.getPublished(elements11).bodyContent).toEqual(
      elements11.bodyContent,
    );
    expect(ElementUtils.getPublished(elements12).bodyContent).toEqual(
      elements12.bodyContent,
    );
  });

  test("get the element's unpublished body", () => {
    expect(ElementUtils.getUnpublished(elements1).bodyContent).toEqual(
      elements1.bodyContent,
    );
    expect(ElementUtils.getUnpublished(elements2).bodyContent).toEqual(null);
    expect(ElementUtils.getUnpublished(elements3).bodyContent).toEqual(null);
    expect(ElementUtils.getUnpublished(elements4).bodyContent).toEqual(null);
    expect(ElementUtils.getUnpublished(elements5).bodyContent).toEqual(null);
    expect(ElementUtils.getUnpublished(elements6).bodyContent).toEqual(null);
    expect(ElementUtils.getUnpublished(elements7).bodyContent).toEqual(null);
    expect(ElementUtils.getUnpublished(elements8).bodyContent).toEqual(
      elements8.bodyContent,
    );
    expect(ElementUtils.getUnpublished(elements9).bodyContent).toEqual(
      elements9.bodyContent,
    );
    expect(ElementUtils.getUnpublished(elements10).bodyContent).toEqual(
      elements10.bodyContent,
    );
    expect(ElementUtils.getUnpublished(elements11).bodyContent).toEqual(
      elements11.draft?.bodyContent,
    );
    expect(ElementUtils.getUnpublished(elements12).bodyContent).toEqual(
      elements12.unSaved?.bodyContent,
    );
  });

  test("get the element's position", () => {
    expect(ElementUtils.getPosition(elements1)).toEqual(elements1.position);
    expect(ElementUtils.getPosition(elements2)).toEqual(elements2.position);
    expect(ElementUtils.getPosition(elements3)).toEqual(elements3.position);
    expect(ElementUtils.getPosition(elements4)).toEqual(elements4.position);
    expect(ElementUtils.getPosition(elements5)).toEqual(elements5.position);
    expect(ElementUtils.getPosition(elements6)).toEqual(elements6.position);
    expect(ElementUtils.getPosition(elements7)).toEqual(elements7.position);
    expect(ElementUtils.getPosition(elements8)).toEqual(elements8.position);
    expect(ElementUtils.getPosition(elements9)).toEqual(elements9.position);
    expect(ElementUtils.getPosition(elements10)).toEqual(elements10.position);
    expect(ElementUtils.getPosition(elements11)).toEqual(
      elements11.draft?.position,
    );
    expect(ElementUtils.getPosition(elements12)).toEqual(
      elements12.unSaved?.position,
    );
    const tempElement = JSON.parse(JSON.stringify(elements12));
    tempElement.unSaved = { ...tempElement.unSaved, position: undefined };
    expect(ElementUtils.getPosition(tempElement)).toEqual(0);
  });

  test("get the element's published position", () => {
    expect(ElementUtils.getPosition(elements1, true)).toEqual(
      elements1.position,
    );
    expect(ElementUtils.getPosition(elements2, true)).toEqual(
      elements2.position,
    );
    expect(ElementUtils.getPosition(elements3, true)).toEqual(
      elements3.position,
    );
    expect(ElementUtils.getPosition(elements4, true)).toEqual(
      elements4.position,
    );
    expect(ElementUtils.getPosition(elements5, true)).toEqual(
      elements5.position,
    );
    expect(ElementUtils.getPosition(elements6, true)).toEqual(
      elements6.position,
    );
    expect(ElementUtils.getPosition(elements7, true)).toEqual(
      elements7.position,
    );
    expect(ElementUtils.getPosition(elements8, true)).toEqual(
      elements8.position,
    );
    expect(ElementUtils.getPosition(elements9, true)).toEqual(
      elements9.position,
    );
    expect(ElementUtils.getPosition(elements10, true)).toEqual(
      elements10.position,
    );
    expect(ElementUtils.getPosition(elements11, true)).toEqual(
      elements11.position,
    );
    expect(ElementUtils.getPosition(elements12, true)).toEqual(
      elements12.position || 0,
    );
  });

  test("get the element's content body", () => {
    expect(ElementUtils.getBodyContent(elements1)).toEqual(
      elements1.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements2)).toEqual(
      elements2.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements3)).toEqual(
      elements3.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements4)).toEqual(
      elements4.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements5)).toEqual(
      elements5.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements6)).toEqual(
      elements6.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements7)).toEqual(
      elements7.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements8)).toEqual(
      elements8.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements9)).toEqual(
      elements9.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements10)).toEqual(
      elements10.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements11)).toEqual(
      elements11.draft?.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements12)).toEqual(
      elements12.unSaved?.bodyContent,
    );
  });

  test("get the element's published content body", () => {
    expect(ElementUtils.getBodyContent(elements1, true)).toEqual(
      elements1.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements2, true)).toEqual(
      elements2.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements3, true)).toEqual(
      elements3.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements4, true)).toEqual(
      elements4.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements5, true)).toEqual(
      elements5.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements6, true)).toEqual(
      elements6.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements7, true)).toEqual(
      elements7.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements8, true)).toEqual(
      elements8.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements9, true)).toEqual(
      elements9.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements10, true)).toEqual(
      elements10.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements11, true)).toEqual(
      elements11.bodyContent,
    );
    expect(ElementUtils.getBodyContent(elements12, true)).toEqual(
      elements12.bodyContent,
    );
  });

  test("get the element's content header", () => {
    expect(ElementUtils.getHeaderContent(elements1)).toEqual(
      elements1.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements2)).toEqual(
      elements2.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements3)).toEqual(
      elements3.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements4)).toEqual(
      elements4.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements5)).toEqual(
      elements5.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements6)).toEqual(
      elements6.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements7)).toEqual(
      elements7.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements8)).toEqual(
      elements8.headerContent || null,
    );
    expect(ElementUtils.getHeaderContent(elements9)).toEqual(
      elements9.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements10)).toEqual(
      elements10.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements11)).toEqual(
      elements11.draft?.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements12)).toEqual(
      elements12.unSaved?.headerContent,
    );
  });

  test("get the element's published content header", () => {
    expect(ElementUtils.getHeaderContent(elements1, true)).toEqual(
      elements1.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements2, true)).toEqual(
      elements2.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements3, true)).toEqual(
      elements3.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements4, true)).toEqual(
      elements4.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements5, true)).toEqual(
      elements5.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements6, true)).toEqual(
      elements6.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements7, true)).toEqual(
      elements7.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements8, true)).toEqual(
      elements8.headerContent || null,
    );
    expect(ElementUtils.getHeaderContent(elements9, true)).toEqual(
      elements9.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements10, true)).toEqual(
      elements10.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements11, true)).toEqual(
      elements11.headerContent,
    );
    expect(ElementUtils.getHeaderContent(elements12, true)).toEqual(
      elements12.headerContent,
    );
  });

  test("get the element's is deleted", () => {
    expect(ElementUtils.getIsDeleted(elements1)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements2)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements3)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements4)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements5)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements6)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements7)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements8)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements9)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements10)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements11)).toEqual(
      elements11.draft?.isDeleted,
    );
    expect(ElementUtils.getIsDeleted(elements12)).toEqual(
      elements12.unSaved?.isDeleted,
    );
  });

  test("get the element's published is deleted", () => {
    expect(ElementUtils.getIsDeleted(elements1, true)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements2, true)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements3, true)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements4, true)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements5, true)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements6, true)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements7, true)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements8, true)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements9, true)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements10, true)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements11, true)).toEqual(false);
    expect(ElementUtils.getIsDeleted(elements12, true)).toEqual(false);
  });

  test("get the element's html content", () => {
    expect(ElementUtils.getBodyContentHTML(elements1)).toEqual('<br>');
    expect(ElementUtils.getBodyContentHTML(elements11)).toEqual(
      elements11.draft?.bodyContent,
    );
    expect(ElementUtils.getBodyContentHTML(elements12)).toEqual(
      elements12.unSaved?.bodyContent,
    );
  });

  test("get the element's published html content", () => {
    expect(ElementUtils.getBodyContentHTML(elements1, true)).toEqual('<br>');
    expect(ElementUtils.getBodyContentHTML(elements11, true)).toEqual(
      elements11.bodyContent,
    );
    expect(ElementUtils.getBodyContentHTML(elements12, true)).toEqual('');
  });

  test('check if the home/profile element removed or still', () => {
    expect(ElementUtils.removeProfile([elements1])).toEqual([]);
    expect(ElementUtils.removeProfile([elements2])).toEqual([elements2]);
  });

  test('check if the invitations element removed or still', () => {
    expect(ElementUtils.removeInvitation([elements1])).toEqual([elements1]);
    expect(ElementUtils.removeInvitation([elements2])).toEqual([]);
  });

  test('check if the networks element removed or still', () => {
    expect(ElementUtils.hideNetworksFromPublishedList(elements7)).toEqual(
      false,
    );
    expect(ElementUtils.hideNetworksFromPublishedList(elements10)).toEqual(
      true,
    );
    expect(ElementUtils.hideNetworksFromPublishedList(elements1)).toEqual(true);
  });

  test('check if the networks element removed or still', () => {
    expect(
      ElementUtils.convertNetworksToArray(
        ElementUtils.getNetworks(elements7, true),
      ),
    ).toEqual([]);
    expect(
      ElementUtils.convertNetworksToArray(
        ElementUtils.getNetworks(elements7, false, true),
      ),
    ).toEqual([]);
    expect(
      ElementUtils.convertNetworksToArray(
        ElementUtils.getNetworks(elements10, true),
      ),
    ).toEqual([
      { key: 'instagram', value: 'inmogr' },
      { key: 'twitter', value: 'inmogr' },
      { key: 'www', value: 'www.ahappygoodbye.com' },
    ]);
    expect(
      ElementUtils.convertNetworksToArray(
        ElementUtils.getNetworks(elements15, true),
      ),
    ).toEqual([]);
    expect(
      ElementUtils.convertNetworksToArray(
        ElementUtils.getNetworks(elements15, false, true),
      ),
    ).toEqual([]);
  });

  test('check if validator passing unencoded url', () => {
    expect(ElementUtils.isEmpty(elements16)).toEqual(false);
  });
});
