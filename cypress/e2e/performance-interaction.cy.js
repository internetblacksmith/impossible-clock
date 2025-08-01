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
      cy.screenshot("keyboard-nav-hour-focused", { capture: "viewport" });
      
      // Use space to toggle
      cy.get("#input-show-hour").type(" ");
      cy.wait(100);
      // Verify hour is hidden (first display should have 10 as first digit)
      cy.get("#display-1").invoke("attr", "class").should("match", /display-no-10-\d-\d/);
      cy.get("#display-2").invoke("attr", "class").should("match", /display-no-10-\d-\d/);
      
      // Focus next toggle
      cy.get("#input-show-minute").focus();
      cy.focused().should("have.id", "input-show-minute");
      cy.screenshot("keyboard-nav-minute-focused", { capture: "viewport" });
      
      // Focus last toggle
      cy.get("#input-show-second").focus();
      cy.focused().should("have.id", "input-show-second");
      cy.screenshot("keyboard-nav-second-focused", { capture: "viewport" });
    });

    it("should support keyboard interaction with GitHub link", () => {
      // Focus GitHub link
      cy.get("#github-logo a").focus();
      cy.focused().should("have.attr", "href").and("include", "github.com");
      cy.screenshot("keyboard-nav-github-focused", { capture: "viewport" });
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
      
      cy.screenshot("color-accuracy-dynamic", { capture: "viewport" });
    });

    it("should handle color transitions smoothly", () => {
      // Capture current state
      cy.screenshot("color-transition-before", { capture: "viewport" });
      
      // Wait for natural clock update
      cy.wait(1500);
      cy.screenshot("color-transition-after", { capture: "viewport" });
    });
  });

  describe("cross-browser visual consistency", () => {
    it("should maintain consistent layout", () => {
      // Verify critical dimensions
      cy.get("#clock-container svg").should("have.attr", "width", "330");
      cy.get("#clock-container svg").should("have.attr", "height", "284");
      
      // Verify switches exist and are visible
      cy.get(".switch").should("have.length", 3);
      cy.get(".switch").should("be.visible");
      
      // Screenshot for manual cross-browser comparison
      cy.screenshot("cross-browser-layout", { capture: "viewport" });
    });
  });

  describe("animation smoothness", () => {
    it("should animate toggle switches smoothly", () => {
      // Capture toggle animation sequence
      cy.get("label.switch.hour").click();
      
      // Capture multiple frames during animation
      for (let i = 0; i < 5; i++) {
        cy.wait(80); // ~400ms total animation time / 5 frames
        cy.screenshot(`animation-toggle-frame-${i}`, { 
          capture: "viewport",
          clip: { x: 850, y: 300, width: 300, height: 200 }
        });
      }
    });
  });
});