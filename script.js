

const header = document.querySelector(".header");

let column = 27;

for (let i = 0; i < 27; i++) {
  const cell = document.createElement("div");
  
  // Use String.fromCharCode instead of string.formCharCode
  if(i==0){cell.style.minWidth = "50px"}
  cell.innerText = i !== 0 ? String.fromCharCode(64 + i) : "";

  cell.className = "cell";
  header.appendChild(cell);
}

const snoContainer = document.querySelector(".sno-container");
const rowContainer = document.querySelector(".rows-container");

function createRow(rowNumber){
    const row = document.createElement("div");

    for(let i = 0;i<column;i++){
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.setAttribute("contenteditable", "true");
        row.appendChild(cell);
    }
    return row;
}


let rows = 50;
for(let i = 1;i<=rows;i++){
    const snoCell = document.createElement("div");
    snoCell.innerText = i;
    snoCell.className = "sno";
    snoContainer.appendChild(snoCell);

    let rowElement = createRow(i);
    rowContainer.appendChild(rowElement);
}