# LU Decomposition Calculator

A web-based calculator that performs LU decomposition on matrices and solves systems of linear equations using the LU decomposition method.

## Overview

This application allows users to:
1. Input a square matrix of any size (2x2 to 10x10)
2. Input a vector for solving linear equations
3. Perform LU decomposition
4. Solve the system of linear equations
5. View the results in a clean, formatted display

## How It Works

### Mathematical Background

LU decomposition splits a matrix A into two matrices:
- L (Lower triangular matrix)
- U (Upper triangular matrix)

Such that: A = L × U

The system Ax = b is solved by:
1. First solving Ly = b
2. Then solving Ux = y

### Technical Implementation

The project consists of three main files:

1. **lu.js**: Contains the core logic for:
   - LU decomposition algorithm
   - System solution
   - Matrix manipulation
   - Dynamic HTML generation

2. **index.html**: Provides the user interface with:
   - Matrix size input
   - Dynamic matrix input fields
   - Vector input fields
   - Results display area

3. **style.css**: Handles the styling with:
   - Responsive design
   - Matrix display formatting
   - Animations for better UX
   - Mobile-friendly layout

## Usage

1. Open the `index.html` in a web browser
2. Enter the desired matrix size (n×n)
3. Click "Generate Matrix Inputs"
4. Fill in the matrix A values
5. Fill in the vector b values
6. Click "Decompose and Solve"
7. View the results showing:
   - Original matrix A
   - Lower triangular matrix L
   - Upper triangular matrix U
   - Solution vector X

## Requirements

- Modern web browser with JavaScript enabled
- <b>optional</b>: Web server (e.g., XAMPP)

## Installation

1. Clone the repository to your web server directory `git clone https://github.com/tchadeadt/lu-decomposition.git`
2. If using XAMPP, place in the `htdocs` folder, if not, just click on `index.html`
3. Access through your localhost URL in case of a web server. (e.g,. `localhost/lu-decomposition`)

## Limitations

- Matrix size is limited to 10×10 for practical purposes
- Requires non-zero diagonal elements
- May have numerical instability with ill-conditioned matrices

## Todos:
- Add more styling
- Require user to enter the values correctly (!null) in order to do calculation