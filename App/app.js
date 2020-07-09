const baseURL = 'http://localhost:3000/'
const loginURL= `${baseURL}login`
const usersURL= `${baseURL}users`
const loginForm = document.querySelector('#login-form')
const sneakerUL = document.querySelector('ul')
const logOutButton = document.querySelector('.logout-button')

    
loginForm.addEventListener('submit', event => {
    event.preventDefault()
    let login = new FormData(loginForm)
    const username = login.get('username')
    const password = login.get('password')

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
        fetch(usersURL, {
            headers: {
                "Authorization": `Bearer ${result['token']}`
            }
        })
            .then(response => response.json())
            .then(result => {
                loginForm.classList.add('hidden')
                logOutButton.classList.remove('hidden')
                renderUserSneaker(result)
            })
    })

    event.target.reset()
})
// }
logOutButton.addEventListener('click',(event)=>{
    loginForm.classList.remove('hidden')
    logOutButton.classList.add('hidden')
    sneakerUL.remove()
})


function renderUserSneaker(user){
    user.sneakers.map(sneaker =>{
        let sneakerLi = document.createElement('li')
        sneakerLi.innerHTML = `${sneaker.brand} - ${sneaker.title} - ${sneaker.year}`
        sneakerUL.append(sneakerLi)
    })
}

function sneakerDeleteButton(){

}