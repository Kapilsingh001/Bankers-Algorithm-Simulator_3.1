let totalResources = 0;
let totalProcesses = 0;

function readInputs() {
    let processes = document.getElementById("numProcess").value;
    let resources = document.getElementById("numResource").value;

    totalProcesses = Number(processes);
    totalResources = Number(resources);

    console.log("Processes:", totalProcesses);
    console.log("Resources:", totalResources);
}
// 1---> resources table 
function createResourceTable() {
    console.log("creating resource table ...");
    // readInputs();

    // div in which i will create tables
    let tableDiv = document.getElementById("allTables");

      let heading = document.createElement("h3");
    heading.innerText = "Total Resource Table";
    tableDiv.appendChild(heading);

    // erase old tables if button clicked again
    // tableDiv.innerHTML = "";

    // create table
    let table = document.createElement("table");
    table.border = "1";

    // create rows equal to number of resources
    for (let i = 0; i < totalResources; i++) {

        // create row
        let row = document.createElement("tr");

        // first cell (Resource name)
        let cell1 = document.createElement("td");
        cell1.innerText = "Resource R" + (i+1);

        // second cell (input box)
        let cell2 = document.createElement("td");
        let input = document.createElement("input");
        input.type = "text";
        input.id=`res_${i}`;

        cell2.appendChild(input);

        row.appendChild(cell1);
        row.appendChild(cell2);

        table.appendChild(row);
    }

    // add table to div
    tableDiv.appendChild(table);
}


// 2-->allocation table 

