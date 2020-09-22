const baseAPIURL = `https://api.thesneakerdatabase.com/v1/sneakers?limit=${15}&`
const baseURL = 'http://localhost:3000/'
const sneakerURL = `${baseURL}sneakers`
const loginURL= `${baseURL}login`
const usersURL= `${baseURL}users`
const userSneakerURL = `${baseURL}user_sneakers`
const loginForm = document.querySelector('#login-form')
const collectionUL = document.querySelector('.collection-list')
const sneakerUL = document.querySelector('.sneaker-list')
const logOutButton = document.querySelector('.logout-button')
const createUserForm = document.querySelector('.create-user-form')
const menu = document.querySelector('#menu')
const welcome = document.querySelector('.welcome')
const menuList = document.querySelector('#menu-choices')
const searchSneakers = document.querySelector('#search-sneakers')
const sneakerCollection = document.querySelector('#collection')
const sneakerSearch = document.querySelector('#search-form')
const collection = document.querySelector('#collection')
const createUserLink = document.querySelector('#create-user')





menu.addEventListener('click', event =>{
        event.preventDefault()
        welcome.classList.add('hidden')
        menuList.classList.remove('hidden')
    })

searchSneakers.addEventListener('click', event =>{
    event.preventDefault()
    collectionUL.innerHTML = ''
    searchSneakers.classList.add('hidden')
    collection.classList.remove('hidden')
    fetch(sneakerURL)
        .then(response => response.json())
        .then(results => {
            renderUserSneaker(results, collectionUL, user_id, token) 
        })
})

sneakerCollection.addEventListener('click', event => {
    event.preventDefault()
    sneakerUL.innerHTML =''
    collectionUL.innerHTML = ""
    let token = localStorage.getItem('token')
    let user_id = localStorage.getItem('user_id')
    sneakerCollection.classList.add('hidden')
    searchSneakers.classList.remove('hidden')
    if (token){
        console.log(token)
        fetch(usersURL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(repsonse => repsonse.json())
            .then(user=> {
                renderUserSneaker(user.sneakers, collectionUL, user.id, user.token)
            })
    }
})

createUserLink.addEventListener('click', event => {
    event.preventDefault()
    createUserForm.classList.remove('hidden')
})
    
    loginForm.addEventListener('submit', event => {
        event.preventDefault()
        let login = new FormData(loginForm)
        const username = login.get('username')
        const password = login.get('password')
        collectionUL.innerHTML = ''
        
        fetch(loginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(result => {
            const token = localStorage.setItem('token', result.token)
            const user_id = localStorage.setItem('user_id', result.user_id)
            loginForm.classList.add('hidden')
            logOutButton.classList.remove('hidden')
            
            renderUserSneaker(result.sneakers, collectionUL, result.token, result.user_id)
        })
        
        event.target.reset()
    })
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')
    
    logOutButton.addEventListener('click',(event)=>{
        loginForm.classList.remove('hidden')
        logOutButton.classList.add('hidden')
        collectionUL.innerHTML = ''
    })
    // collection.addEventListener('click', event => {
    //     sneakerUL.innerHTML = ""
    //     fetch(usersURL, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     })
    //         .then(repsonse => repsonse.json())
    //         .then(result => {
    //             console.log(result)
    //             collectionUL.innerHTML = ""
    //             renderUserSneaker(result.sneakers,collectionUL, result.id, reuslt.token)
    //         })
    // })
    
    sneakerSearch.addEventListener('submit', (event)=>{
        event.preventDefault()
        sneakerUL.innerHTML = ''
        const searchForm = new FormData(sneakerSearch)
        let brand = searchForm.get('brand')
        let gender = searchForm.get('gender')
        let title = searchForm.get('title')
        let releaseYear = searchForm.get('releaseYear')
        let colorway = searchForm.get('colorway')
        let searchURL = `${baseAPIURL}`
        for(let pair of searchForm.entries()){
            if (pair[1]){
                console.log(searchURL += `${pair[0]}=${pair[1]}&`)
            }
        }
        
        fetch(sneakerURL)
        .then(response => response.json())
        .then(results => {
            renderUserSneaker(results, sneakerUL, user_id, token) 
        })
        
        event.target.reset()
    })
    
    createUser()
    
    searchSneakers.addEventListener('click', event => {
        fetch(sneakerURL)
            .then(response => response.json())
            .then(results => {
                renderUserSneaker(results, sneakerUL, user_id, token)
            })
    })
    
    function createUser(){
        createUserForm.addEventListener('submit', event => {
            event.preventDefault()
            const userForm = new FormData(createUserForm)
            const newUsername = userForm.get('username')
            const newPassword = userForm.get('password')
            persistUser(newUsername, newPassword)
            event.target.reset()
        })
    }
    
    function persistUser(username, password){
        fetch(usersURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        })
        .then(repsonse => repsonse.json())
        .then(result => {
    
            if( Array.isArray(result.username)){
                alert('Username has be taken. Try another')
            } else{
                alert(`${result.username} was created. Please sign in.`)
                createUserForm.classList.add('hidden')
            }
        })
    }
    
    
    
    function renderUserSneaker(userSneakers, element, user_id, token){
        userSneakers.forEach(sneaker => {
            let sneakerLi = document.createElement('li')
            sneakerLi.innerHTML = `<img src='${sneaker.imageUrl}' id='sneaker-img'>${sneaker.brand} - ${sneaker.title} - ${sneaker.year}`
            sneakerLi.id = `${sneaker.id}`
            element.append(sneakerLi)
            sneakerDeleteButton(sneakerLi)
         
            addSneakerToCollection(sneakerLi, token, sneakerLi.id,  user_id)
        })
    }
    
    function sneakerDeleteButton(sneakerLi){
        let deleteButton = document.createElement('button')
        deleteButton.innerHTML = 'Remove From Collection'
        deleteButton.id = 'delete-button'
        sneakerLi.append(deleteButton)
        deleteButton.addEventListener('click', event => {
            event.target.parentNode.remove()
            persistDelete(event.target.parentNode.id, user_id)
        }) 
    }
    
    function persistDelete(sneaker_id, user_id){
        fetch(userSneakerURL, {
            method: 'DELETE',
            body: JSON.stringify({
        
                sneaker_id: sneaker_id
            })
        })
    }
    
    function addSneakerToCollection(element, token, sneaker_id, user_id){
        const createButton = document.createElement('button')
        createButton.id = 'create-button'
        createButton.innerHTML = 'Add To Your Collection'
        element.append(createButton)
        console.log(localStorage.getItem('user_id'))
        createButton.addEventListener('click', event => {
            console.log(token)
            console.log(user_id)
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
    
    