function player(){
    console.log("Clear function called"); 
    arr.length=0;
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const str = `r${row}c${col}`;
            const val = document.querySelector(`.${str}`);
            val.value = '';
            console.log(`Cleared: ${str}`);
        }
    }
}
// function clear(){
//     console.log("Clear function called"); 
//     arr.length=0;
//     for (let row = 0; row < 9; row++) {
//         for (let col = 0; col < 9; col++) {
//             const str = `r${row}c${col}`;
//             const val = document.querySelector(`.${str}`);
//             val.value = '';
//             console.log(`Cleared: ${str}`);
//         }
//     }
// }

function isNotDigit(input) {
    return /\D/.test(input);
}

function errmsgg(msg) {
    const errmsg = document.getElementById('errmsg');
        errmsg.innerText = msg;
        arr.length=0;
}

function createSudokuGrid() {
    const sudokuGrid = document.getElementById('sudoku-grid');

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const input = document.createElement('input');
            input.classList.add('sudoku-input', `r${row}c${col}`); 
            input.type = 'text';
            input.id = `div${row * 9 + col + 1}`;
            input.name = `r${row}c${col}`;
            input.maxLength = 1;
            sudokuGrid.appendChild(input);
        }
    }
}
const arr = [];
function dosomething(){
    const errmsg = document.getElementById('errmsg');
    errmsg.innerText = "";

    // Clear the array
    arr.length = 0;

    let c = 0;
    for (let row = 0; row < 9; row++) {
        const rowa = [];
        for (let col = 0; col < 9; col++) {
            const str = `r${row}c${col}`;
            const val = document.querySelector(`.${str}`);
            if (val.value != "") {
                console.log("welcome");
                if(isNotDigit(val.value))
                {
                    errmsgg("Are you For Real");
                    return;
                }
                rowa.push(val.value);
                c = c + 1;
            } else {
                rowa.push('.');
            }
        }
        arr.push(rowa);
    }
    if (c == 0) {
        errmsgg("Input Atleast One Value");
  
    } else {
        if (solve(arr)) {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    const str = `r${row}c${col}`;
                    const val = document.querySelector(`.${str}`);
                    val.value = arr[row][col].toString();
                }
            }
         
            errmsg.innerText = "";
        } else {
            console.log(arr);
            const errmsg = document.getElementById('errmsg');
            errmsg.innerText = "Not Solvable";
        }
    }
}

function solve(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === '.') {
                for (let k = 1; k <= 9; k++) {
                    if (isvalid(arr, i, j, k)) {
                        arr[i][j] = k.toString();
                        const str = `r${i}c${j}`;
                        const val = document.querySelector(`.${str}`);
                        if (solve(arr)) return true;
                        arr[i][j] = '.';
                    }
                }
                return false;
            }
            else{
                let temp=arr[i][j];
                arr[i][j]='.';
                if(isvalid(arr, i, j, temp))
                {
                  arr[i][j]=temp;
                }
                else return false;
            }
        }
    }
    return true;
}

function isvalid(arr, i, j, k) {
    for (let l = 0; l < arr[i].length; l++) {
        if (arr[i][l] == k) return false;
    }

    for (let l = 0; l < arr.length; l++) {
        if (arr[l][j] == k) return false;
    }

    let startr = Math.floor(i / 3) * 3;
    let startc = Math.floor(j / 3) * 3;
      for (let r = startr; r < startr + 3; r++) {
         for (let c = startc; c < startc + 3; c++) {
            if (arr[r][c] == k) return false;
        }
    }
    return true;
}


