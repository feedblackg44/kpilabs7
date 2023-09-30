let angle = 270;
const switcher_button = $('.switcher-button');

switcher_button.on("click", event => {
    event.preventDefault();
    const task1 = $('#task1_div');
    const task2 = $('#task2_div');

    angle = angle === 90 ? 270 : 90;
    if (task1.hasClass("hidden")) {
        task1.removeClass("hidden");
        task2.addClass("hidden");
    } else if (task2.hasClass("hidden")) {
        task1.addClass("hidden");
        task2.removeClass("hidden");
    }
    switcher_button.css('background', `linear-gradient(${angle}deg, #fff, #000)`);
});


$('#send').on("click", event => {
    event.preventDefault()
    const name = $("input[name='name']")
    const group = $("input[name='group']")
    const phone = $("input[name='phone']")
    const address = $("input[name='address']")
    const mail = $("input[name='mail']")

    let valid = true
    valid &= check(name, /^[A-ZА-ЯІЇЄ]+ [A-ZА-ЯІЇЄ]\.[A-ZА-ЯІЇЄ]\.$/i)
    valid &= check(group, /^[A-ZА-ЯІЇЄ]{2}-\d{2}$/i)
    valid &= check(phone, /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/i)
    valid &= check(address, /^[мc]\. [A-ZА-ЯІЇЄ]+$/i)
    valid &= check(mail, /^[a-zA-Z]+@[a-zA-Z]+.com$/)

    if (valid) {
        $('#output').html(`
			<div><b>ПІБ: </b>${name.val()}</div>
			<div><b>Група: </b>${group.val()}</div>
			<div><b>Телефон: </b>${phone.val()}</div>
			<div><b>Адреса: </b>${address.val()}</div>
			<div><b>e-mail: </b>${mail.val()}</div>
		`)
    } else {
        $('#output').html('')
    }
})

function check(element, rule) {
    if (rule.test(element.val())) {
        element.removeClass("Error")
        return true
    }
    element.addClass("Error")
    return false
}

variant = 85 % 36 + 1

for (let i = 0; i < 6; i++) {
    const rowElement = document.createElement('tr')
    for (let j = 1; j <= 6; j++) {
        const index = String(j + (i * 6))
        const dataElement = document.createElement('td')
        dataElement.innerHTML = index
        dataElement.id = index
        rowElement.append(dataElement)
    }
    $('.table').append(rowElement)
}

const variantCell = $(`td[id=${variant}]`)

variantCell.on("click", () => {
    const color = $(`#color_picker`).val()
    $(`td[id=${variant}]`).css('backgroundColor', `${color}`)
})

variantCell.on("mouseover", () => {
    $(`td[id=${variant}]`).css('backgroundColor', `${getRandomColor()}`)
})

variantCell.on("dblclick", () => {
    const color = $(`#color_picker`).val()
    for (let i = 1; i <= 36; i++) {
        if (i !== variant) {
            $(`td[id=${i}]`).css('backgroundColor', `${color}`)
        } else {
            $(`td[id=${i}]`).css('backgroundColor', '')
        }
    }
})

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}