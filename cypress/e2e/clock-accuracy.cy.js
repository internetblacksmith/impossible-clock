/// <reference types="cypress" />

describe("Clock Accuracy and Edge Cases", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("time accuracy", () => {
    it("should update every second accurately", () => {
      const startTime = new Date(Date.UTC(2017, 2, 14, 23, 59, 55)).getTime();
      cy.clock(startTime);
      
      // Verify initial time
      cy.get("#display-1").should("have.class", "display-no-2-5-5");
      cy.get("#display-2").should("have.class", "display-no-3-9-5");
      
      // Test second transitions
      for (let i = 1; i <= 5; i++) {
        cy.tick(1000);
        const expectedSecond = 55 + i;
        const secondDigit1 = Math.floor(expectedSecond / 10);
        const secondDigit2 = expectedSecond % 10;
        
        if (expectedSecond < 60) {
          cy.get("#display-1").should("have.class", `display-no-2-5-${secondDigit1}`);
          cy.get("#display-2").should("have.class", `display-no-3-9-${secondDigit2}`);
        }
      }
    });

    it("should handle minute rollover correctly", () => {
      const startTime = new Date(Date.UTC(2017, 2, 14, 10, 29, 59)).getTime();
      cy.clock(startTime);
      
      // Before rollover
      cy.get("#display-1").should("have.class", "display-no-1-2-5");
      cy.get("#display-2").should("have.class", "display-no-0-9-9");
      
      // After rollover
      cy.tick(1000);
      cy.get("#display-1").should("have.class", "display-no-1-3-0");
      cy.get("#display-2").should("have.class", "display-no-0-0-0");
    });

    it("should handle hour rollover correctly", () => {
      const startTime = new Date(Date.UTC(2017, 2, 14, 9, 59, 59)).getTime();
      cy.clock(startTime);
      
      // Before rollover
      cy.get("#display-1").should("have.class", "display-no-0-5-5");
      cy.get("#display-2").should("have.class", "display-no-9-9-9");
      
      // After rollover
      cy.tick(1000);
      cy.get("#display-1").should("have.class", "display-no-1-0-0");
      cy.get("#display-2").should("have.class", "display-no-0-0-0");
    });

    it("should handle midnight rollover correctly", () => {
      const startTime = new Date(Date.UTC(2017, 2, 14, 23, 59, 59)).getTime();
      cy.clock(startTime);
      
      // Before midnight
      cy.get("#display-1").should("have.class", "display-no-2-5-5");
      cy.get("#display-2").should("have.class", "display-no-3-9-9");
      
      // After midnight
      cy.tick(1000);
      cy.get("#display-1").should("have.class", "display-no-0-0-0");
      cy.get("#display-2").should("have.class", "display-no-0-0-0");
    });
  });

  describe("toggle persistence", () => {
    it("should maintain toggle states during time updates", () => {
      const startTime = new Date(Date.UTC(2017, 2, 14, 15, 30, 0)).getTime();
      cy.clock(startTime);
      
      // Disable minutes
      cy.get("label.switch.minute").click();
      
      // Verify initial state
      cy.get("#display-1").should("have.class", "display-no-1-10-0");
      cy.get("#display-2").should("have.class", "display-no-5-10-0");
      
      // Advance time and verify minutes stay hidden
      cy.tick(5000);
      cy.get("#display-1").should("have.class", "display-no-1-10-0");
      cy.get("#display-2").should("have.class", "display-no-5-10-5");
    });
  });

  describe("boundary conditions", () => {
    // Test each hour as a separate test case for better isolation
    [
      { hour: 0, display1: "0", display2: "0" },
      { hour: 1, display1: "0", display2: "1" },
      { hour: 9, display1: "0", display2: "9" },
      { hour: 10, display1: "1", display2: "0" },
      { hour: 23, display1: "2", display2: "3" }
    ].forEach(({ hour, display1, display2 }) => {
      it(`should display hour ${hour} as ${display1}${display2}:00:00`, () => {
        const time = new Date(Date.UTC(2017, 2, 14, hour, 0, 0)).getTime();
        cy.clock(time);
        cy.visit("/");
        
        cy.get("#display-1").should("have.class", `display-no-${display1}-0-0`);
        cy.get("#display-2").should("have.class", `display-no-${display2}-0-0`);
        cy.screenshot(`boundary-hour-${hour}`, { capture: "viewport" });
      });
    });
  });

  describe("background color verification", () => {
    it("should update background colors based on toggle states", () => {
      cy.visit("/");
      
      // All on - should have class body-on-on-on
      cy.get("body").should("have.class", "body-on-on-on");
      
      // Toggle hour off
      cy.get("label.switch.hour").click();
      cy.get("body").should("have.class", "body-off-on-on");
      
      // Toggle minute off
      cy.get("label.switch.minute").click();
      cy.get("body").should("have.class", "body-off-off-on");
      
      // Toggle second off
      cy.get("label.switch.second").click();
      cy.get("body").should("have.class", "body-off-off-off");
    });
  });
});