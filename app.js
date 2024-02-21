let amount = document.getElementById("amount");
let catagery  =document.getElementById("category");
let date = document.getElementById("date");
let btn = document.querySelector(".btn");
let tBody = document.getElementById("tBody");

let catInp = document.getElementById("cat-inp");
let catBtn = document.getElementById("catBtn");

let totalAmt = document.getElementById("totalAmountMsg");
let totalRem = document.getElementById("totalRemainMsg");
let totalExp = document.getElementById("totalExpenseMsg");

let budgetInp = document.getElementById("budget-inp");
let budgetSub = document.getElementById("budget-btn");

let catOption = document.getElementById("tableCategoryDropdown");
let getDate = document.getElementById("checkDate");


let totalRemaining = 0;
let totalExpens = 0;
let storeTotalBudget = 0;

totalAmt.innerHTML = `Total Amount:`;
totalRem.innerHTML = `Total Remaining`;
totalExp.innerHTML = `Total Expense`;


catBtn.addEventListener("click", () => {
    let optionValue = catInp.value.trim();
    if (optionValue) {
        let option = `<option>${optionValue}</option>`;
        catagery.insertAdjacentHTML('beforeend', option); // Append option to the form's category dropdown
        
        // Append option to the table header's category dropdown
        let newOption = document.createElement('option');
        newOption.value = optionValue;
        newOption.textContent = optionValue;
        catOption.appendChild(newOption);
        catInp.value = ""; // Clear the input field after adding the category
    }
});


budgetSub.addEventListener("click" , () =>{
    totalAmt.innerHTML = `Total Amount: ${budgetInp.value}`;
    totalRem.innerHTML = `Total Remaining: ${budgetInp.value}`;
    totalRemaining = budgetInp.value;
    storeTotalBudget = budgetInp.value;
    budgetInp.value = "";
})

btn.addEventListener("click" , (e) =>{
    e.preventDefault();
    if(storeTotalBudget<=0){
        alert("Please enter Budget first...");
        amount.value = "";
        catagery.value = "";
        date.value ="";  
    }else{
        let allValue = `<tr>
        <td class="organisationnumber">${amount.value}</td>
        <td class="organisationname" id="catVal">${catagery.value}</td>
        <td class="organisationname" id="dateVal">${date.value}</td>
        <td class="actions">
            <a href="?" class="edit-item"  title="Edit">Edit</a>
            <a href="?" class="remove-item" title="Remove">Remove</a>
        </td>
        </tr> `;


        totalExpens += Number(amount.value);
        totalRemaining = totalRemaining- amount.value;
        
        amount.value = "";
        catagery.value = "";
        date.value ="";   
        
        if(totalExpens > storeTotalBudget){
            alert("Opps! out of budget");
        }else{  
            totalExp.innerHTML = `Total Expense ${totalExpens}`;
            totalRem.innerHTML = `Total Remaining: ${totalRemaining}`;

            tBody.innerHTML += allValue;
        }
    }


})


//Filter data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>...
function filterDate(){
    let val = catOption.value.toLowerCase();
    let datVal = getDate.value;
    let rows = tBody.querySelectorAll("tr");
    let total = 0;
    rows.forEach(item =>{
        let amtVal = Number(item.querySelector(".organisationnumber").textContent);

        let catVal = item.querySelector(".organisationname").textContent;
        let dateVal = item.querySelector("#dateVal").textContent;
        if((val =="category" || val == catVal) && (!datVal||datVal == dateVal)){

            item.style.display = "table-row";
            total += amtVal;

        }else{
            item.style.display = "none";
        }
    })

    let tFoot = document.getElementById("tFoot");
    let tFoodTr = document.createElement("tr");
    let tFootTd = document.createElement("td");
    tFootTd.colSpan = "4";
    tFootTd.innerHTML = `Total is: ${total}`;
    tFoot.innerHTML = "";
    tFoot.appendChild(tFoodTr).appendChild(tFootTd);



}

catOption.addEventListener("change" , filterDate);
getDate.addEventListener("change" , filterDate);

//Remove the item from table>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let removeClass = document.getElementsByClassName("remove-item");
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-item")) {
        event.preventDefault();

        // Traverse up the DOM to find the parent <tr> element
        let row = event.target.closest("tr");
        
        // Extract the amount value of the row to update the totalRemaining and totalExpens
        let amountToRemove = Number(row.querySelector(".organisationnumber").innerText);

        // Update totalRemaining and totalExpens
        totalRemaining += amountToRemove;
        totalRem.innerHTML = `Total Remaining: ${totalRemaining}`;
        
        totalExpens -= amountToRemove;
        totalExp.innerHTML = `Total Expense: ${totalExpens}`;

        row.remove();
    }
});


let updBtn = document.getElementById("updateBtn");
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-item")) {
        event.preventDefault();

        updBtn.style.display = "block";
        btn.style.display ="none";

        let row = event.target.closest("tr");  

        let tbAmtVal = row.querySelector(".organisationnumber");
        let tbCatVal = row.querySelector("#catVal");
        let tbDatVal = row.querySelector("#dateVal");
    
        amount.value =tbAmtVal.textContent ;
        catagery.value = tbCatVal.textContent;
        date.value = tbDatVal.textContent; 

        updBtn.addEventListener("click" , function updateRow(e){
            e.preventDefault();
            tbAmtVal.textContent = amount.value;
            tbCatVal.textContent = catagery.value;
            tbDatVal.textContent = date.value;


            amount.value = "";
            catagery.value = "";
            date.value =""; 

            updBtn.style.display = "none";
            btn.style.display ="block";
            
            // Remove the event listener to prevent multiple listeners
              updBtn.removeEventListener("click", updateRow);

        })

    }
});

