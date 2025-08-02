/// <reference types="cypress" />

describe("Visual Regression Tests", () => {
  const now = new Date(Date.UTC(2017, 2, 14, 10, 15, 30)).getTime(); // 10:15:30

  beforeEach(() => {
    cy.clock(now);
    cy.visit("/");
    
    // Inject CSS for consistent rendering
    cy.readFile("cypress/support/visual-regression.css").then((css) => {
      cy.document().then((doc) => {
        const style = doc.createElement("style");
        style.innerHTML = css;
        doc.head.appendChild(style);
      });
    });
    
    // Ensure fonts are loaded and page is stable
    cy.get("#clock-container").should("be.visible");
    cy.wait(200); // Wait for fonts and rendering
    
    // Force consistent rendering
    cy.document().then((doc) => {
      doc.fonts.ready.then(() => {
        cy.log("Fonts loaded");
      });
    });
  });

  describe("clock display states", () => {
    it("should match default clock appearance", () => {
      cy.get("#clock-container").should("be.visible");
      cy.wait(100); // Ensure stable render
      cy.compareSnapshot("clock-default-state", {
        capture: 'viewport',
        errorThreshold: 0.05 // 5% threshold
      });
    });

    it("should match clock at specific times", () => {
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
        cy.wait(100);
        cy.compareSnapshot(`clock-time-${name}`);
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
      it(`should match clock with ${name}`, () => {
        // Toggle switches as needed
        if (!hour) cy.get("label.switch.hour").first().click();
        if (!minute) cy.get("label.switch.minute").first().click();
        if (!second) cy.get("label.switch.second").first().click();

        cy.wait(100); // Allow animation to complete
        cy.compareSnapshot(`clock-toggles-${name}`);
      });
    });
  });

  describe("interactive states", () => {
    it("should match hover state on GitHub logo", () => {
      cy.get("#github-logo a").trigger("mouseover");
      cy.wait(100);
      cy.compareSnapshot("github-logo-hover");
    });

    it("should match focused toggle switch", () => {
      cy.get("#input-show-hour").focus();
      cy.wait(100);
      cy.compareSnapshot("toggle-hour-focused");
    });
  });

  describe("responsive design visual tests", () => {
    const viewports = [
      { name: "mobile", width: 375, height: 667 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "desktop", width: 1920, height: 1080 }
    ];

    viewports.forEach(({ name, width, height }) => {
      it(`should match appearance on ${name}`, () => {
        cy.viewport(width, height);
        cy.wait(100);
        cy.compareSnapshot(`responsive-${name}`);
      });
    });
  });

  describe("clock segments visual test", () => {
    it("should match all digit displays", () => {
      // Test specific digit combinations
      const digitTests = [
        { time: "00:00:00", name: "all-zeros" },
        { time: "11:11:11", name: "all-ones" },
        { time: "88:88:88", name: "all-eights" },
        { time: "12:34:56", name: "sequential" }
      ];

      digitTests.forEach(({ time, name }) => {
        const [h, m, s] = time.split(':').map(Number);
        const targetTime = new Date(Date.UTC(2017, 2, 14, h, m, s)).getTime();
        cy.clock(targetTime);
        cy.visit("/");
        cy.wait(100);
        cy.compareSnapshot(`clock-digits-${name}`);
      });
    });
  });
});