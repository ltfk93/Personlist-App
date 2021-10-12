//console.log(relativeTime());
let id = location.hash.substring(1);
let personToChange = personListe[id];

let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let address = document.querySelector('#address');
let birthDate = document.querySelector('#birthDate');
let noteArea = document.querySelector('#noteArea');
let lastEdited = document.querySelector('#lastEdited');

document.querySelector('#personToEdit').textContent = `${personToChange.firstName} ${personToChange.lastName}`;

firstName.value = personToChange.firstName;
lastName.value = personToChange.lastName;
address.value = personToChange.address;
birthDate.value = moment(personToChange.birthDate).format('YYYY-MM-DD');
noteArea.value = personToChange.note;
lastEdited.textContent = `Last edited: ${moment(personToChange.edited).fromNow()}`;


//Eventlistener to return to homepage
document.querySelector('#returnButton').addEventListener('click', (e) =>
{
    location.assign('/index.html');
});

//Eventlistener for edit button
document.querySelector('#editPerson').addEventListener('click', (e) =>
{
    if(firstName.value.toLowerCase() == personToChange.firstName.toLowerCase() && lastName.value.toLowerCase() == personToChange.lastName.toLowerCase()
    && address.value.toLowerCase() == personToChange.address.toLowerCase() && birthDate.value == moment(personToChange.birthDate).format('YYYY-MM-Do')
    && noteArea.value.toLowerCase() == personToChange.note.toLowerCase())
    {
        alert("No changes has been made");        
    }
    else
    {
        personListe[id].firstName = firstName.value;
        personListe[id].lastName = lastName.value;
        personListe[id].address = address.value;
        personListe[id].birthDate = moment(birthDate.value);
        personListe[id].edited = moment();
        personListe[id].note = noteArea.value;

        saveData();
        location.assign("/person.html");
    }
});
//Eventlistener for remove button
document.querySelector('#removePerson').addEventListener('click', (e) =>
{
    removePerson(id);
    saveData();
    location.assign('/person.html');
});