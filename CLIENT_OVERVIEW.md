# Cymbal Shop Quality Engineering Overview

## Project summary

This project is an automated quality-assurance suite for Cymbal Shop (Google Cloud Online Boutique). It uses Playwright and TypeScript to check key customer journeys in the browser and verify selected application and external API behavior.

The goal is to catch regressions in important shopping flows and provide actionable failure evidence for developers. The suite is an automated regression check; it is not a substitute for production monitoring or a guarantee that every possible customer scenario is covered.

## What is covered

| Area | Checks performed |
|---|---|
| Storefront smoke | Confirms the storefront loads, its title is recognizable, and the product catalog is visible. |
| Product and cart | Adds a set of catalog products to the cart, verifies the cart route and selected item, and checks the empty-cart flow. |
| Checkout | Completes the purchase form with deterministic test data and verifies the order confirmation state. |
| Currency | Checks USD and EUR price formatting, and checks yen formatting when JPY is available in the storefront. |
| Storefront API | Checks the storefront response, a known product detail response, and adding a product to the cart. |
| External API | Checks user-list and user-creation responses from ReqRes. This depends on that external service being reachable. |

The cart product checks currently run in a single test that iterates over the product list. If an iteration fails, later products in that test will not be checked during that run.

## Implementation

- **Playwright + TypeScript:** browser and API checks use the same test runner and assertion library.
- **Page objects:** shared storefront, product, and cart interactions live in `pages/`, reducing duplicated UI selectors and actions.
- **API clients:** application and external API requests are wrapped in small clients under `tests/api/`.
- **Explicit assertions:** tests validate visible user-facing outcomes and relevant response data, rather than only checking that an action completed.
- **Environment-aware timing:** Playwright uses bounded action, navigation, expectation, and test timeouts. CI is configured with retries and two workers; local runs use Playwright's default worker selection and one retry.
- **Failure diagnostics:** traces are collected on the first retry; screenshots and video are retained on failure. The HTML report is generated after a run.

## Continuous integration

The GitHub Actions workflow runs on pushes to `main`. It installs Node.js dependencies and Playwright browsers, creates a Kind cluster, deploys the Online Boutique Kubernetes manifests, waits for the frontend, and runs the test suite. It uploads the Playwright HTML report as a workflow artifact, including when tests fail.

The workflow uses a live deployment of the upstream application. Results can therefore depend on service availability, deployment readiness, test data, and the external ReqRes API.

## Running the suite

Requirements: Node.js 24, npm, Playwright browser dependencies, and a running Cymbal Shop instance accessible at `http://localhost:8080`. The CI workflow provisions the application using Docker/Kind and Kubernetes; local runs must provide a reachable application separately.

```powershell
npm ci
npx playwright install
npx playwright test
```

Run an individual area:

```powershell
npx playwright test tests\cart.spec.ts
npx playwright test tests\currency.spec.ts
npx playwright test tests\e2e-checkout.spec.ts
```

After a run, open the HTML report with:

```powershell
npx playwright show-report
```

The storefront API client defaults to `http://localhost:8080` and supports `BASE_URL` for its request base URL. The external API client defaults to `https://reqres.in` and supports `REQRES_BASE_URL`.

## Scope and next steps

This repository currently focuses on functional browser and API regression coverage. It does not include dedicated load/performance testing, accessibility conformance testing, security testing, or exhaustive cross-browser/device coverage. Those require separate test objectives, environments, and acceptance criteria.

Potential follow-up improvements include reporting each cart product as an independent test, adding additional browser projects, and defining explicit performance and accessibility acceptance criteria with the client.
