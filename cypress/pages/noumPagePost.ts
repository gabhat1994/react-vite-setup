import CommonPage from './commonPage';

class NoumPagePost {
  // generic elements
  get modalHeaderTitle() {
    return cy.xpath(
      '//div[@id="modal-content"]//span[@data-test="ModalHeader-Title-TSpan"]',
    );
  }

  get dropDownValue() {
    return cy.xpath('//a[@data-testid="dropdown-value"]');
  }

  get favouriteIcon() {
    return cy.xpath('//div[@data-test="Favourite-IconWrapper"]/div');
  }

  get backBtn() {
    return cy.xpath(
      '//a[@data-testid="Side-Nav-Item"] | //div[@id="AppSideNavigation"]//button[@aria-label="Back"]',
    );
  }

  get dropDownSelection() {
    return cy.get('[data-testid="dropdown-value"]');
  }

  get deleteConfirmBtn() {
    return cy
      .xpath(
        '//*[@data-testid="post_delete_btn"] | //*[@data-testid="primaryBtn"]',
      )
      .should('be.visible');
  }

  get postEmptyTitle() {
    return cy.xpath(
      '//span[@data-test="PostBody-NoPosts" and text()="No Posts Yet"]',
    );
  }

  get postCreateSection() {
    return cy.get('[data-testid="create-post-button"]');
  }

  get postModalTextBox() {
    return cy.xpath(
      '//*[(@data-testid="mentionsInput" and @placeholder="What’s on your mind?") or @aria-describedby="placeholder-editor"] | //div[@class="DraftEditor-editorContainer"]/div[@contenteditable="true"]',
    );
  }

  get postModalSubmitBtn() {
    return cy.xpath('//button[@data-testid="post_create_btn"]');
  }

  get postContentList() {
    return cy.xpath(
      '//*[@data-test="ParsedContent-StyledText" or @class="public-DraftEditor-content"]',
    );
  }

