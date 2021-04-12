/// <reference types="cypress" />
// remove no check once Cypress.sinon is typed
// https://github.com/cypress-io/cypress/issues/6720

context("Test", () => {
  const url = "/";
  const now = new Date(Date.UTC(2017, 2, 14)).getTime();

  beforeEach(function () {
    cy.clock(now);
    cy.visit(url);
  });

  context("by default", () => {
    it("Hours, Minutes and seconds checkboxes should be checked", () => {
      cy.get("#input-show-second").should("be.checked");
      cy.get("#input-show-minute").should("be.checked");
      cy.get("#input-show-hour").should("be.checked");
    });

    it("hours minutes and seconds are displayed", () => {
      cy.get("#display-1").should("have.class", "display-no-0-0-0");
      cy.get("#display-2").should("have.class", "display-no-0-0-0");

      cy.tick(45296000); // 12 hours 34 minutes and 56 seconds passed

      cy.get("#display-1").should("have.class", "display-no-1-3-5");
      cy.get("#display-2").should("have.class", "display-no-2-4-6");
    });
  });
  context("hiding sections", () => {
    it("unchecking the hours should disable them", () => {
      cy.get("label.switch.hour").first().click();

      cy.tick(1000);

      cy.get("#display-1").should("have.class", "display-no-10-0-0");
      cy.get("#display-2").should("have.class", "display-no-10-0-1");

      cy.tick(45295000); // 12 hours 34 minutes and 56 seconds passed

      cy.get("#display-1").should("have.class", "display-no-10-3-5");
      cy.get("#display-2").should("have.class", "display-no-10-4-6");
    });

    it("unchecking the minutes should disable them", () => {
      cy.get("label.switch.minute").first().click();

      cy.tick(1000);

      cy.get("#display-1").should("have.class", "display-no-0-10-0");
      cy.get("#display-2").should("have.class", "display-no-0-10-1");

      cy.tick(45295000); // 12 hours 34 minutes and 56 seconds passed

      cy.get("#display-1").should("have.class", "display-no-1-10-5");
      cy.get("#display-2").should("have.class", "display-no-2-10-6");
    });

    it("unchecking the seconds should disable them", () => {
      cy.get("label.switch.second").first().click();

      cy.tick(1000);

      cy.get("#display-1").should("have.class", "display-no-0-0-10");
      cy.get("#display-2").should("have.class", "display-no-0-0-10");

      cy.tick(45295000); // 12 hours 34 minutes and 56 seconds passed

      cy.get("#display-1").should("have.class", "display-no-1-3-10");
      cy.get("#display-2").should("have.class", "display-no-2-4-10");
    });
  });
});
