/// <reference types="cypress" />

describe("Responsive Design Tests", () => {
  const now = new Date(Date.UTC(2017, 2, 14, 18, 45, 30)).getTime(); // 18:45:30

  beforeEach(() => {
    cy.clock(now);
  });

  describe("responsive design", () => {
    const viewports = [
      { name: "mobile-portrait", width: 375, height: 667 },
      { name: "mobile-landscape", width: 667, height: 375 },
      { name: "tablet-portrait", width: 768, height: 1024 },
      { name: "tablet-landscape", width: 1024, height: 768 },
      { name: "desktop", width: 1920, height: 1080 },
      { name: "4k", width: 3840, height: 2160 }
    ];

    viewports.forEach(({ name, width, height }) => {
      it(`should display correctly on ${name} (${width}x${height})`, () => {
        cy.viewport(width, height);
        cy.visit("/");
        
        // Verify clock is visible and centered
        cy.get("#clock-container").should("be.visible");
        cy.get(".container").should("have.css", "display", "grid");
        
        // Verify switches are properly positioned
        cy.get("#switch").should("be.visible");
        cy.get(".single-switch").should("have.length", 3);
        
        // Take screenshot
        cy.screenshot(`responsive-${name}`, { capture: "fullPage" });
      });
    });

    it("should handle orientation changes", () => {
      // Start in portrait
      cy.viewport(375, 667);
      cy.visit("/");
      cy.screenshot("responsive-orientation-portrait", { capture: "viewport" });
      
      // Change to landscape
      cy.viewport(667, 375);
      cy.screenshot("responsive-orientation-landscape", { capture: "viewport" });
      
      // Verify layout adapts
      cy.get("#switch .single-switch").should("be.visible");
    });
  });


  describe("edge cases and stress tests", () => {
    it("should handle rapid toggle switching", () => {
      cy.visit("/");
      
      // Rapidly toggle all switches
      for (let i = 0; i < 5; i++) {
        cy.get("label.switch.hour").click();
        cy.get("label.switch.minute").click();
        cy.get("label.switch.second").click();
        cy.wait(50);
      }
      
      // Verify clock still works
      cy.get("#clock-container").should("be.visible");
      cy.screenshot("stress-test-rapid-toggle", { capture: "viewport" });
    });

    it("should handle very small viewport", () => {
      cy.viewport(320, 480);
      cy.visit("/");
      
      // Verify nothing breaks
      cy.get("#clock-container").should("be.visible");
      cy.get("#switch").should("be.visible");
      cy.screenshot("edge-case-small-viewport", { capture: "viewport" });
    });
  });
});