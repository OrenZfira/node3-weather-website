const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const url = '/weather?address=' + location

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''

    fetch(url).then((res) => {
        res.json().then((data) => {
            if(data.error){
                msgOne.textContent = data.error
                return
            }
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast
        })
    })
})