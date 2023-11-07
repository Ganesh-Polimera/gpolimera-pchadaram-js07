document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const addButton = document.getElementById("add-button");
    const searchInput = document.getElementById("search-text");
    const searchButton = document.getElementById("search-button");
    const message = document.getElementById("message");
    const tableBody = document.querySelector("table tbody");

    const data = [];

    function addEntry(name, email) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>
                <button class="btn btn-danger btn-sm delete-button">Delete</button>
            </td>
        `;
        tableBody.appendChild(newRow);

        const deleteButton = newRow.querySelector(".delete-button");
        deleteButton.addEventListener("click", function () {
            tableBody.removeChild(newRow);
            const index = data.findIndex((item) => item.name === name && item.email === email);
            if (index !== -1) {
                data.splice(index, 1);
            }
        });

        data.push({ name, email });
    }

    addButton.addEventListener("click", function () {
        const name = nameInput.value;
        const email = emailInput.value;

        if (name.trim() === "" || email.trim() === "") {
            message.textContent = "Name and email are required.";
            return;
        }

        addEntry(name, email);

        nameInput.value = "";
        emailInput.value = "";

        message.textContent = "Entry added successfully!";
    });

    searchButton.addEventListener("click", function () {
        const searchText = searchInput.value.toLowerCase();

        if (searchText.trim() === "") {
            message.textContent = "Search text is required.";
            return;
        }

        tableBody.innerHTML = "";

        const results = data.filter((entry) =>
            entry.name.toLowerCase().includes(searchText) ||
            entry.email.toLowerCase().includes(searchText)
        );

        if (results.length === 0) {
            message.textContent = "No matching entries found.";
        } else {
            results.forEach((entry) => {
                addEntry(entry.name, entry.email);
            });

            message.textContent = `${results.length} matching entries found.`;
        }
    });
});
