# Microservices E2E Automation Engine
[![Playwright Tests](https://github.com/siddharth-builds/boutique-qa-engine/actions/workflows/playwright.yml/badge.svg)](https://github.com/siddharth-builds/boutique-qa-engine/actions/workflows/playwright.yml)

A production-grade test automation framework engineered to validate the Google Cloud Online Boutique (Cymbal Shop). This suite protects revenue-critical flows by validating distributed UI state, internal API endpoints, and database interactions against an ephemeral Kubernetes cluster.

Designed for maintainability and speed, it leverages Page Object Models (POM), API Clients, and fully containerized CI/CD execution to catch microservice regressions before they hit production.

---

## 🛠️ The Tech Stack
- **Framework:** Playwright & TypeScript
- **Runtime:** Node.js 24
- **Infrastructure:** Docker, Kubernetes (Kind), kubectl
- **CI/CD:** GitHub Actions
- **Configuration:** dotenv for environment parity

---

## 🏗️ Architecture & Design Patterns
I prioritized clean, maintainable code structures over quick-and-dirty scripts. If the UI or the backend routes change, the framework only requires updates in one centralized location.

- **Page Object Model (POM):** Abstracted all UI locators and user interactions into dedicated `HomePage`, `ProductPage`, and `CartPage` classes. This keeps test specs highly readable and purely focused on assertions.
- **API Object Model:** Implemented a service client pattern (`ProductsApiClient`, `UsersApiClient`) to wrap Playwright's `APIRequestContext`. This isolates HTTP routing and headers from the test logic, allowing test suites to cleanly execute native HTTP requests against internal microservices without touching the browser.

---
```
├── .github/workflows/       # GitHub Actions CI/CD pipeline definitions
├── pages/                   # Page Object Model (POM) classes
│   ├── CartPage.ts          # Cart interaction abstractions
│   ├── HomePage.ts          # Global navigation and layout
│   └── ProductPage.ts       # Product selection and details
├── tests/
│   ├── api/                 # API Object Model & Native API Tests
│   │   ├── ProductsApiClient.ts
│   │   ├── UsersApiClient.ts
│   │   ├── products.api.spec.ts
│   │   └── users.api.spec.ts
│   ├── cart.spec.ts         # Stateful cart manipulation tests
│   ├── currency.spec.ts     # Global navigation and state retention
│   ├── e2e-checkout.spec.ts # Full revenue-path validation
│   └── smoke.spec.ts        # Critical path health checks
├── playwright.config.ts     # Core framework execution configuration
└── package.json             # Dependencies and NPM scripts
```
---
## Business Impact 
The test suites are designed to validate actual business logic and edge cases, not just happy paths:

- **Revenue Protection (E2E Checkout):** Automates the complete buying journey, handling complex forms and Luhn-valid credit card processing to ensure the paymentservice never blocks a sale.
- **Session Reliability (Stateful Cart):** Data-driven parameterized tests inject products, validate dynamic shipping calculations, and confirm precise state purging by the cartservice.
- **Localization Integrity (Currency Conversion):** Validates that UI pricing symbols dynamically update (USD to EUR to JPY) without dropping user sessions across the currencyservice.
- **Shift-Left API Testing:** Directly hits internal Kubernetes endpoints (localhost:8080) to validate JSON/HTML responses, proving routing logic works independently of UI rendering.

---

## 🚀 CI/CD & Cloud Execution
The framework integrates seamlessly with GitHub Actions to enforce a strict "shift-left" testing strategy, gating pull requests to ensure regressions never reach production. The pipeline architecture is optimized for speed, reliability, and zero-dependency execution:

- **Ephemeral Infrastructure: **Programmatically provisions an isolated, multi-container Kubernetes cluster (kind) on the fly, ensuring clean, repeatable test runs without environment contamination.

- **Smart Orchestration: **Implements dynamic readiness polling to guarantee all distributed microservices are fully healthy before initiating the test suite.

- **Pipeline Optimization: **Leverages aggressive caching strategies for NPM dependencies and Playwright browser binaries to drastically reduce execution time and compute costs.

- **High-Throughput Execution: **Runs UI and native API test suites in parallel, minimizing the feedback loop for developers.

- **Automated Triage Artifacts: **Upon any failure, automatically generates and uploads interactive Playwright HTML trace reports as pipeline artifacts, allowing engineers to instantly replay the exact point of failure.

---

## 📋 Prerequisites
Before running this project locally, ensure you have the following installed:
- [Node.js (v24+ empfohlen)](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/) (running and active)
- [Kind (Kubernetes in Docker)](https://kind.sigs.k8s.io/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)

---

## 💻 Local Setup & Execution

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/siddharth-builds/CymbalShop-E2E-TestSuite.git](https://github.com/siddharth-builds/CymbalShop-E2E-TestSuite.git)
   cd CymbalShop-E2E-TestSuite
