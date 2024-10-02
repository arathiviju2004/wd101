const dob1=document.getElementById("dob");
dob1.addEventListener('change',()=>validate1(dob1));
function validate1(element){
    const dobValue = new Date(element.value);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - dobValue.getFullYear();
    const monthDiff = currentDate.getMonth() - dobValue.getMonth();
    const dayDiff = currentDate.getDate() - dobValue.getDate();
   
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

    // Validate age between 18 and 55
    if (age < 18 || age > 55) {
            element.setCustomValidity("Age should be between 18 and 55.");
            element.reportValidity();
    } else {
            element.setCustomValidity("");
        }    
}

let userForm=document.getElementById("rform");

const retrieveEntires=()=>{
    let entries=localStorage.getItem("r-entries");
    if(entries){
        entries=JSON.parse(entries);
    }else{
        entries=[];
    }
    return entries;
}
let userEntries=retrieveEntires();
const displayEntries=()=>{
    const entries=retrieveEntires();

    const tableEntries=entries.map((entry)=>{
        const namec=`<td class="border px-4 py-2">${entry.name}</td>`
        const emailc=`<td class="border px-4 py-2">${entry.email}</td>`
        const passc=`<td class="border px-4 py-2">${entry.password}</td>`
        const dobc=`<td class="border px-4 py-2">${entry.dob}</td>`
        const acceptc=`<td class="border px-4 py-2">${entry.accept}</td>` 

        const row=`<tr>${namec} ${emailc} ${passc} ${dobc} ${acceptc} </tr>`;
        return row;
    }).join("\n");

    const table=`<table class="table-auto w-full"><tr>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Password</th>
        <th class="px-4 py-2">Dob</th>
        <th class="px-4 py-2">Accepted terms</th>

    </tr>${tableEntries}</table>`;
    let details=document.getElementById("r-entries");
    details.innerHTML=table
}
const saveUserForm=(event)=>{
    event.preventDefault();
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const dob=document.getElementById("dob").value;
    const accept=document.getElementById("accept").checked;

    const entry={
        name,email,password,dob,accept
    };
    userEntries.push(entry);
    localStorage.setItem("r-entries",JSON.stringify(userEntries));
    displayEntries();
}
userForm.addEventListener("submit",saveUserForm);
displayEntries();
