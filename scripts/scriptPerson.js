listPersonList();

//Button to add person to list
document.querySelector('#addPerson').addEventListener('click', (e) =>
{
    addPerson();
});

//Listener for filter
document.querySelector('#filterID').addEventListener('input', (e) =>
{
    filterListener();
});

//Listener for filterOptions
document.querySelector('#filterOptions').addEventListener('input', (e) =>
{
    filterListener();
});

//Listener for sort
document.querySelector('#sortID').addEventListener('change', (e) =>
{
    filterListener();
});