function createAllocationTable() {
    console.log("creating allocation table...");

    // read input values first
    // readInputs();

    // get div where tables are shown
    let tableDiv = document.getElementById("allTables");
    // tableDiv.innerHTML = "";
      let heading = document.createElement("h3");
    heading.innerText = "Allocation Table";
    tableDiv.appendChild(heading);

    // create table
    let table = document.createElement("table");
    table.border = "1";

    /*
    |      |  A  |  B  |  C  |

    */


    // header row
    let headerRow=document.createElement("tr");
    // header in row
    let emptyCell=document.createElement("th");
    emptyCell.innerText="Resource / processes";
    headerRow.appendChild(emptyCell);

    // create resource header
    for(let i=0;i<totalResources;i++){
        let th=document.createElement("th");
        th.innerText="R"+(i+1);
        headerRow.appendChild(th);
    }

    table.appendChild(headerRow);

    // creating process row;
    for(let i=0;i<totalProcesses;i++){
        let row=document.createElement("tr");

        // 1st cell-->process name(data cell);
        let processCell=document.createElement("td");
        processCell.innerText="Process "+(i+1);
        
        row.appendChild(processCell);
        // inner loop for resource columns;

        for(let j=0;j<totalResources;j++){
            let cell=document.createElement("td");
            let input=document.createElement("input");
            input.type="text";
            input.id = `alloc_${i}_${j}`;
            // --->alloc_0_0 → Allocation of Process 1, Resource A

            cell.appendChild(input);
            row.appendChild(cell);
        }

        table.appendChild(row);


    }


    tableDiv.appendChild(table);

    //*************************MAX****************************/

    
}
function createMaximumTable() {
    console.log("creating maximum table...");

    // read input values
    // readInputs();

    // get div where tables are shown
    let tableDiv = document.getElementById("allTables");
      let heading = document.createElement("h3");
    heading.innerText = "Maximum Table";
    tableDiv.appendChild(heading);

    // DO NOT clear the div this time
    // we want allocation + maximum together

    // create table
    let table = document.createElement("table");
    table.border = "1";

    // ---------- HEADER ROW ----------
    let headerRow = document.createElement("tr");

    let emptyCell = document.createElement("th");
    emptyCell.innerText="Resource / processes";
    headerRow.appendChild(emptyCell);

    for (let i = 0; i < totalResources; i++) {
        let th = document.createElement("th");
        th.innerText = "R"+(i+1);
        headerRow.appendChild(th);
    }

    table.appendChild(headerRow);

    // ---------- PROCESS ROWS ----------
    for (let i = 0; i < totalProcesses; i++) {
        let row = document.createElement("tr");

        let processCell = document.createElement("td");
        processCell.innerText = "Process " + (i + 1);
        row.appendChild(processCell);

        for (let j = 0; j < totalResources; j++) {
            let cell = document.createElement("td");
            let input = document.createElement("input");
            input.type = "text";
            input.id=`max_${i}_${j}`;

            cell.appendChild(input);
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    tableDiv.appendChild(table);
}
function createAllInitialTables() {
    readInputs();

    if (totalProcesses <= 0 || totalResources <= 0) {
        alert("Please enter valid process and resource numbers");
        return;
    }

    let tableDiv = document.getElementById("allTables");
    tableDiv.innerHTML = ""; // clear once

    createResourceTable();
    createAllocationTable();
    createMaximumTable();

    //magic

    document.getElementById("findNeed").disabled = false;
    document.getElementById("findAvailable").disabled = false;


    


}



///VERY IMPORTANT Note:-
// We must identify Allocation & Maximum inputs

// Right now, your inputs have no IDs, so JS cannot read values.

// We will fix that cleanly.
// for--->  Need = Maximum − Allocation


// 4--->Nedd table  
function createNeedTable(){
    let tableDiv=document.getElementById("allTables");
    //  Heading
    let heading=document.createElement("h3");
    heading.innerText="Need Table";
    tableDiv.appendChild(heading);

    // table
    let table=document.createElement("table");
    table.border="1";

    // header row;
    let headerRow=document.createElement("tr");

    let emptyCell=document.createElement("th");
    emptyCell.innerText="Resource / processes";
    headerRow.appendChild(emptyCell);
    
    for(let j=0;j<totalResources;j++){
        let th=document.createElement("th");
        th.innerText="R"+(j+1);
        headerRow.appendChild(th);
    }

    table.appendChild(headerRow);

    // process row
    for(let i=0;i<totalProcesses;i++){
        let row=document.createElement("tr");
        
        // process name

        let processCell=document.createElement("td");
        processCell.innerText="Process "+(i+1);
        row.appendChild(processCell);

        // Resource column
        for(let j=0;j<totalResources;j++){
            let cell=document.createElement("td");

            // read value
            let allocvalue=document.getElementById(`alloc_${i}_${j}`).value;
            let maxvalue=document.getElementById(`max_${i}_${j}`).value;

            // covert in int
            let alloc=Number(allocvalue);
            let max=Number(maxvalue);

            let need=max-alloc;
            if (need < 0) {
    alert("❌ Maximum must be ≥ Allocation");
    return;
}

            cell.innerText=need;
            cell.id = `need_${i}_${j}`;
            row.appendChild(cell);


        }
        table.appendChild(row);


    }
    tableDiv.appendChild(table);

}
//---->available resource table
function createAvailableTable() {
    let tableDiv = document.getElementById("allTables");

    // ----- heading -----
    let heading = document.createElement("h3");
    heading.innerText = "Available Table";
    tableDiv.appendChild(heading);

    // ----- table -----
    let table = document.createElement("table");
    table.border = "1";

    // create rows for each resource
    for (let j = 0; j < totalResources; j++) {

        let row = document.createElement("tr");

        // resource name
        let resourceCell = document.createElement("td");
        resourceCell.innerText = "Resource R" + (j + 1);

        // read total resource
        let totalRes = Number(document.getElementById(`res_${j}`).value);

        // ✅ validate total resource
        if (isNaN(totalRes) || totalRes < 0) {
            alert(`❌ Enter valid total units for Resource R${j + 1}`);
            return;
        }

        // sum allocation
        let allocated = 0;
        for (let i = 0; i < totalProcesses; i++) {
            let alloc = Number(document.getElementById(`alloc_${i}_${j}`).value);
            allocated += alloc;
        }

        // calculate available
        let av = totalRes - allocated;

        // ✅ prevent negative available
        if (av < 0) {
            alert(
                `❌ INVALID SYSTEM STATE\n\n` +
                `Resource R${j + 1} allocated more than available.\n` +
                `Total = ${totalRes}, Allocated = ${allocated}`
            );
            return;
        }

        // available cell
        let valueCell = document.createElement("td");
        valueCell.innerText = av;
        valueCell.id = `avail_${j}`;

        // append
        row.appendChild(resourceCell);
        row.appendChild(valueCell);
        table.appendChild(row);
    }

    tableDiv.appendChild(table);

    // enable safe sequence
    document.getElementById("safeSequence").disabled = false;
}

//-------------------------SAFE_SEQUENCE---------------------------------------//
function startSafeSequence(){
    let finished=new Array(totalProcesses).fill(false);

    let safeSequence=[];

    let available=[];

    for(let j=0;j<totalResources;j++){
        let availableValue = document.getElementById(`avail_${j}`).innerText;
            available[j] = Number(availableValue);
    }
    let count=0;
    while(count<totalProcesses){
        let foundProcess=false;
        for(let i=0;i<totalProcesses;i++){
            if(!finished[i]&& canProcessRun(i,available)){
                releaseResources(i,available);
                finished[i]=true;
                safeSequence.push(i);
                count++;
                foundProcess=true;
            }
        }
        if(!foundProcess){
            alert("System is in Unsafe State !");
            return;
        }
    }
    displaySafeSequence(safeSequence);

// phase 2 part 

//     // show resource request section ONLY after safe sequence
// document.getElementById("resourceRequestPart").style.display = "block";

// enable resource request button
document.getElementById("resourceRequest").disabled = false;

}



// ---------------------------CAN_PROCESS_RUN--------------------------------------//
function canProcessRun(processIndex, available, tempNeed = null) {
    for (let j = 0; j < totalResources; j++) {

        let needValue = tempNeed
            ? tempNeed[processIndex][j]
            : Number(document.getElementById(`need_${processIndex}_${j}`).innerText);

        if (needValue > available[j]) {
            return false;
        }
    }
    return true;
}

//-----------------------------RELEASE_RESOURCES-----------------------------------//
function releaseResources(processIndex,available){
    for(let j=0;j<totalResources;j++){
        let allocValue=Number(document.getElementById(`alloc_${processIndex}_${j}`).value);
        available[j]=available[j]+allocValue;
    }
}

//--------------------------DISPLAY_SAFE_SEQUENCE----------------------------------//


    // let old=document.getElementById("safeSequenceResult");
    // if (old) old.remove(); ///if(old===null)-->it completely remove----><div id="safeSequenceResult">


function displaySafeSequence(safeSequence) {
    let container = document.getElementById("safeSequenceContainer");
    container.innerHTML = ""; // clear old

    let heading = document.createElement("h3");
    heading.innerText = "Safe Sequence";

    let p = document.createElement("p");
    let result = "";

    for (let i = 0; i < safeSequence.length; i++) {
        result += "P" + (safeSequence[i] + 1);
        if (i !== safeSequence.length - 1) {
            result += " → ";
        }
    }

    p.innerText = result;

    container.appendChild(heading);
    container.appendChild(p);
}




//------------------------------------PHASE-2--------------------------------------//

//-------------------------------------RESOURCE_REQUEST-------------------------------------------//

function resourceRequest() {
    let part = document.getElementById("resourceRequestPart");
    part.style.display = "block";
    part.scrollIntoView({ behavior: "smooth" });

    let requestDiv = document.getElementById("makeResourceRequest");
    requestDiv.innerHTML =
        "<p><em>Enter process number and click Submit Request</em></p>";
}

function submitResourceRequest() {
    let requestDiv = document.getElementById("makeResourceRequest");
    requestDiv.innerHTML = "";

    let processIndex = Number(document.getElementById("requestProcess").value) - 1;

    if (isNaN(processIndex) || processIndex < 0 || processIndex >= totalProcesses) {
        alert("Enter a valid process number");
        return;
    }

    let heading = document.createElement("h3");
    heading.innerText = "Resource Request for Process P" + (processIndex + 1);
    requestDiv.appendChild(heading);

    for (let i = 0; i < totalResources; i++) {
        let label = document.createElement("label");
        label.innerText = "Resource " + "R"+(i+1) + ": ";

        let input = document.createElement("input");
        input.type = "text";
        input.id = `req_${i}`;
        input.value = 0;

        requestDiv.appendChild(label);
        requestDiv.appendChild(input);
        requestDiv.appendChild(document.createElement("br"));
    }

    let applyBtn = document.createElement("button");
    applyBtn.innerText = "Grant Request";
    applyBtn.style.marginTop = "20px";

    applyBtn.onclick = function () {
        processResourceRequest();
    };

    requestDiv.appendChild(applyBtn);
}


//----------------------------PHASE_2.1-----------------------------------------------------//
function processResourceRequest() {

    // 🔄 CLEAR OLD SIMULATION / MESSAGES (FIRST THING)
    let sim = document.getElementById("safeSequenceSimulation");
    if (sim) sim.remove();

    let unsafe = document.getElementById("unsafeMessage");
    if (unsafe) unsafe.remove();

    let processIndex =
        Number(document.getElementById("requestProcess").value) - 1;

    let request = [];
    for (let i = 0; i < totalResources; i++) {
        request[i] = Number(document.getElementById(`req_${i}`).value) || 0;
    }

    // 1️⃣ request ≤ need
    for (let j = 0; j < totalResources; j++) {
        let need = Number(
            document.getElementById(`need_${processIndex}_${j}`).innerText
        );

        if (request[j] > need) {
            restartRequestFlow();
            showRequestError(
                "❌ Request exceeds Need. Please enter a valid request."
            );
            resetRequestInputs();
            return;
        }
    }

    // 2️⃣ request ≤ available
    for (let j = 0; j < totalResources; j++) {
        let available = Number(
            document.getElementById(`avail_${j}`).innerText
        );

        if (request[j] > available) {
            restartRequestFlow();
            showRequestError(
                "❌ Resources not available. Please try a smaller request."
            );
            resetRequestInputs();
            return;
        }
    }

    // 3️⃣ SAFETY CHECK (simulation only)
    let safe = simulateAllocation(processIndex, request);

    if (!safe) {
        restartRequestFlow();
        showUnsafeMessage(
            "❌ Request cannot be granted (Unsafe state)."
        );
        return;
    }

    // show message only — actual sequence is after commit
showSafeSimulation(getSafeSequence());


    // 5️⃣ THEN show confirmation box
    showConfirmBox(processIndex, request);
}





// -------------------request<=Need-------------------------------------------//
// function checkRequest(processIndex, request) {
//     for (let j = 0; j < totalResources; j++) {
//         let need = Number(
//             document.getElementById(`need_${processIndex}_${j}`).innerText
//         );

//         if (request[j] > need) {
//             alert("❌ Request exceeds Need. Request denied.");
//             return;
//         }
//     }

//     checkAvailable(processIndex, request);
// }


//-----------------------------available>=request---------------------//
// function checkAvailable(processIndex, request) {
//     for (let j = 0; j < totalResources; j++) {
//         let available = Number(document.getElementById(`avail_${j}`).innerText);

//         if (request[j] > available) {
//             alert("❌ Resources not available. Request denied.");
//             return;
//         }
//     }

//     simulateAllocation(processIndex, request);
// }


// -----------------checking---------------------------------------------//
function simulateAllocation(processIndex, request) {

    // ---------- TEMP AVAILABLE ----------
    let available = [];
    for (let j = 0; j < totalResources; j++) {
        available[j] =
            Number(document.getElementById(`avail_${j}`).innerText) - request[j];
    }

    // ---------- TEMP NEED & ALLOCATION ----------
    let tempNeed = [];
    let tempAlloc = [];

    for (let i = 0; i < totalProcesses; i++) {
        tempNeed[i] = [];
        tempAlloc[i] = [];

        for (let j = 0; j < totalResources; j++) {
            let need = Number(
                document.getElementById(`need_${i}_${j}`).innerText
            );
            let alloc = Number(
                document.getElementById(`alloc_${i}_${j}`).value
            );

            if (i === processIndex) {
                need -= request[j];
                alloc += request[j];
            }

            tempNeed[i][j] = need;
            tempAlloc[i][j] = alloc;
        }
    }

    // ---------- BANKER SAFETY CHECK ----------
    let finished = new Array(totalProcesses).fill(false);
    let safeCount = 0;

    while (safeCount < totalProcesses) {
        let found = false;

        for (let i = 0; i < totalProcesses; i++) {
            if (!finished[i] && canProcessRun(i, available, tempNeed)) {

                for (let j = 0; j < totalResources; j++) {
                    available[j] += tempAlloc[i][j];
                }

                finished[i] = true;
                safeCount++;
                found = true;
            }
        }

        if (!found) {
            return false;
        }
    }

    return true;
}



     
    
   function commitAllocation(processIndex, request) {

    // 1️⃣ Update Allocation
    for (let j = 0; j < totalResources; j++) {
        let allocCell = document.getElementById(`alloc_${processIndex}_${j}`);
        allocCell.value = Number(allocCell.value) + request[j];
    }

    // 2️⃣ Update Need
    for (let j = 0; j < totalResources; j++) {
        let needCell = document.getElementById(`need_${processIndex}_${j}`);
        needCell.innerText = Number(needCell.innerText) - request[j];
    }

    // 3️⃣ Update Available
    for (let j = 0; j < totalResources; j++) {
        let availCell = document.getElementById(`avail_${j}`);
        availCell.innerText = Number(availCell.innerText) - request[j];
    }
     // 4️⃣ Disable "Make a Resource Request" button AFTER commit
    document.getElementById("resourceRequest").disabled = true;


    // ❗ IMPORTANT: recompute safe sequence AFTER tables updated
    let newSeq = getSafeSequence();

    if (newSeq === null) {
        alert("⚠️ Unexpected: system became unsafe after commit!");
        return;
    }

    // 4️⃣ Show success + new safe sequence
    displaySafeSequenceAfterGrant(newSeq);

    // 5️⃣ Clean inputs
    resetRequestInputs();
}


function resetRequestInputs() {
    for (let i = 0; i < totalResources; i++) {
        let input = document.getElementById(`req_${i}`);
        if (input) input.value = 0;
    }
}

// safe sequence after granting 
//-------------------------------------safe_sequence_after_granting---------------------//
function displaySafeSequenceAfterGrant(sequence) {

    let old = document.getElementById("safeSequenceAfterGrant");
    if (old) old.remove();

    let container = document.getElementById("safeSequenceAfterGrantContainer");

    let box = document.createElement("div");
    box.id = "safeSequenceAfterGrant";

    let msg = document.createElement("p");
    msg.innerText = "✅ Allocation COMMITTED successfully.";
    msg.className = "commit-message";

    let heading = document.createElement("h3");
    heading.innerText = "Safe Sequence After Resource Allocation (System State Updated)";

    let seqText = document.createElement("p");
    seqText.className = "safe-seq-text";

    let result = "";
    for (let i = 0; i < sequence.length; i++) {
        result += "P" + (sequence[i] + 1);
        if (i !== sequence.length - 1) result += " → ";
    }

    seqText.innerText = result;

    box.appendChild(msg);
    box.appendChild(heading);
    box.appendChild(seqText);
    container.appendChild(box);

    box.scrollIntoView({ behavior: "smooth" });
}

// same code of satartSafeSequence

function getSafeSequence() {
    let finished = new Array(totalProcesses).fill(false);
    let safeSequence = [];

    let available = [];
    for (let j = 0; j < totalResources; j++) {
        available[j] = Number(document.getElementById(`avail_${j}`).innerText);
    }

    let count = 0;
    while (count < totalProcesses) {
        let found = false;

        for (let i = 0; i < totalProcesses; i++) {
            if (!finished[i] && canProcessRun(i, available)) {
                for (let j = 0; j < totalResources; j++) {
                    let alloc = Number(
                        document.getElementById(`alloc_${i}_${j}`).value
                    );
                    available[j] += alloc;
                }
                finished[i] = true;
                safeSequence.push(i);
                count++;
                found = true;
            }
        }

        if (!found) return null;
    }

    return safeSequence;
}


// ------------------------------adding 3 important functions------------------------------//

// Show UNSAFE message (NO confirm box) 

function showUnsafeMessage(msg) {
    let container = document.getElementById("safeSequenceAfterGrantContainer");
    container.innerHTML = `<p class="commit-message">${msg}</p>`;
}

//

// Show SAFE simulation (before commit)

function showSafeSimulation(sequence) {
    let container = document.getElementById("safeSequenceAfterGrantContainer");
    container.innerHTML = "";

    let msg = document.createElement("p");
    msg.className = "commit-message";
    msg.innerText = "✅ Allocation CAN BE COMMITTED";

    let heading = document.createElement("h3");
    heading.innerText = "Safe Sequence After Temporary Allocation (Original Matrices Unchanged)";

    let p = document.createElement("p");
    p.className = "safe-seq-text";

    let result = "";
    for (let i = 0; i < sequence.length; i++) {
        result += "P" + (sequence[i] + 1);
        if (i !== sequence.length - 1) result += " → ";
    }
    p.innerText = result;

    container.appendChild(msg);
    container.appendChild(heading);
    container.appendChild(p);
}

// Show confirm box AFTER simulation

function showConfirmBox(processIndex, request) {
    let box = document.getElementById("safeRequestBox");
    box.style.display = "block";

    document.getElementById("confirmGrant").onclick = function () {
        box.style.display = "none";
        commitAllocation(processIndex, request);
    };

    document.getElementById("cancelGrant").onclick = function () {
        box.style.display = "none";
        resetRequestInputs();
    };
}

// --------------------function to show whats went wrong ---------------------------------//
function showRequestError(message) {
    let container = document.getElementById("safeSequenceAfterGrantContainer");
    container.innerHTML = "";

    let box = document.createElement("div");
    box.className = "request-error-box";

    let p = document.createElement("p");
    p.innerText = message;

    box.appendChild(p);
    container.appendChild(box);

    box.scrollIntoView({ behavior: "smooth" });
}

//---------------------------------------phase 3--------------------------------------------------//
function restartRequestFlow() {
    // Remove unsafe message
    // let unsafe = document.querySelector(".unsafe-box");
    // if (unsafe) unsafe.remove();

    // Remove simulation result
    let sim = document.getElementById("safeSequenceSimulation");
    if (sim) sim.remove();

    // Remove after-grant result (if any)
    let after = document.getElementById("safeSequenceAfterGrant");
    if (after) after.remove();

    // Hide confirmation box
    // let box = document.getElementById("safeRequestBox");
    // if (box) box.style.display = "none";

    // Clear request inputs
    for (let i = 0; i < totalResources; i++) {
        let input = document.getElementById(`req_${i}`);
        if (input) input.value = 0;
    }

    // 🔥 THIS IS THE MOST IMPORTANT LINE
    // Re-enable Grant Request button logic
    let btn = document.querySelector("#makeResourceRequest button");
    if (btn) btn.disabled = false;
}





function reset() {
    location.reload();
}
