'use strict';

function getDogImage(dogBreed) {
    let link = `
        https://dog.ceo/api/breed/${dogBreed}/images/random
    `
    fetch(link)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));
}

// Assignment Question 2: Builds on previous code 
// & displays images in DOM
function displayResults(responseJson) {
    console.log(responseJson);
    if (responseJson.status == "error") {
        alert('Breed not found. Try again.');
    } else {
        // display results section
        $('.results').removeClass('hidden');
        let getBreed = responseJson.message.split("/");
        let breedName = getBreed[4];
        $('.results').html(`<p>Here's a ${breedName}!</p>`);
        // replace existing img with new one
        $('.results').append( `
        <img src="${responseJson.message}">
        `
        );
    }
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let dogBreed = $("#breed").val();
        getDogImage(dogBreed);
    });
}

$(function () {
    console.log('App loaded! Waiting for submit!');
    watchForm();
});