

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