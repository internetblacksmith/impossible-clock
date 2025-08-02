#!/bin/bash
# Generate CI baseline images using the CI environment

echo "Generating CI baseline images..."

# Run visual regression tests in CI mode
CI=true npm test -- --spec="cypress/e2e/visual-regression.cy.js"

echo "CI baseline images generated in cypress-visual-screenshots/comparison/baseline-ci/"
echo "Please commit these baselines if the tests are passing as expected."