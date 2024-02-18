import data from '../fixtures/data.json';
import CommonPage from './commonPage';

class CommunityPage {
  get communityTab() {
    return cy.get('[data-testid="Nav-label"]').contains('Community');
  }

  get communityPostContainers() {
    return cy.xpath(
      '//div[contains(@aria-label, "post") or @data-testid="post-item-layout"]',
      { timeout: 60000 },
    );
  }

  get noumenaAnnouncementsTab() {
    return cy.get(
      '[data-test="CommunityTabs-TabButton-Noumena Announcements"]',
    );
  }

  get startConversationBox() {
    return cy.get('[data-test="Community-StartDiscussion"]');
  }

  get conversationModalTextBox() {
    return cy.xpath(
      '(//div[@data-testid="post_editor_container"]//div[@data-test="PostModalBody-StyledTextAreaContainer" or @class="DraftEditor-editorContainer"])[last()]',
    );
  }

  get conversationModalPostBtn() {
    return cy.get('[data-testid="post_create_btn"]');
  }

  get conversationModalCloseIcon() {
    return cy.get('[data-testid="modal_close_btn"]');
  }

  get conversationModalInputFile() {
    return cy.xpath(
      '//div[@data-testid="create_post_action_buttons"]/input[@type]',
    );
  }

  get conversationModalImageUploaded() {
    return cy.xpath(
      '//div[@data-testid="post_editor_container"]//div[@data-testid="asset_item"]/div[@data-testid="avatarContainer"]',
      { timeout: 30000 },
    );
  }

  get conversationModalVideoUploaded() {
    return cy.xpath(
      '//div[@data-testid="post_editor_container"]//div[@data-testid="asset_item"]//video',
      { timeout: 30000 },
    );
  }

  get postList() {
    return cy.xpath(
      '//div[contains(@aria-label, "post") or @data-testid="post-item-layout"]',
      {
        timeout: 30000,
      },
    );
  }

  get postedText() {
    return cy.xpath(
      '(//div[contains(@aria-label, "post") ]/div[@data-testid="post-item-content" and not(contains(.,"Pinned"))]//div[@data-test="PostItem-TextWrapper"])[1]', {timeout: 20000}
    );
  }

  get postedTextTagLink() {
    return cy.xpath(
      '(//div[contains(@aria-label, "post") ]/div[@data-testid="post-item-content" and not(contains(.,"Pinned"))]/div[@data-test="PostItem-TextWrapper"])[1]//a[@data-test="returnParsedTagsArrayWeb-StyledLink"]',
    );
  }

  get postedTextUrlLink() {
    return cy.xpath(
      '(//div[contains(@aria-label, "post") ]/div[@data-testid="post-item-content" and not(contains(.,"Pinned"))]/div[@data-test="PostItem-TextWrapper"])[1]//a',
    );
  }

  get tagSuggestionList() {
    return cy.get('[role="option"]');
  }

  get deleteCancelBtn() {
    return cy
      .get('[data-testid="post_delete_cancel_btn"]')
      .should('be.visible');
  }

  get deleteConfirmBtn() {
    return cy.get('[data-testid="post_delete_btn"]').should('be.visible');
  }

  get dropDownSelection() {
    return cy.get('[data-testid="dropdown-value"]');
  }

  getPostText(postText: string) {
    return cy.get('[data-test="PostItem-TextWrapper"]').contains(postText);
  }

