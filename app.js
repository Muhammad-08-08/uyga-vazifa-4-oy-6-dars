let thead = document.querySelector("thead");
let tbody = document.querySelector("tbody");
let form = document.querySelector("#crudForm");

let crudDatas = JSON.parse(localStorage.getItem("crudDatas")) || [
  { id: 1, name: "John Doe", email: "John@example.com", phone: "99-999-99-99" },
  { id: 2, name: "Jane Doe", email: "Jane@example.com", phone: "77-777-77-77" },
  { id: 3, name: "Alice Doe", email: "Alice@example.com", phone: "55-555-55-55" },
  { id: 4, name: "Bob Doe", email: "Bob@example.com", phone: "97-111-11-11" },
];

function renderTableHead() {
  thead.innerHTML = "";
  let tr = document.createElement("tr");
  ["ID", "Name", "Email", "Phone", "Action"].forEach((heading) => {
    let th = document.createElement("th");
    th.textContent = heading;
    tr.append(th);
  });
  thead.append(tr);
}

function renderTableData(datas) {
  tbody.innerHTML = "";
  datas.forEach((val) => {
    let tr = document.createElement("tr");

    tr.innerHTML = `
            <td>${val.id}</td>
            <td>${val.name}</td>
            <td>${val.email}</td>
            <td>${val.phone}</td>
            <td class="actions">
                <img src="./acses/edit.webp" alt="Edit" class="edit-btn">
                <img src="./acses/delete.png" alt="Delete" class="delete-btn">
            </td>
        `;

    tbody.append(tr);

    tr.querySelector(".delete-btn").addEventListener("click", () =>
      onDelete(val.id)
    );

    tr.querySelector(".edit-btn").addEventListener("click", () => onEdit(val));
  });

  if (datas.length === 0) {
    tbody.innerHTML = "<tr><td colspan='5'>Hech narsa yo'q</td></tr>";
  }
}

function saveToLocalStorage() {
  localStorage.setItem("crudDatas", JSON.stringify(crudDatas));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let nameText = document.getElementById("name").value;
  let emailText = document.getElementById("email").value;
  let phoneText = document.getElementById("phone").value;

  if (nameText && emailText && phoneText) {
    let newData = {
      id: crudDatas.length ? crudDatas[crudDatas.length - 1].id + 1 : 1,
      name: nameText,
      email: emailText,
      phone: phoneText,
    };
    crudDatas.push(newData);
    renderTableData(crudDatas);
    saveToLocalStorage();
    form.reset();
  }
});

function onDelete(id) {
  crudDatas = crudDatas.filter((val) => val.id !== id);
  renderTableData(crudDatas);
  saveToLocalStorage();
}

function onEdit(val) {
  let newName = prompt("Yangi ism kiriting:", val.name);
  let newEmail = prompt("Yangi email kiriting:", val.email);
  let newPhone = prompt("Yangi telefon raqamini kiriting:", val.phone);

  if (newName && newEmail && newPhone) {
    crudDatas = crudDatas.map((item) =>
      item.id === val.id
        ? { ...item, name: newName, email: newEmail, phone: newPhone }
        : item
    );
    renderTableData(crudDatas);
    saveToLocalStorage();
  }
}

renderTableHead();
renderTableData(crudDatas);
