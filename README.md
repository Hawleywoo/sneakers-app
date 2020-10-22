# Sneaker Collection

## Table of Contents

- [](#)
  - [Table of contents](#table-of-contents)
  - [General info](#general-info)
  - [Intro Video](#intro-video)
  - [Technologies](#technologies)
  - [Setup](#setup)
  - [Code Examples](#code-examples)
  - [Features](#features)
  - [Status](#status)
  - [Inspiration](#inspiration)
  - [Contact](#contact)
  
## General Info

The Sneaker app is a full-stack application made with Ruby on Rails and  vanilla Javascritp that allows users to search through list of sneakers
and add sneakers into your personal collection.

## Intro Video
 [Sneaker App Demo](https://www.youtube.com/)

## Mod 3 Flatiron Project by Andrew Hawley

    -Rails - 6.0.3.1
    -Sqlite
    -Javascript

## Code Examples
  ```
        function addSneakerToCollection(element, token, sneaker_id, user_id){
        const createButton = document.createElement('button')
        createButton.id = 'create-button'
        createButton.innerHTML = 'Add To Your Collection'
        element.append(createButton)
        createButton.addEventListener('click', event => {
            fetch(userSneakerURL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    sneaker_id: sneaker_id
                })
            })
        })
    }
   

  ```
## Features

    -Allows users to browser through a list of sneakers.
    -Allows users to filter list of breed by searching a name.
    -Allows users to add speicfic sneaker to their users collection

## To-Do List

    -Refactor “code smell”
    -Add more filter options
    -add icons


## Contact

Created by [Andrew Hawley](https://www.linkedin.com/in/andrew-hawley-695299182/)

Feel free to contact me!
