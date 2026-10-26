# Microservices E2E Automation Engine

Hi I'm Siddharth! I built this test automation framework to validate the Google Cloud Online Boutique (Cymbal Shop), a cloud-native microservices demo application. Testing a basic static website is easy, but I wanted to build a portfolio piece that proves I can handle real-world, distributed architectures. 

Instead of just checking if elements are visible on a screen, this framework interacts with backend-driven state changes, bypasses frontend validation to hit native APIs directly, and runs against a live, ephemeral Kubernetes cluster spun up entirely within a CI/CD pipeline.

## 🛠️ The Tech Stack
* **Framework:** Playwright & TypeScript
* **Runtime:** Node.js 24
* **Infrastructure:** Docker, Kubernetes (Kind), `kubectl`
* **CI/CD:** GitHub Actions
* **Configuration:** `dotenv` for environment parity 

## 🏗️ Architecture & Design Patterns

I prioritized clean, maintainable code structures over quick-and-dirty scripts. If the UI or the backend routes change, the framework only requires updates in one centralized location.

* **Page Object Model (POM):** I abstracted all UI locators and user interactions into dedicated `HomePage`, `ProductPage`, and `CartPage` classes. This keeps the actual test specs highly readable and purely focused on assertions.
* **API Object Model:** I implemented a service client pattern (`ProductsApiClient`) to wrap Playwright's `APIRequestContext`. This isolates HTTP routing and headers from the test logic, allowing the test suites to cleanly execute native HTTP requests against the internal microservices without touching the browser.

## 🧪 Core Test Coverage

The test suites are designed to validate actual business logic and edge cases, not just happy paths:

* **End-to-End Checkout Flow:** Automates the complete buying journey. This includes handling complex forms (`<select>` dropdowns for dates) and feeding Luhn-valid credit card numbers (e.g., standard test visas) to ensure the backend `paymentservice` successfully processes the order instead of throwing 500 errors.
* **Stateful Cart Manipulation:** Data-driven parameterized tests dynamically inject different products into the cart. The suite validates quantity updates, shipping calculations, and verifies that the `cartservice` correctly purges session state when a user empties their cart.
* **Currency Conversion Validation:** Tests the `currencyservice` integration by manipulating the global navigation preferences and asserting that UI pricing symbols dynamically update (e.g., USD to EUR to JPY) without dropping the current user session.
* **Native API Integration:** Directly hits the internal Kubernetes endpoints (`localhost:8080`) to validate JSON/HTML responses and status codes (200, 201, 302 redirects), proving the routing works independently of the frontend UI.

## 🚀 CI/CD & Cloud Execution

The framework is fully integrated with GitHub Actions to ensure nothing merges if it breaks the build. The pipeline is designed for speed and reliability:
1. Provisions an ephemeral local Kubernetes cluster using `kind` (Kubernetes in Docker).
2. Deploys the multi-container Cymbal Shop application.
3. Implements polling to wait for cluster readiness.
4. Leverages heavy caching for npm dependencies and Playwright browser binaries to cut down execution time.
5. Executes the parallelized UI and API test suites.
6. Automatically uploads Playwright HTML trace reports as pipeline artifacts to make debugging failed runs painless.

## 💻 Local Setup

If you want to pull this down and run it on your own machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/siddharth-builds/boutique-qa-engine.git
   cd boutique-qa-engine
