// MAPPING TEST ANFANG
const persons = [
    { firstname: "Malcom", lastname: "Reynolds" },
    { firstname: "Kaylee", lastname: "Frye" },
    { firstname: "Jayne", lastname: "Cobb" }
];

function getFullName(item) {
    return [item.firstname, item.lastname].join(" ")
}

const output = persons.map(getFullName)
//console.log(output) // Array
// MAPPING TEST ENDE