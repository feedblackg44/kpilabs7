function getUsers(numberOfUsers) {
    for (let i = 0; i < numberOfUsers; i++) {
        fetch("https://randomuser.me/api/")
            .then((response) => response.json())
            .then((data) => createUser(data.results[0]))
    }
}

$("#btn").click(() => {
    getUsers(4)
})

function createUser(profile){
    const user = $("<div class='user'></div>")
    const description = $("<div class='description'></div>")
    user.append(`<div class="img"><img src="${profile.picture.large}" alt="фотографія"/></div>`)
    description.append(`<div><b>Телефон: </b>${profile.cell}</div>`)
    description.append(`<div><b>Країна: </b>${profile.location.country}</div>`)
    description.append(`<div><b>Посткод: </b>${profile.location.postcode}</div>`)
    description.append(`<div><b>Посткод: </b>${profile.location.postcode}</div>`)
    user.append(description)
    $('#users').append(user)
}
