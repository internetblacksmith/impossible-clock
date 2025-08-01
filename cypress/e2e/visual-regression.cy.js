/// <reference types="cypress" />

describe("Visual Regression Tests", () => {
  const now = new Date(Date.UTC(2017, 2, 14, 10, 15, 30)).getTime(); // 10:15:30

  beforeEach(() => {
    cy.clock(now);
    cy.visit("/");
  });

  describe("clock display states", () => {
    it("should capture default clock appearance", () => {
      cy.get("#clock-container").should("be.visible");
      cy.screenshot("clock-default-state", { capture: "viewport" });
    });

    it("should capture clock at specific times", () => {
      const times = [
        { hours: 0, minutes: 0, seconds: 0, name: "midnight" },
        { hours: 12, minutes: 0, seconds: 0, name: "noon" },
        { hours: 23, minutes: 59, seconds: 59, name: "end-of-day" },
        { hours: 8, minutes: 8, seconds: 8, name: "all-eights" }
      ];

      times.forEach(({ hours, minutes, seconds, name }) => {
        const targetTime = new Date(Date.UTC(2017, 2, 14, hours, minutes, seconds)).getTime();
        cy.clock(targetTime);
        cy.visit("/"); // Need to reload page with new time
        cy.screenshot(`clock-time-${name}`, { capture: "viewport" });
      });
    });
  });

  describe("toggle combinations", () => {
    const combinations = [
      { hour: false, minute: true, second: true, name: "no-hours" },
      { hour: true, minute: false, second: true, name: "no-minutes" },
      { hour: true, minute: true, second: false, name: "no-seconds" },
      { hour: false, minute: false, second: true, name: "only-seconds" },
      { hour: false, minute: true, second: false, name: "only-minutes" },
      { hour: true, minute: false, second: false, name: "only-hours" },
      { hour: false, minute: false, second: false, name: "all-hidden" }
    ];

    combinations.forEach(({ hour, minute, second, name }) => {
      it(`should capture clock with ${name}`, () => {
        // Toggle switches as needed
        if (!hour) cy.get("label.switch.hour").first().click();
        if (!minute) cy.get("label.switch.minute").first().click();
        if (!second) cy.get("label.switch.second").first().click();

        cy.wait(100); // Allow animation to complete
        cy.screenshot(`clock-toggles-${name}`, { capture: "viewport" });
      });
    });
  });

  describe("interactive states", () => {
    it("should capture hover state on GitHub logo", () => {
      cy.get("#github-logo a").trigger("mouseover");
      cy.screenshot("github-logo-hover", { capture: "viewport" });
    });

    it("should capture focused toggle switch", () => {
      cy.get("#input-show-hour").focus();
      cy.screenshot("toggle-hour-focused", { capture: "viewport" });
    });
  });

  describe("clock segments visual test", () => {
    it("should verify all digit segments can be displayed", () => {
      // Test all digits 0-9 are visible correctly
      for (let digit = 0; digit <= 9; digit++) {
        const targetTime = new Date(Date.UTC(2017, 2, 14, digit, digit, digit)).getTime();
        cy.clock(targetTime);
        cy.visit("/"); // Reload with new time
        cy.screenshot(`clock-digit-${digit}`, { 
          capture: "viewport",
          clip: { x: 400, y: 200, width: 480, height: 320 }
        });
      }
    });
  });
});