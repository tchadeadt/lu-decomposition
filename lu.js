class LUDecomposition {
    static decompose(A) {
        const n = A.length;
        const L = Array.from({ length: n }, (_, i) => 
            Array(n).fill(0).map((_, j) => i === j ? 1 : 0)
        );
        const U = Array.from({ length: n }, () => Array(n).fill(0));

        for (let j = 0; j < n; j++) {
            U[0][j] = A[0][j];
        }

        for (let i = 1; i < n; i++) {
            L[i][0] = A[i][0] / U[0][0];
        }

        for (let i = 1; i < n; i++) {
            for (let j = i; j < n; j++) {
                let sum = 0;
                for (let k = 0; k < i; k++) {
                    sum += L[i][k] * U[k][j];
                }
                U[i][j] = A[i][j] - sum;
            }

            for (let j = i; j < n; j++) {
                let sum = 0;
                for (let k = 0; k < i; k++) {
                    sum += L[j][k] * U[k][i];
                }
                L[j][i] = (A[j][i] - sum) / U[i][i];
            }
        }

        return { L, U };
    }

    static solve(A, B) {
        const { L, U } = this.decompose(A);
        const n = A.length;

        const Y = new Array(n);
        Y[0] = B[0];
        for (let i = 1; i < n; i++) {
            let sum = 0;
            for (let j = 0; j < i; j++) {
                sum += L[i][j] * Y[j];
            }
            Y[i] = B[i] - sum;
        }

        const X = new Array(n);
        X[n-1] = Y[n-1] / U[n-1][n-1];
        for (let i = n - 2; i >= 0; i--) {
            let sum = 0;
            for (let j = i + 1; j < n; j++) {
                sum += U[i][j] * X[j];
            }
            X[i] = (Y[i] - sum) / U[i][i];
        }

        return X;
    }

    static printMatrix(matrix) {
        return matrix.map(row => 
            row.map(val => val.toFixed(2).padStart(6)).join(' ')
        ).join('\n');
    }

    static generateMatrixHTML(matrix) {
        return `<table class="matrix">${matrix.map(row => 
            `<tr>${row.map(val => `<td>${val.toFixed(2)}</td>`).join('')}</tr>`
        ).join('')}</table>`;
    }

    static generateVectorHTML(vector) {
        return `<table class="vector">${vector.map(val => 
            `<tr><td>${val.toFixed(2)}</td></tr>`
        ).join('')}</table>`;
    }
}

function generateMatrixInputs() {
    const size = parseInt(document.getElementById('matrixSize').value);
    const matrixInputs = document.getElementById('matrixInputs');
    const vectorInputs = document.getElementById('vectorInputs');
    
    matrixInputs.innerHTML = '';
    vectorInputs.innerHTML = '';

    for (let i = 0; i < size; i++) {
        const rowDiv = document.createElement('div');
        for (let j = 0; j < size; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `matrix-${i}-${j}`;
            input.style.width = '50px';
            rowDiv.appendChild(input);
        }
        matrixInputs.appendChild(rowDiv);
    }

    for (let i = 0; i < size; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.id = `vector-${i}`;
        input.style.width = '50px';
        vectorInputs.appendChild(input);
    }
    
    // Show hidden elements
    document.getElementById('txtInput').classList.remove('hidden');
    document.getElementById('txtInput').classList.add('visible');

    document.getElementById('vectorInputs').classList.remove('hidden');
    document.getElementById('vectorInputs').classList.add('visible');
    document.getElementById('solveButton').classList.remove('hidden');
    document.getElementById('solveButton').classList.add('visible');
    document.getElementById('outputSection').classList.remove('hidden');
    document.getElementById('outputSection').classList.add('visible');
}

function performLUDecomposition() {
    const size = parseInt(document.getElementById('matrixSize').value);
    const matrixA = [];
    const vectorB = [];

    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(parseFloat(document.getElementById(`matrix-${i}-${j}`).value));
        }
        matrixA.push(row);
    }

    for (let i = 0; i < size; i++) {
        vectorB.push(parseFloat(document.getElementById(`vector-${i}`).value));
    }

    const { L, U } = LUDecomposition.decompose(matrixA);
    const X = LUDecomposition.solve(matrixA, vectorB);

    const output = `
<div>
    <h3>Matrix A:</h3>
    ${LUDecomposition.generateMatrixHTML(matrixA)}
</div>
<div>
    <h3>L matrix:</h3>
    ${LUDecomposition.generateMatrixHTML(L)}
</div>
<div>
    <h3>U matrix:</h3>
    ${LUDecomposition.generateMatrixHTML(U)}
</div>
<div>
    <h3>Solution X:</h3>
    ${LUDecomposition.generateVectorHTML(X)}
</div>
    `;

    document.getElementById('output').innerHTML = output;
}