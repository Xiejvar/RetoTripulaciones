describe("Form test", () => {
    it("Can fill the form", () => {
      cy.visit("/public");
      cy.get("form");

      cy.get("#user")
      .type("pepe")
      .should("have.value", "pepe")

      cy.get("#pass")
      .type("1234")
      .should("have.value", "1234")

      cy.get("#btnForm")
      .click()

    })
})