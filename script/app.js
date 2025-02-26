let products = [
    {
        id: 1,
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        quantity: 0,
        get totalSum() {
            return this.price * this.quantity
        }
    },
    {
        id: 2,
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        quantity: 0,
        get totalSum() {
            return this.price * this.quantity
        }
    },
    {
        id: 3,
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        quantity: 0,
        get totalSum() {
            return this.price * this.quantity
        }
    },
    {
        id: 4,
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        quantity: 0,
        get totalSum() {
            return this.price * this.quantity
        }
    },
    {
        id: 5,
        name: 'Super Burger',
        price: 50000,
        img: 'https://www.southernliving.com/thmb/H04pCVJ5bLAnwPs2hFCmpNs5Uec=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ultimate-southern-burger_batch64_beauty01-86-b9c26e256dd34e39b6c0cfb0c02a9fef.jpg',
        quantity: 0,
        get totalSum() {
            return this.price * this.quantity
        }
    },
]

const wrapperList = document.querySelector('.wrapper__list')

function createBurger() {
    
    products.forEach((item)  => {
        let { name, img,price, id } = item
        
        wrapperList.innerHTML += `<div class="wrapper__list-card" id="${id}">
                <p class="wrapper__list-count"></p>
                <img class="wrapper__list-image" src="${img}" alt="">
                <h3 class="wrapper__list-title">${name}</h3>
                <div class="wrapper__list-sub">
                    <p class="wrapper__list-text">${price} сум</p>
                    <button class="wrapper__list-btn"><img src="images/sell-icon.svg" alt=""></button>
                </div>
            </div>`
    })
}
createBurger()


const   burgerBtns = document.querySelectorAll('.wrapper__list-btn'),
        cartBtn    = document.querySelector('.wrapper__navbar-btn'),
        basket     = document.querySelector('.wrapper__navbar-basket'),
        closeBtn   = document.querySelector('.wrapper__navbar-close'),
        basketCount = document.querySelector('.warapper__navbar-count'),
        basketPrice = document.querySelector('.wrapper__navbar-totalprice'),
        basketList  = document.querySelector('.wrapper__navbar-checklist')
        
let korzina = []
        
cartBtn.addEventListener('click', () => basket.classList.add('active'))
closeBtn.addEventListener('click', () => basket.classList.remove('active'))

burgerBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        addQuantity(btn)
    })
})

function addQuantity(btn) {
    // closest() - метод который подключаеться к ближайшему указанному родителю
    // getAttribute() - получает значение указаного атрибута
    let id = btn.closest('.wrapper__list-card').getAttribute('id')
    let burger = products.find((item) => item.id == id)
    burger.quantity < 10 ? burger.quantity++ : alert('Слишком много бургеров')  
    addToKorzina(burger)
    outPriceAndCount()
    outBasketList()
}

function addToKorzina(burger) {
    if(burger.quantity > 0) {
        if(!korzina.includes(burger)) {
            korzina.push(burger)
        }
    }
}

function outPriceAndCount() {
    basketPrice.innerHTML = totalPrice()
    let AllQuantity = totalQuantity()
    if(AllQuantity > 0) {
        basketCount.classList.add('active')
        basketCount.innerHTML = AllQuantity
    }else {
        basketCount.classList.remove('active')
        basketCount.innerHTML = ''
    }
}

function totalPrice() {
    let sum = 0
    products.forEach((item) => {
        sum += item.totalSum
    })
    return sum + 'сумм'
}

function totalQuantity() {
    let sum = 0
    products.forEach((item) => {
        sum += item.quantity
    })
    return sum
}


function outBasketList () {
    basketList.innerHTML = ''
    korzina.forEach((burger) => {
        basketList.innerHTML += `<div class="navbar__item">
            <div class="navbar__item-left">
                <img src="${burger.img}" alt="">
                <div class="navbar__item-left-info">
                    <p class="navbar__item-left-name">${burger.name}</p>
                    <p class="navbar__item-left-price">${burger.price} сум</p>
                </div>
            </div>
            <div class="navbar__item-right">
                <button data-symbol="-" class="navbar__item-btn">-</button>
                <output class="navbar__item-count">${burger.quantity}</output>
                <button data-symbol="+" class="navbar__item-btn">+</button>
            </div>
        </div> `
    })
}


window.addEventListener('click', (event) => {
    if(event.target.classList.contains('navbar__item-btn')) {
        let btn = event.target
        let burgerName = btn.closest('.navbar__item').querySelector('.navbar__item-left-name').innerHTML
        let burgerObj = products.find((item) => item.name == burgerName)
        if(btn.getAttribute('data-symbol') == '+') {
            burgerObj.quantity++
        }else {
            burgerObj.quantity--
        }
        korzina = korzina.filter((item) => item.quantity > 0)
        outBasketList()
        outPriceAndCount()
        
        
    }
    
})

let title = document.querySelector('.title')
function rise() {
    if(title.innerHTML < 100){
        title.innerHTML++
        setTimeout(() => rise(), 50);
        if (title.innerHTML == 0) {
            body.style.background = 'white'
    }else if(title.innerHTML == 100){
        title.innerHTML = '100 LVL'
        title.style.fontSize = '50px'
    }
  }
}

rise()