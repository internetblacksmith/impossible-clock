#!/bin/bash
# Test visual regression with CI baselines

export CI=true
npm test -- --spec="cypress/e2e/visual-regression.cy.js"