  postLikeContentByText(text: string) {
    return cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${text}")]//span[@data-test="PostItemFooter-TSpan" and text()="Like"]`,
    );
  }

  postLikedIconByText(text: string) {
    return cy.xpath(
      `//div[contains(@aria-label, "post") and contains(.,"${text}")]//span[@data-test="PostItemFooter-TSpan" and contains(.,'Liked')]/ancestor::span/preceding-sibling::div[@color="--icon-card-brand-primary-default"]`,
    );
  }

  postLikedContentByText(text: string) {
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

  postCommentFieldByText(text: string) {
    return cy.xpath(
      `//div[@data-testid="post-item-content" and contains(.,"${text}")]//div[@data-testid="CommentsListContainer"]//textarea[@data-testid="mentionsInput"]`,
    );
  }

  postCommentSubmitBtnByText(text: string) {
    return cy.xpath(
      `//div[@data-testid="post-item-content" and contains(.,"${text}")]//div[@data-testid="CommentsListContainer"]//button[@data-testid="comment-item-add-send"]`,
    );
  }

  postCommentTextByText(text: string, commentText: string) {
    return cy.xpath(
      `//div[@data-testid="post-item-content" and contains(.,"${text}")]//div[@data-testid="CommentsListContainer" and contains(.,"${commentText}")]//*[@data-test="CommentItem-StyledText"]`,
    );
  }

  getPostText(postText: string) {
    return cy
      .xpath('//*[@data-text="true" or @data-test="ParsedContent-StyledText"]')
      .contains(postText);
  }

  selectPostEllipsis(postText: string) {
    cy.xpath(
      `//div[@data-testid="post-item-content" and contains(.,"${postText}")]//div[@data-test="PostItemHead-NameWrap"]/following-sibling::button | //div[@data-testid="post-item-content" and contains(.,"${postText}")]//div[@data-test="DropdownPicker"]`,
    )
      .scrollIntoView()
      .click();
    return this;
  }

  selectDelete() {
    this.selectEllipsisOption('Delete');
    return this;
  }

  selectEllipsisOption(option: string) {
    this.dropDownSelection.contains(option).click();
  }

  postCommentTextReplyBtnByText(text: string, commentText: string) {
    return cy.xpath(
      `//div[@data-testid="post-item-content" and contains(.,"${text}")]//div[@data-testid="CommentsListContainer" and contains(.,"${commentText}")]//span[@data-test="CommentItem-TSpan" and text()="Reply"]`,
    );
  }

  postReplyToCommentFieldByText(postText: string, commentText: string) {
    return cy.xpath(
      `//div[@data-testid="post-item-content" and contains(.,"${postText}")]//div[@data-testid="CommentsListContainer" and contains(.,"${commentText}")]//textarea[@data-testid="mentionsInput" and @placeholder="Reply to the comment..."]`,
    );
  }

  postReplyToCommentBtnByText(postText: string, commentText: string) {
    return cy.xpath(
      `(//div[@data-testid="post-item-content"and contains(.,"${postText}")]//div[@data-testid="CommentsListContainer" and contains(.,"${commentText}")]//button[@data-testid="comment-item-add-send"])[last()]`,
    );
  }

  postReplyToCommentTextByText(postText: string, commentText: string) {
    return cy.xpath(
      `(//div[@data-testid="post-item-content" and contains(.,"${postText}")]//div[@data-testid="CommentsListContainer" and contains(.,"${commentText}")]//div[@data-test="CommentItem-CommentsListWrapper"]/*[@data-test="CommentItem-StyledText"])[last()]`,
    );
  }

  postReplyToCommentTimeStamptByText(postText: string, commentText: string) {
    return cy.xpath(
      `(//div[@data-testid="post-item-content" and contains(.,"${postText}")]//div[@data-testid="CommentsListContainer" and contains(.,"${commentText}")]//div[@data-test="CommentItem-CommentsListWrapper"]//*[@data-test="CommentItem-StyledTime"])[last()]`,
    );
  }

  waitCommentSpinner() {
    cy.xpath(
      '//button[@data-testid="comment-item-add-send"]/span[@data-testid="spinner"]',
    ).should('be.visible');
    cy.xpath(
      '//button[@data-testid="comment-item-add-send"]/span[@data-testid="spinner"]',
    ).should('not.exist');
    return this;
  }

  waitListCommentSpinner() {
    cy.get('[data-test="CommentsList-SpinnerContainer"]').should('be.visible');
    cy.get('[data-test="CommentsList-SpinnerContainer"]').should('not.exist');
    return this;
  }

  likePostContentFirstTime(postText: string) {
    // like the created post
    this.postLikeContentByText(postText).scrollIntoView().should('be.visible');
    this.postLikeContentByText(postText).click();
    // validate like text is not present
    // validate liked text is present
    // validate liked icon is enabled
    // validate liked message for single post is displayed
    this.postLikeContentByText(postText).should('not.exist');
    this.postLikedIconByText(postText).should('be.visible');
    this.postLikedContentByText(postText).should('be.visible');
    this.postLikedSingleMessageByText(postText)
      .scrollIntoView()
      .should('be.visible');
    return this;
  }

  likePostContent(postText: string) {
    // like the created post
    this.postLikeContentByText(postText).scrollIntoView().should('be.visible');
    this.postLikeContentByText(postText).click();
    // validate like text is not present
    // validate liked text is present
    // validate liked icon is enabled
    // validate liked message for single post is displayed
    this.postLikeContentByText(postText).should('not.exist');
    this.postLikedIconByText(postText).should('be.visible');
    this.postLikedContentByText(postText).should('be.visible');
    return this;
  }

  commentToAPost(postText: string, commentText: string) {
    // comment to the created post
    this.postCommentIconByText(postText).scrollIntoView().should('be.visible');
    this.postCommentIconByText(postText).click();
    this.postCommentFieldByText(postText).type(commentText);
    this.postCommentSubmitBtnByText(postText).click();

    // validate comment is posted
    this.postCommentTextByText(postText, commentText).should('be.visible');
    return this;
  }

  deleteComment(postText: string) {
    // delete a comment and verify it is deleted
    cy.xpath(
      `//div[@data-test="CommentItem-CommentsListWrapper" and contains(.,"${postText}")]//div[@data-test="CommentActions-DropdownPicker"]`,
    ).click();
    this.selectDelete();
    this.deleteConfirmBtn.click();
    cy.xpath(
      `//div[@data-test="CommentItem-CommentsListWrapper" and contains(.,"${postText}")]`,
    ).should('not.exist');
    return this;
  }

  deletePost(postText: string) {
    // delete a post and verify it is deleted
    this.selectPostEllipsis(postText).selectDelete();
    this.deleteConfirmBtn.click();
    CommonPage.verifyAlertMessage('Post is deleted successfully');

    cy.get('body').then(($el) => {
      if ($el.find('[data-text="true"]').length > 0) {
        this.getPostText(postText).should('not.exist');
      } else {
        cy.get('[data-text="true"]').should('not.exist');
      }
    });

    return this;
  }

  replyToPostComment(postText: string, commentText: string, replyText: string) {
    // reply to a comment
    this.postCommentTextReplyBtnByText(postText, commentText).click();
    this.postReplyToCommentFieldByText(postText, commentText).should(
      'be.visible',
    );
    this.postReplyToCommentFieldByText(postText, commentText).type(replyText);
    this.postReplyToCommentBtnByText(postText, commentText).click();

    cy.xpath(
      '//div[@data-testid="RepliesListContainer"]//span[@data-test="CommentItem-StyledText"]',
    ).should('be.visible');
    // validate a reply to a comment it posted
    this.postReplyToCommentTextByText(postText, commentText)
      .invoke('text')
      .should('eq', replyText);
    return this;
  }

  postTextToElement(postText: string) {
    this.postCreateSection.click();
    this.postModalTextBox.type(postText);
    this.postModalSubmitBtn.click();
    // verify post is displayed
    CommonPage.verifyAlertMessage('New Post Published');
    this.postModalSubmitBtn.should('not.exist');
    this.postContentList.contains(postText).should('be.be.visible');
    return this;
  }

  editTextToElement(postText: string, updatedPostText: string) {
    this.selectPostEllipsis(postText);
    this.selectEllipsisOption('Edit');

    this.postModalTextBox
      .should('be.visible')
      .click()
      .type('{selectAll}{del}')
      .type(updatedPostText);
    this.postModalSubmitBtn.click();
    CommonPage.verifyAlertMessage('Post is updated successfully');
    this.postModalSubmitBtn.should('not.exist');
    this.postContentList.contains(updatedPostText).should('be.be.visible');
    return this;
  }

  reportPost(type: string, message?: string) {
    cy.xpath('//div[@data-testid="post-item-content"]//div[@data-test="PostItemHead-NameWrap"]/following-sibling::button').first().click();
    this.selectEllipsisOption('Report');

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
      .should('be.visible');
    cy.get('[data-testid="report_post_success_close_btn"]').click();
    cy.get('[data-testid="modal-content"]').should('not.exist');

    return this;
  }

  verifyDeleteOptionNotExist() {
    cy.xpath('//div[@data-testid="post-item-content"]//div[@data-test="PostItemHead-NameWrap"]/following-sibling::button').first().click();
    this.dropDownSelection.contains('Delete').should('not.exist');
    return this;
  }
}
export default new NoumPagePost();
