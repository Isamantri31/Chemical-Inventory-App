// Sample JSON Array with Chemical Data
let chemicalData = [
    { id: 1, name: "Sodium Chloride", vendor: "Vendor A", density: 2.16, viscosity: 0.95, packaging: "Bottle", packSize: 500, unit: "g", quantity: 10 },
    { id: 2, name: "Acetic Acid", vendor: "Vendor B", density: 1.05, viscosity: 1.2, packaging: "Canister", packSize: 1000, unit: "ml", quantity: 20 },
    { id: 3, name: "Benzene", vendor: "Vendor C", density: 0.876, viscosity: 0.604, packaging: "Drum", packSize: 200, unit: "L", quantity: 5 },
    { id: 4, name: "Hydrogen Peroxide", vendor: "Vendor A", density: 1.45, viscosity: 1.9, packaging: "Bottle", packSize: 500, unit: "ml", quantity: 15 },
    { id: 5, name: "Ethanol", vendor: "Vendor B", density: 0.789, viscosity: 1.2, packaging: "Drum", packSize: 100, unit: "L", quantity: 8 },
];

// Track the currently selected row index, starting with row 1
let selectedRowIndex = 0;
let isEditing = false; // Track whether a row is in edit mode

// Function to Render the Table
function renderTable(data) {
    const tableBody = document.querySelector("#chemicalTable tbody");
    tableBody.innerHTML = ""; // Clear existing table rows

    data.forEach((row, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.id}</td>
            <td contenteditable="${isEditing && index === selectedRowIndex}">${row.name}</td>
            <td contenteditable="${isEditing && index === selectedRowIndex}">${row.vendor}</td>
            <td contenteditable="${isEditing && index === selectedRowIndex}">${row.density}</td>
            <td contenteditable="${isEditing && index === selectedRowIndex}">${row.viscosity}</td>
            <td contenteditable="${isEditing && index === selectedRowIndex}">${row.packaging}</td>
            <td contenteditable="${isEditing && index === selectedRowIndex}">${row.packSize}</td>
            <td contenteditable="${isEditing && index === selectedRowIndex}">${row.unit}</td>
            <td contenteditable="${isEditing && index === selectedRowIndex}">${row.quantity}</td>
        `;

        // Highlight the selected row
        if (index === selectedRowIndex) {
            tr.classList.add("editable-row");
        }

        // Highlight the row that is in editing mode
        if (isEditing && index === selectedRowIndex) {
            tr.classList.add("editing");
        }

        tableBody.appendChild(tr);
    });
}

// Sort Table by Column
function sortTableByColumn(column, order) {
    chemicalData.sort((a, b) => {
        if (order === "asc") {
            return a[column] > b[column] ? 1 : -1;
        } else {
            return a[column] < b[column] ? 1 : -1;
        }
    });
    renderTable(chemicalData);
}

// Toolbar Button Functionality

// Add Row
document.getElementById("addRowBtn").addEventListener("click", () => {
    const newRow = {
        id: chemicalData.length + 1,
        name: "New Chemical",
        vendor: "New Vendor",
        density: 0,
        viscosity: 0,
        packaging: "New Packaging",
        packSize: 0,
        unit: "g",
        quantity: 0,
    };
    chemicalData.push(newRow);
    renderTable(chemicalData);
});

// Move Row Up
document.getElementById("moveUpBtn").addEventListener("click", () => {
    if (selectedRowIndex > 0) {
        selectedRowIndex--;
        renderTable(chemicalData);
    }
});

// Move Row Down
document.getElementById("moveDownBtn").addEventListener("click", () => {
    if (selectedRowIndex < chemicalData.length - 1) {
        selectedRowIndex++;
        renderTable(chemicalData);
    }
});

// Delete Row with Popup for ID
document.getElementById("deleteRowBtn").addEventListener("click", () => {
    const idToDelete = prompt("Enter the ID of the row you want to delete:");

    // Find the index of the row with the specified ID
    const indexToDelete = chemicalData.findIndex(row => row.id == idToDelete);

    if (indexToDelete !== -1) {
        chemicalData.splice(indexToDelete, 1); // Delete the row

        // Update IDs for remaining rows
        chemicalData.forEach((row, index) => {
            row.id = index + 1; // Reassign IDs starting from 1
        });

        selectedRowIndex = 0; // Reset to first row
        renderTable(chemicalData);
    } else {
        alert(`Row with ID ${idToDelete} not found.`);
    }
});

// Edit Selected Row
document.getElementById("editRowBtn").addEventListener("click", () => {
    isEditing = !isEditing; // Toggle the edit mode
    renderTable(chemicalData);
});

// Refresh Data
document.getElementById("refreshBtn").addEventListener("click", () => {
    renderTable(chemicalData);
});

// Save Data (Example functionality)
document.getElementById("saveBtn").addEventListener("click", () => {
    const jsonData = JSON.stringify(chemicalData, null, 2);
    console.log("Data saved:", jsonData);
    alert("Data saved! Check the console for the output.");
});

// Sort columns on header click
document.querySelectorAll("th").forEach(header => {
    header.addEventListener("click", () => {
        const column = header.getAttribute("data-column");
        const order = header.getAttribute("data-order");
        const newOrder = order === "asc" ? "desc" : "asc";
        header.setAttribute("data-order", newOrder);
        sortTableByColumn(column, newOrder);
    });
});

// Initial Table Render
renderTable(chemicalData);
