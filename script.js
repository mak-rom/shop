'use strict'

function handler(e) {
    //document.querySelector("#card1").innerHTML = e.pageX + " " + e.pageY + " " + e.altKey
    console.log(e)
}

/*function handler1(e) {
    if ((e.altKey == true) && (key == "T")) {
        alert('Hello');
    }
}*/


//let card = document.querySelector('#card1');
//card.addEventListener('click', handler);
//card.addEventListener('mouseout', handler);
//card.addEventListener('mouseover', handler);
//card.addEventListener('mousemove', handler);
//card.addEventListener('dblclick', handler);
//card.addEventListener('contextmenu', handler1);
//card.addEventListener('mousedown', handler);
//card.addEventListener('mouseup', handler);
//card.addEventListener('contextmenu', handler);

//document.addEventListener('keypress', handler);
//document.addEventListener('keydown', handler);
//document.addEventListener('keyup', handler);





window.addEventListener('scroll', () => {
    
    let cards = document.querySelectorAll(".card-left")
    for(let item of cards) {

        const offset = item.offsetTop-screen.height/4;
        const my_scroll = window.scrollY;
        
        if (my_scroll > offset) {
            item.classList.remove('card-left');
            item.classList.add('card-left-new');
        }
    }

    cards = document.querySelectorAll(".card-right")

    for(let item of cards) {
        const offset = item.offsetTop-screen.height/4;
        const my_scroll = window.scrollY;
        
        if (my_scroll > offset) {
            item.classList.remove('card-right');
            item.classList.add('card-right-new');
        }
    }
    
});

/*window.addEventListener('scroll', function() {
    this.classList.remove('card-right');
    this.classList.add('card-right-new');
});*/

/*for (card of cards) {
    card.addEventListener("mouseover", function() {
        this.classList.remove('card-left');
        this.classList.add('card-left-new');
    });
}*/

/*cards = document.querySelectorAll(".card-right");

for (card of cards) {
    card.addEventListener("mouseover", function() {
        this.classList.remove('card-right');
        this.classList.add('card-right-new');
    });
}*/


let months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
let days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

let date = new Date()
console.log(date)
console.log(date.getDate())
console.log(date.getMonth()+1)
console.log(months[date.getMonth()])
console.log(date.getFullYear())

console.log(days[date.getDay()])

console.log(date.getHours())
console.log(date.getMinutes())
console.log(date.getSeconds())
console.log(date.getMilliseconds())

function addZero(number) {
    if (number < 10) {
        return '0' + number
    }
    else {
        return '' + number
    }
}


let finalDate = new Date(2022,3,20,10,23)

let timer = setInterval(function(){
    let currentDate = new Date()
    let diff = finalDate - currentDate

    let days = Math.round(diff/1000/60/60/24)
    let hours = Math.round(diff/1000/60/60)%24
    let minutes = Math.round(diff/1000/60)%60
    let seconds = Math.round(diff/1000)%60

    document.querySelector("#days").innerHTML = days
    document.querySelector("#hours").innerHTML = hours
    document.querySelector("#minutes").innerHTML = addZero(minutes)
    document.querySelector("#seconds").innerHTML = addZero(seconds)

    if (diff<=0) {
        clearInterval(timer)
        document.querySelector("#days").innerHTML = ''
        document.querySelector("#hours").innerHTML = ''
        document.querySelector("#minutes").innerHTML = ''
        document.querySelector("#seconds").innerHTML = ''
        alert('Sale is over')
    }

}, 1000)

console.log(finalDate)

let products = document.querySelectorAll(".btn-item")

for (let product of products) {
    product.addEventListener("click", function(){
        this.parentElement.style = "background-color: pink"
        let itemID = this.parentElement.dataset.id
        let itemName = this.parentElement.querySelector("h3").innerHTML
        let itemPrice = this.parentElement.querySelector(".price").innerHTML
        // let itemCnt

        let items = JSON.parse(localStorage.getItem('cart')) || {}

        if (items[itemID]) {
            items[itemID].cnt ++
        }
        else {
            
            let item = items[itemID] || {
                "name": itemName,
                "price": itemPrice,
                "cnt": 1
            }

            items[itemID] = item
        }
        
        localStorage.setItem('cart', JSON.stringify(items))
    })
}