  postLikeTextByText(text: string) {
    return cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${text}")]//span[@data-test="PostItemFooter-TSpan" and text()="Like"]`,
    );
  }

  postLikedIconByText(text: string) {
    return cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${text}")]//span[@data-test="PostItemFooter-TSpan" and contains(.,'Liked')]/ancestor::span/preceding-sibling::div[@color="--icon-card-brand-primary-default"]`,
    );
  }

  postLikedTextByText(text: string) {
    return cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${text}")]//span[@data-test="PostItemFooter-TSpan" and text()="Liked"]`,
    );
  }

  postLikedSingleMessageByText(text: string) {
    return cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${text}")]//span[@data-test="PostItem-TSpan" and text()="1 users liked this post."]`,
    );
  }

  postCommentIconByText(text: string) {
    return cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${text}")]//span[@data-test="PostItemFooter-TSpan" and text()="Comment"]`,
    );
  }

  postCommentSingleCountByText(text: string) {
    return cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${text}")]//span[@data-test="PostItemFooter-TSpan" and text()="1"]`,
    );
  }

  postCommentFieldByText(text: string) {
    return cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${text}")]//div[@data-testid="CommentsListContainer"]//textarea[@data-testid="mentionsInput"]`,
    );
  }

  postCommentSubmitBtnByText(text: string) {
    return cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${text}")]//div[@data-testid="CommentsListContainer"]//button[@data-testid="comment-item-add-send"]`,
    );
  }

  postCommentTextByText(text: string, commentText: string) {
    return cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${text}")]//div[@data-testid="CommentsListContainer" and contains(.,"${commentText}")]//*[@data-test="CommentItem-StyledText"]`,
    );
  }

  postCommentTextTimeStampByText(text: string, commentText: string) {
    return cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${text}")]//div[@data-testid="CommentsListContainer" and contains(.,"${commentText}")]`,
    );
  }

  postCommentTextEllipsisByText(text: string, commentText: string) {
    return cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${text}")]//div[@data-testid="CommentsListContainer" and contains(.,"${commentText}")]//*[@data-test="CommentActions-DropdownPicker"]`,
    );
  }

  postCommentTextReplyBtnByText(text: string, commentText: string) {
    return cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${text}")]//div[@data-testid="CommentsListContainer" and contains(.,"${commentText}")]//span[@data-test="CommentItem-TSpan" and text()="Reply"]`,
    );
  }

  postReplyToCommentFieldByText(postText: string, commentText: string) {
    return cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${postText}")]//div[@data-testid="CommentsListContainer" and contains(.,"${commentText}")]//textarea[@data-testid="mentionsInput" and @placeholder="Reply to the comment..."]`,
    );
  }

  postReplyToCommentBtnByText(postText: string, commentText: string) {
    return cy.xpath(
      `(//div[contains(@aria-label, "post") and contains(.,"${postText}")]//div[@data-testid="CommentsListContainer" and contains(.,"${commentText}")]//button[@data-testid="comment-item-add-send"])[last()]`,
    );
  }

  postReplyToCommentTextByText(postText: string, commentText: string) {
    return cy.xpath(
      `(//div[contains(@aria-label, "post") and contains(.,"${postText}")]//div[@data-testid="CommentsListContainer" and contains(.,"${commentText}")]//div[@data-test="CommentItem-CommentsListWrapper"]/*[@data-test="CommentItem-StyledText"])[last()]`,
    );
  }

  postReplyToCommentTimeStamptByText(postText: string, commentText: string) {
    return cy.xpath(
      `(//div[contains(@aria-label, "post") and contains(.,"${postText}")]//div[@data-testid="CommentsListContainer" and contains(.,"${commentText}")]//div[@data-test="CommentItem-CommentsListWrapper"]//*[@data-test="CommentItem-StyledTime"])[last()]`,
    );
  }

  postedImageByText(text: string) {
    return cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${text}")]/div[@data-testid="post-item-content" and not(contains(.,"Pinned"))]//div[@data-test="PostMedia-ItemImageWrap"]/img[contains(@src,"img")]`,
    );
  }

  get postedLatestImage() {
    return cy.xpath(
      `(//div[contains(@aria-label, "post")]/div[@data-testid="post-item-content" and not(contains(.,"Pinned"))]//div[@data-test="PostMedia-ItemImageWrap"]/img[contains(@src,"img")])[1]`,
    );
  }

  postedVideoByText(text: string) {
    return cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${text}")]/div[@data-testid="post-item-content" and not(contains(.,"Pinned"))]//div[@data-test="PostMedia-ItemImageWrap"]//video`,
    );
  }

  get postedLatestVideo() {
    return cy.xpath(
      `(//div[contains(@aria-label, "post")]/div[@data-testid="post-item-content" and not(contains(.,"Pinned"))]//div[@data-test="PostMedia-ItemImageWrap"]//video)[1]`,
    );
  }

  viewUserByName(postText: string) {
    cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${postText}")]//a[@data-test="PostItemHead-NavLink"]/span[@data-test="PostItemHead-TSpan"]`,
    )
      .scrollIntoView()
      .should('be.visible')
      .click();
  }

  viewUserByProfile(postText: string) {
    cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${postText}")]//a[@data-test="PostItemHead-NavLink"]/div[@data-test="PostItemHead-AvatarContainer"]`,
    )
      .scrollIntoView()
      .should('be.visible')
      .click();
  }

  selectEllipsisOption(option: string) {
    this.dropDownSelection.contains(option).click();
  }

  selectPostEllipsis(postText: string) {
    cy.xpath(
      `//div[@data-testid="post-item-content" and contains(.,"${postText}")]//div[@data-test="PostItemHead-NameWrap"]/following-sibling::button`,
    )
      .scrollIntoView()
      .click();
    return this;
  }

  selectPin() {
    this.selectEllipsisOption('Pin');
    return this;
  }

  selectUnpin() {
    this.selectEllipsisOption('Unpin');
    return this;
  }

  selectDelete() {
    this.selectEllipsisOption('Delete');
    return this;
  }

  conversationModalSend(postText: string) {
    this.conversationModalTextBox
      .should('be.visible')
      .click()
      .type('{selectAll}{del}')
      .type(postText, { delay: 0 });
    this.conversationModalPostBtn.click();
  }

  editPost(postText: string, newPostText: string) {
    this.selectPostEllipsis(postText);
    this.selectEllipsisOption('Edit');

    this.conversationModalSend(newPostText);
    CommonPage.verifyAlertMessage('Post is updated successfully');
    this.conversationModalPostBtn.should('not.exist');
    this.getPostText(newPostText).scrollIntoView().should('be.visible');
  }

  verifyPostIsPinned(isPinned: boolean, postText: string) {
    if (isPinned === true) {
      cy.xpath(
        `//div[contains(@aria-label, "post") and contains(.,"${postText}")]//div[@data-test="PostItemHead-PinTabText"]`,
      )
        .scrollIntoView()
        .should('be.visible');
    } else {
      cy.xpath(
        `//div[contains(@aria-label, "post") and contains(.,"${postText}")]//div[@data-test="PostItemHead-PinTabText"]`,
      ).should('not.exist');
    }
  }

  viewFirstPostReportModal() {
    cy.xpath('//div[@data-testid="post-item-content"]//div[@data-test="PostItemHead-NameWrap"]/following-sibling::button').first().click();
    this.selectEllipsisOption('Report');
  }

  reportPost(type: string, message?: string) {
    cy.get('[data-testid="report_reason_label"]')
      .contains(type)
      .parent()
      .siblings('[data-testid="stack"]')
      .children()
      .should('have.length', 1)
      .click();
    if (message !== undefined) {
      cy.get('body').then(($el) => {
        if ($el.find('[data-testid="report_reason_text_input"]').length > 0) {
          cy.get('[data-testid="report_reason_text_input"]').type(message);
        }
      });
    }
    cy.get('[data-testid="report_submit_btn"]').click();
    CommonPage.verifyAlertMessage('Post is reported successfully');

    cy.get('[data-testid="modal-content"]')
      .contains('Thanks for letting us know')
      .should('be.visible');
    cy.get('[data-testid="modal-content"]')
      .contains('We will review your message and address it immediately.')
      .scrollIntoView()
      .should('be.visible');
    cy.get('[data-testid="report_post_success_close_btn"]').click();
    cy.get('[data-testid="modal-content"]').should('not.exist');
  }

  navigateToCommunityScreen() {
    this.communityTab.click();
    this.communityPostContainers.should('be.visible');
    cy.url().should('include', '/community');
    cy.contains('All posts');
  }

  goToCommunityScreen() {
    cy.visit('/community');
    this.communityPostContainers.should('be.visible');
    cy.url().should('include', '/community');
    cy.contains('All posts');
    CommonPage.waitForSkeletonLoader();
  }

  postTextToCommunityScreen(text: string) {
    // post in the text area and validate length used
    this.startConversationBox.click();
    this.conversationModalSend(text);

    // validate text posted is present on the page
    CommonPage.verifyAlertMessage('New Post Published');
    cy.contains(text);
  }

  postTextOnlyToCommunityScreen(text: string) {
    // post in the text area and validate length used
    this.startConversationBox.click();
    this.conversationModalSend(text);
  }

  postCommentToCommunityScreen(postText: string, commentText: string) {
    // comment to the created post
    this.postCommentIconByText(postText).scrollIntoView().should('be.visible');
    this.postCommentIconByText(postText).click();
    this.postCommentFieldByText(postText).type(commentText);
    this.postCommentSubmitBtnByText(postText).click();

    // validate comment is posted
    // validate comment time is correct
    // validate ellipsis is visible and reply button
    this.postCommentTextByText(postText, commentText)
      .scrollIntoView()
      .should('be.visible');
    this.postCommentTextTimeStampByText(postText, commentText)
      .scrollIntoView()
      .should('be.visible');
    this.postCommentTextEllipsisByText(postText, commentText).should(
      'be.visible',
    );
  }

  likeAPost(postText: string) {
    // like the created post
    this.postLikeTextByText(postText).scrollIntoView().should('be.visible');
    this.postLikeTextByText(postText).click();
    // validate liked text is present
    this.postLikeTextByText(postText).should('not.exist');
    this.postLikedIconByText(postText).scrollIntoView().should('be.visible');
    this.postLikedTextByText(postText).should('be.visible');
    this.postLikedSingleMessageByText(postText)
      .scrollIntoView()
      .should('be.visible');
  }

  deletePost(postText: string) {
    // delete a post and verify it is deleted
    this.selectPostEllipsis(postText).selectDelete();
    this.deleteConfirmBtn.click();
    CommonPage.verifyAlertMessage('Post is deleted successfully');
    this.getPostText(postText).should('not.exist');
  }

  postImageToCommunityScreen(text: string, filepath: string) {
    // post in the text area with image
    this.startConversationBox.click();
    this.conversationModalTextBox.type(text);
    this.conversationModalInputFile.selectFile(filepath, { force: true });
    cy.wait(1000);
    this.conversationModalImageUploaded.scrollIntoView().should('be.visible');
    this.conversationModalPostBtn.click();
  }

  postVideoToCommunityScreen(text: string, filepath: string) {
    // post in the text area with video
    this.startConversationBox.click();
    this.conversationModalTextBox.type(text);
    this.conversationModalInputFile.selectFile(filepath, { force: true });
    cy.wait(1000);
    this.conversationModalVideoUploaded.scrollIntoView().should('be.visible');
    this.conversationModalPostBtn.click();
  }

  addTagUserInPost(fullname: string) {
    this.conversationModalTextBox.type(`{enter}@${fullname.split(' ')[0]}`);
    this.tagSuggestionList.contains(fullname).click();
  }

  addSeveralTagUsersInPost() {
    this.addTagUserInPost(data['community.post.tag.user1']);
    this.addTagUserInPost(data['community.post.tag.user2']);
    this.addTagUserInPost(data['community.post.tag.user3']);
    this.addTagUserInPost(data['community.post.tag.user4']);
  }

  verifyTagUsersIsPosted() {
    this.postedTextTagLink
      .contains(data['community.post.tag.user1'])
      .scrollIntoView()
      .should('be.visible');
    this.postedTextTagLink
      .contains(data['community.post.tag.user2'])
      .scrollIntoView()
      .should('be.visible');
    this.postedTextTagLink
      .contains(data['community.post.tag.user3'])
      .scrollIntoView()
      .should('be.visible');
    this.postedTextTagLink
      .contains(data['community.post.tag.user4'])
      .scrollIntoView()
      .should('be.visible');
  }
}

export default new CommunityPage();
