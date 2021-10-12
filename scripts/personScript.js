let personListe = loadData();
let filterInput = document.querySelector('#filterID');
let filterOption = document.querySelector('#filterOptions');
let sortOption = document.querySelector('#sortID');
let searchText = 
{
    filterText:'',
    filterBy:filterOption.value,
    sortBy:''
};

//Function to load data
function loadData()
{
    try
    {
        return localStorage.getItem('personliste') == null ? [] : JSON.parse(localStorage.getItem('personliste'));
    }
    catch(e)
    {
        return [];
    }
}

//Function that lists the personlist to the page
function listPersonList()
{
    let currentDate = moment();
    let personDiv = document.querySelector('#listArea');
    let listToPrint = [];
    personDiv.innerHTML = "";
    if(searchText.filterText.length < 1)
    {
        listToPrint = personListe;
        sortList(listToPrint, searchText.sortBy);
    }
    else
    {
        listToPrint = filterList();
        sortList(listToPrint, searchText.sortBy);
    }
    listToPrint.forEach((person) =>
    {
        let divPerson = document.createElement('div');
        divPerson.classList.add('list-item');
        let currentAge = currentDate.diff(moment(person.birthDate), 'year');
        let output = document.createElement('span');
        output.classList.add('list-item__title')
        output.innerHTML = `${person.firstName} ${person.lastName}<br>Age: ${currentAge}<br>Address: ${person.address}<br>`;

        let editButton = document.createElement('button');
        editButton.textContent = "Edit person";
        editButton.addEventListener('click', (e) => location.assign(`/edit-person.html#${person.id}`));
        output.appendChild(editButton);
        
        let removeButton = document.createElement('button');
        removeButton.textContent = "Remove person";
        removeButton.addEventListener('click', (e) =>
        {
            removePerson(person.id);
            listPersonList();
        });
        output.appendChild(removeButton);

        divPerson.appendChild(output);

        personDiv.appendChild(divPerson);
    });
}

//Function that adds person to the list
function addPerson()
{
    let firstName = document.querySelector('#firstName').value;
    let lastName = document.querySelector('#lastName').value;
    let birthDate = moment(document.querySelector('#birthDate').value);
    let currentDate = moment();
    let address = document.querySelector('#address').value;
    if(exists(firstName, lastName))
    {
        console.log(`${firstName} ${lastName} already exists in the list`);
    }
    else
    {
        let person = 
        {
            id:personListe.length,
            firstName:firstName,
            lastName:lastName,
            address:address,
            birthDate:birthDate,
            registered:currentDate,
            edited:currentDate,
            note:''
        };

        //Clearing the fields
        document.querySelector('#firstName').value = "";
        document.querySelector('#lastName').value = "";
        document.querySelector('#birthDate').value = "";
        document.querySelector('#address').value = "";
        //Saving to list and updating local storage
        personListe.push(person);
        saveData();
        listPersonList();
    }
}

//Function that checks if person already exists in the list
function exists(firstName, lastname)
{
    let exist = false;
    personListe.forEach(function(person)
    {
        if(person.firstName.toLowerCase() == firstName.toLowerCase() && person.lastName.toLowerCase()  == lastname.toLowerCase())
        {
            exist = true;
        }
    });
    return exist;
}

//Function that saves latest data to list
function saveData()
{
    localStorage.setItem('personliste', JSON.stringify(personListe));
}

//Function to remove person from the list
function removePerson(id)
{
    let personRemoved = personListe.splice(getIndex(id), 1);
    console.log(`${personRemoved[0].firstName} ${personRemoved[0].lastName} has been removed`);
    let newId = 0;
    personListe.forEach(function(person)
    {
        person.id = newId;
        newId++;
    })
    saveData();
}

//Function to get index of person
function getIndex(id)
{
    let index = personListe.findIndex(function(person)
    {
        return person.id == id;
    });
    return index;
}

//Function for the eventlistener
function filterListener()
{
    searchText.filterText = filterInput.value;
    searchText.filterBy = filterOption.value;
    searchText.sortBy = sortOption.value;
    listPersonList();
}

//Function to filter list
function filterList()
{
    let filteredList = [];
    console.log(searchText.filterBy);
    if(searchText.filterBy.toLowerCase() == "first name")
    {
        filteredList = personListe.filter(function(person)
        {
            return person.firstName.toLowerCase().includes(searchText.filterText.toLowerCase());
        });
    } 
    else if(searchText.filterBy.toLowerCase() == "last name")
    {
        filteredList = personListe.filter(function(person)
        {
            return person.lastName.toLowerCase().includes(searchText.filterText.toLowerCase());
        });
    }
    else if(searchText.filterBy.toLowerCase() == "address")
    {
        filteredList = personListe.filter(function(person)
        {
            return person.address.toLowerCase().includes(searchText.filterText.toLowerCase());
        });
    };
    return filteredList;
}

//Function to sort list
function sortList(listToSort, sortByText)
{
    listToSort.sort((a,b) =>
    {
        if(sortByText.toLowerCase() == "first name")
        {
            if(a.firstName.toLowerCase() < b.firstName.toLowerCase())
            {
                return -1;
            }
            else if(a.firstName.toLowerCase() > b.firstName.toLowerCase())
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        else if(sortByText.toLowerCase() == "last name")
        {
            if(a.lastName.toLowerCase() < b.lastName.toLowerCase())
            {
                return -1;
            }
            else if(a.lastName.toLowerCase() > b.lastName.toLowerCase())
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        else if(sortByText.toLowerCase() == "address")
        {
            if(a.address.toLowerCase() < b.address.toLowerCase())
            {
                return -1;
            }
            else if(a.firstName.toLowerCase() > b.firstName.toLowerCase())
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        else if(sortByText.toLowerCase() == "last edited")
        {
            let timestampA = moment(a.edited).valueOf();
            let timestampB = moment(b.edited).valueOf();
            if(timestampA > timestampB)
            {
                return -1;
            }
            else if(timestampA < timestampB)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        else if(sortByText.toLowerCase() == "registered")
        {
            let timestampA = moment(a.registered).valueOf();
            let timestampB = moment(b.registered).valueOf();
            if(timestampA > timestampB)
            {
                return -1;
            }
            else if(timestampA < timestampB)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
    });
}