

const selectedCellElement = document.querySelector(".selected-cell");
const form = document.querySelector("form");
let selectedCell = null;
let state = {};

const defaultStyle = {
        fontFamily: "monospace",
        fontSize: 14,
        underline: false,
        bold: false,
        italic: false,
        align: "left",
        color: "#000000",
        bgColor: "#ffffff"
       
    };

form.addEventListener("change",(e)=>{
       const seletedValue = {
           fontFamily : form['font-family'].value,
           fontSize : Number(form['font-size'].value),
           bold : form.bold.checked,
           italic : form.italic.checked,
           underline : form.underline.checked,
           align : form.align.value,
           textcolor : form.textColor.value,
           bgColor : form.bgColor.value
       }

       console.log(seletedValue);

       //apply the style to the selected cell

       const selectedCellElement = document.getElementById(selectedCell);

       selectedCellElement.style.fontFamily = seletedValue.fontFamily;
       selectedCellElement.style.fontSize = `${seletedValue.fontSize}px`;

       selectedCellElement.style.textAlign = seletedValue.align;
       selectedCellElement.style.fontWeight = seletedValue.bold ? "bold" : "lighter";
       selectedCellElement.style.fontStyle = seletedValue.italic ? "italic" : "normal";
       selectedCellElement.style.textDecoration = seletedValue.underline ? "underline" : "normal";
       selectedCellElement.style.color = seletedValue.textcolor;
       selectedCellElement.style.backgroundColor = seletedValue.bgColor;

       state[selectedCell] = seletedValue;
});

function onCellFocus(event){
     selectedCell = event.target.id;
     selectedCellElement.innerText = selectedCell;

     if(!state[selectedCell]){
        //when we select first time this cell
        state[selectedCell] = defaultStyle;
     }

     applyCurrentCellStylesToForm();
}

function applyCurrentCellStylesToForm(){
    // apply style by the form
    form.bold.checked = state[selectedCell].bold;
    form.italic.checked = state[selectedCell].italic;
    form.underline.checked = state[selectedCell].underline;
    form.align.value = state[selectedCell].align;
    form['font-size'].value = state[selectedCell].fontSize;
    form['font-family'].value = state[selectedCell].fontFamily;
    form.textColor.value = state[selectedCell].textColor;
    form.bgColor.value = state[selectedCell].bgColor;

    // for(let key in state[selectedCell]){
    //     form[key].type === "checkbox" ?
    //     (form[key].checked = state[selectedCell][key]) :
    //     (form[key].value = state[selectedCell][key])
    // }
}


function clearCell(cellid){
    let cell = document.getElementById(cellid);
    if (cell) {
        cell.innerText = "";
        cell.removeAttribute("style");
        cell.classList.remove("active-cell");
    } else {
        console.error(`Element with ID ${cellid} not found.`);
    }
}

//sheet addition 

let totalSheet = 1;
let activeSheetName = "sheet1";
const footForm = document.querySelector(".foot-form");

function createNewSheet(){
    totalSheet++;
    let newSheetName = `sheet${totalSheet}`;
    const inputContainer = document.createElement("div");
    inputContainer.innerHTML = `
    <input type="radio" name="sheet" id=${newSheetName}>
    <label for=${newSheetName}>${newSheetName}</label>
    `
    footForm.appendChild(inputContainer);
   // console.log(inputContainer);
}


 let footButton = document.querySelector(".foot-form>button");
 footButton.addEventListener("click",(e) =>{
     createNewSheet();
    // console.log(e.target);
 })


//listen to onchange foot-form event

footForm.addEventListener("change", (event) => {
    const checkedSheet = footForm.querySelector('input[name="sheet"]:checked');

    if (checkedSheet) {
        // let activeSheetText = checkedSheet.nextElementSibling.innerText;
        let newSheetName = checkedSheet.id;

        const seletedValue = {
            fontFamily: form['font-family'].value,
            fontSize: Number(form['font-size'].value),
            bold: form.bold.checked,
            italic: form.italic.checked,
            underline: form.underline.checked,
            align: form.align.value,
            textcolor: form.textColor.value,
            bgColor: form.bgColor.value
        };
        
        for(let cellid in state){
        
            // Get the element by ID
            const selectedCellElement = document.getElementById(cellid);

            // Update state with innerText or textContent 
            state[cellid] = {
                ...seletedValue,
                innerText: selectedCellElement.innerText || selectedCellElement.textContent
            
        } 
    }
        
        console.log(newSheetName, activeSheetName, state);

        localStorage.setItem(activeSheetName, JSON.stringify(state));
        console.log(state);

        // Clear all affected cells and apply styles from localStorage
        for (let cellid in state) {
            clearCell(cellid);
        }

        let existingData = localStorage.getItem(newSheetName);

        if (existingData) {
            state = JSON.parse(existingData);
            // Apply styles to all individual cells present in the existing data
            for (let cellid in state) {
                const cellElement = document.getElementById(cellid);
                applyStyleToElement(cellElement, state[cellid]);
            }
        }

        // Update the active sheet name to the selected one
        activeSheetName = newSheetName;
    }
});






function applyStyleToElement(element , styles){
   // element.style.fontFamily = styles.fontFamily;

       element.style.fontFamily = styles.fontFamily;
       element.style.fontSize = `${styles.fontSize}px`;

       element.style.textAlign = styles.align;
       element.style.fontWeight = styles.bold ? "bold" : "lighter";
       element.style.fontStyle = styles.italic ? "italic" : "normal";
       element.style.textDecoration = styles.underline ? "underline" : "normal";
       element.style.color = styles.textColor;
       element.style.backgroundColor = styles.bgColor;
      
      
      element.innerText = styles.innerText || '';
   
   
}

const fx = document.getElementById("fx");

fx.addEventListener("keyup", (e) => {
    if ("Enter" === e.code) {
        let expression = fx.value;
        let result = eval(expression);

        document.getElementById(selectedCell).innerText = result;
        fx.value = "";
    }
});