let elements = document.querySelectorAll(".element")
for (let element of elements) {
    element.addEventListener('focus', function(){
        this.style = "background-color: lightblue; border-color: orange; border-width: 3px;"
    })

    element.addEventListener('blur', function(){
        this.style = "background-color: white; border-color: blue; border-width: 1px;"
    })

    element.addEventListener('change', function(){
        document.querySelector("#show").innerHTML = `Имя поля: ${this.name}
                                                    <br>Значение поля: ${this.value}
                                                    <br> Тип поля: ${this.type}
                                                    <br> Форма: ${this.form.name}`
        
        // if (this.name == 'email') {
        //     if (this.value.indexOf("@") == -1) {
        //         alert('Email введен неверно!')
        //     }
        // }
    })
}

// function validate() {
//     let elements = form1.elements
//     for (let element of elements) {
//         if (element.value == "") {
//             alert(`Поле ${element.name} должно быть заполнено!`)
//             return false
//         }
//     }

//     return true
// }

// form1.submit.onclick = function(){
//     return validate()
// }

let buttons = document.querySelectorAll(".cart-window-close")
for (let button of buttons) {
    button.addEventListener("click", function(){
        document.querySelector("#cart-background-window").style = "display:none"
    })
}

document.querySelector("#cart").addEventListener('click', function(){

    let cart = JSON.parse(localStorage.getItem("cart"))
    let tableInner = "<tr><td>Наименование товара</td><td>Цена</td><td>Количество</td></tr>"

    // cons

    for (let item in cart) {
        tableInner += `<tr data-id="${item}">
                            <td width="70%">${cart[item]["name"]}</td>
                            <td width="15%">${cart[item]["price"]} р.</td>
                            <td width="15%"><span>${cart[item]["cnt"]}</span>
                                <img src="img/plus.png" width = "20px" class="item-add">
                                <img src="img/minus.png" width = "17px" class="item-remove">
                            </td>
                        </tr>`
    }


    document.querySelector("#cart-table").innerHTML = tableInner
    document.querySelector("#cart-total-sum").querySelector('span').innerHTML = calculateTotalSum()
    document.querySelector("#cart-background-window").style = "display:block"

    if (calculateTotalSum() != 0) {
        document.querySelector('#cart-clear-message').style.display="none"
        document.querySelector('#cart-total-sum').style.display="block"
        document.querySelector('#cart-table').style.display="block"
    }

    let items = document.querySelectorAll('.item-remove')
    
    for (let item of items) {
        item.addEventListener('click', function(){
            let itemID = this.parentElement.parentElement.dataset.id
            if (cart[itemID]["cnt"] > 1) {
                cart[itemID]["cnt"]--
                localStorage.setItem('cart', JSON.stringify(cart))
                this.parentElement.querySelector('span').innerHTML = cart[itemID]["cnt"]
            }
            else {
                delete cart[itemID]
                localStorage.setItem('cart', JSON.stringify(cart))
                this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement)
            }

            document.querySelector("#cart-total-sum").querySelector('span').innerHTML = calculateTotalSum()

            if (calculateTotalSum() == 0) {
                localStorage.removeItem('cart')
                document.querySelector('#cart-table').innerHTML = ''
                document.querySelector('#cart-clear-message').style.display="block"
                document.querySelector('#cart-total-sum').style.display="none"
                document.querySelector('#cart-table').style.display="none"
            }
        })
       
    }

    items = document.querySelectorAll('.item-add')

    for (let item of items) {
        item.addEventListener('click', function(){
            let itemID = this.parentElement.parentElement.dataset.id
            if (cart[itemID]["cnt"] < 10) {
                cart[itemID]["cnt"]++
                localStorage.setItem('cart', JSON.stringify(cart))
                this.parentElement.querySelector('span').innerHTML = cart[itemID]["cnt"]
            }

            document.querySelector("#cart-total-sum").querySelector('span').innerHTML = calculateTotalSum()
        })
    }

    document.querySelector('#cart-clear').addEventListener('click', function(){
        localStorage.removeItem('cart')
        document.querySelector('#cart-table').innerHTML = ''
        document.querySelector('#cart-clear-message').style.display="block"
        document.querySelector('#cart-total-sum').style.display="none"
        document.querySelector('#cart-table').style.display="none"
    })

})

function calculateTotalSum() {
    let cart = JSON.parse(localStorage.getItem('cart'))
    let totalSum = 0
    for (let item in cart) {
        totalSum += Number(cart[item]["price"])*Number(cart[item]["cnt"])
    }

    return totalSum
}

document.querySelector('#buy-button').addEventListener('click', function(){
    form.cart.value = localStorage.getItem('cart')
    alert(form.cart.value)
    form.submit()
})