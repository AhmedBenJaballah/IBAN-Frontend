# IBAN Validation React App

This project is a React-based application for validating IBAN (International Bank Account Number) using two different validation methods: a default validation service and the OpenIBAN API.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)


---

## Introduction

This React app allows users to input an IBAN number and validate it using either a custom backend validation service or the OpenIBAN API. The app displays the bank name, country, and validation status, and allows switching between the two validation methods. It features loading states and error handling to ensure a smooth user experience.

---

## Installation

### Prerequisites

- Node.js (v14 or higher)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/AhmedBenJaballah/IBAN-Frontend.git
    ```

2. Navigate to the project directory:
    ```bash
    cd IBAN-Frontend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Run the application:
    ```bash
    npm run dev
    ```

The app should now be running on [http://localhost:5173](http://localhost:5173).

---

## Usage

### IBAN Validation

- **Input Field**: Enter an IBAN number in the input field and press the "Verify" button.
- **Validation Method**: Choose between the default validation method or the OpenIBAN API by selecting the appropriate radio button.
- **Result**: After verification, the app will display the validation status along with the country and bank name (if valid).

---

## Components

### `useIban` (Custom Hook)

- This hook is responsible for handling IBAN validation.
- It manages state for the IBAN input, validation status, and response messages.
- The hook provides functions to validate IBANs either via a custom backend (`ibanService`) or the OpenIBAN API.

### `IbanSection`

- This component renders the user interface for entering and verifying an IBAN.
- It allows the user to input an IBAN and choose a validation method.
- It displays the bank name, country, and validation status based on the response.

---


