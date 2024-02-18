class CommonModal {
  close() {
    cy.get('[data-testid="modal_close_btn"]').click();
    cy.get('[data-testid="modal-content"]').should('not.exist');
  }
}
export default new CommonModal();
