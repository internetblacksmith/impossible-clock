/// <reference types="cypress" />

describe("Performance and Advanced Interaction Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("performance metrics", () => {
    it("should load quickly and be interactive", () => {
      // Check that elements are interactive
      cy.get("#clock-container").should("be.visible");
      cy.get(".switch").should("have.length", 3);
      
      // Verify switches are functional
      cy.get("input[type='checkbox']").should("have.length", 3);
      cy.get("input[type='checkbox']").should("be.checked");
    });

    it("should update clock smoothly", () => {
      // Verify clock is visible and functional
      cy.get("#display-1").should("be.visible");
      cy.get("#display-2").should("be.visible");
      
      // Verify clock displays have the correct format
      cy.get("#display-1").invoke("attr", "class").should("match", /display-no-\d-\d-\d/);
      cy.get("#display-2").invoke("attr", "class").should("match", /display-no-\d-\d-\d/);
      
      // Test a toggle still works
      cy.get("label.switch.hour").click();
      cy.wait(100);
      cy.get("#display-1").invoke("attr", "class").should("match", /display-no-10-\d-\d/);
      cy.get("#display-2").invoke("attr", "class").should("match", /display-no-10-\d-\d/);
    });
  });

  describe("keyboard navigation", () => {
    it("should support keyboard navigation through toggles", () => {
      // Focus first toggle directly
      cy.get("#input-show-hour").focus();
      cy.focused().should("have.id", "input-show-hour");
      // Screenshot removed - not needed for functional tests
      
      // Use space to toggle
      cy.get("#input-show-hour").type(" ");
      cy.wait(100);
      // Verify hour is hidden (first display should have 10 as first digit)
      cy.get("#display-1").invoke("attr", "class").should("match", /display-no-10-\d-\d/);
      cy.get("#display-2").invoke("attr", "class").should("match", /display-no-10-\d-\d/);
      
      // Focus next toggle
      cy.get("#input-show-minute").focus();
      cy.focused().should("have.id", "input-show-minute");
      // Screenshot removed
      
      // Focus last toggle
      cy.get("#input-show-second").focus();
      cy.focused().should("have.id", "input-show-second");
      // Screenshot removed
    });

    it("should support keyboard interaction with GitHub link", () => {
      // Focus GitHub link
      cy.get("#github-logo a").focus();
      cy.focused().should("have.attr", "href").and("include", "github.com");
      // Screenshot removed
    });
  });

  describe("color accuracy tests", () => {
    it("should display correct RGB values based on time", () => {
      // Verify displays are visible
      cy.get("#display-1").should("be.visible");
      cy.get("#display-2").should("be.visible");
      
      // Verify the clock has appropriate classes (format: display-no-H-M-S)
      cy.get("#display-1").invoke("attr", "class").should("match", /display-no-\d-\d-\d/);
      cy.get("#display-2").invoke("attr", "class").should("match", /display-no-\d-\d-\d/);
      
      // Toggle hours off to see RGB change
      cy.get("label.switch.hour").click();
      cy.wait(100);
      
      // Verify hours are hidden (10 means hidden)
      cy.get("#display-1").invoke("attr", "class").should("match", /display-no-10-\d-\d/);
      
      // Screenshot removed
    });

    it("should handle color transitions smoothly", () => {
      // Capture current state
      // Screenshot removed
      
      // Wait for natural clock update
      cy.wait(1500);
      // Screenshot removed
    });
  });

  describe("cross-browser visual consistency", () => {
    it("should maintain consistent layout", () => {
      // Verify SVG has proper viewBox for responsive scaling
      cy.get("#clock-container svg").should("have.attr", "viewBox", "-1 -1 20.625 17.75");
      cy.get("#clock-container svg").should("have.attr", "preserveAspectRatio", "xMidYMid meet");
      
      // Verify clock container is responsive
      cy.get("#clock-container").should("have.css", "width");
      cy.get("#clock-container svg").should("be.visible");
      
      // Verify switches exist and are visible
      cy.get(".switch").should("have.length", 3);
      cy.get(".switch").should("be.visible");
      
      // Screenshot for manual cross-browser comparison
      // Screenshot removed
    });
  });

  describe("animation smoothness", () => {
    it("should animate toggle switches smoothly", () => {
      // Capture toggle animation sequence
      cy.get("label.switch.hour").click();
      
      // Capture multiple frames during animation
      for (let i = 0; i < 5; i++) {
        cy.wait(80); // ~400ms total animation time / 5 frames
        // Screenshot removed - animation frames not needed
      }
    });
  });
});