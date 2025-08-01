/// <reference types="cypress" />

describe("Impossible Clock", () => {
  const url = "/";
  const now = new Date(Date.UTC(2017, 2, 14)).getTime();

  beforeEach(() => {
    cy.clock(now);
    cy.visit(url);
  });

  describe("default state", () => {
    it("should have all time component toggles enabled by default", () => {
      cy.get("#input-show-hour").should("be.checked");
      cy.get("#input-show-minute").should("be.checked");
      cy.get("#input-show-second").should("be.checked");
    });

    it("should display time correctly with all components enabled", () => {
      cy.get("#display-1").should("have.class", "display-no-0-0-0");
      cy.get("#display-2").should("have.class", "display-no-0-0-0");

      cy.tick(45296000); // 12 hours 34 minutes and 56 seconds passed

      cy.get("#display-1").should("have.class", "display-no-1-3-5");
      cy.get("#display-2").should("have.class", "display-no-2-4-6");
    });
  });

  describe("toggle functionality", () => {
    it("should hide hours when hour toggle is disabled", () => {
      cy.get("label.switch.hour").first().click();

      cy.tick(1000);

      cy.get("#display-1").should("have.class", "display-no-10-0-0");
      cy.get("#display-2").should("have.class", "display-no-10-0-1");

      cy.tick(45295000); // 12 hours 34 minutes and 56 seconds passed

      cy.get("#display-1").should("have.class", "display-no-10-3-5");
      cy.get("#display-2").should("have.class", "display-no-10-4-6");
    });

    it("should hide minutes when minute toggle is disabled", () => {
      cy.get("label.switch.minute").first().click();

      cy.tick(1000);

      cy.get("#display-1").should("have.class", "display-no-0-10-0");
      cy.get("#display-2").should("have.class", "display-no-0-10-1");

      cy.tick(45295000); // 12 hours 34 minutes and 56 seconds passed

      cy.get("#display-1").should("have.class", "display-no-1-10-5");
      cy.get("#display-2").should("have.class", "display-no-2-10-6");
    });

    it("should hide seconds when second toggle is disabled", () => {
      cy.get("label.switch.second").first().click();

      cy.tick(1000);

      cy.get("#display-1").should("have.class", "display-no-0-0-10");
      cy.get("#display-2").should("have.class", "display-no-0-0-10");

      cy.tick(45295000); // 12 hours 34 minutes and 56 seconds passed

      cy.get("#display-1").should("have.class", "display-no-1-3-10");
      cy.get("#display-2").should("have.class", "display-no-2-4-10");
    });

    it("should handle multiple toggles disabled simultaneously", () => {
      // Disable hours and minutes
      cy.get("label.switch.hour").first().click();
      cy.get("label.switch.minute").first().click();

      cy.tick(1000);

      // Only seconds should be displayed
      cy.get("#display-1").should("have.class", "display-no-10-10-0");
      cy.get("#display-2").should("have.class", "display-no-10-10-1");
    });
  });

  describe("accessibility", () => {
    it("should have proper labels for toggle switches", () => {
      cy.get('label[for="input-show-hours"]').should("contain.text", "H");
      cy.get('label[for="input-show-minute"]').should("contain.text", "M"); 
      cy.get('label[for="input-show-second"]').should("contain.text", "S");
    });

    it("should have focusable toggle elements", () => {
      // Toggle inputs are hidden (opacity: 0) but should still be focusable
      cy.get("#input-show-hour").should("exist").focus();
      cy.get("#input-show-minute").should("exist").focus(); 
      cy.get("#input-show-second").should("exist").focus();
    });
  });

  describe("visual elements", () => {
    it("should display the clock SVG elements", () => {
      cy.get("#clock-container svg").should("be.visible");
      cy.get("#display-1").should("be.visible");
      cy.get("#display-2").should("be.visible");
    });

    it("should display GitHub link", () => {
      cy.get("#github-logo a")
        .should("be.visible")
        .should("have.attr", "href")
        .and("include", "github.com");
    });
  });
});
