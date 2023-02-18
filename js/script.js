const main = document.querySelector('.main');
const addUserBtn = document.querySelector('.add-user');
const doubleMoneyBtn = document.querySelector('.double-money');
const showMillonairesBtn = document.querySelector('.show-millonaires');
const sortBtn = document.querySelector('.sort');
const calcWealth = document.querySelector('.calc-wealth');


let usersData = [
    {
        name :"Aya Rabee",
        money : 232870
    }
];

// fech random user and add money
async function creatUser(){
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const user = data.results[0];
    const newUser = 
    {
        name : `${user.name.first} ${user.name.last}`,
        money : Math.floor((Math.random() * 1000000))
    }
    usersData.push(newUser);
    updateDom();
}

// display data in dom
function updateDom(providesData = usersData){
    // clear main div
    main.innerHTML =`<h2 class="title">Person
    <strong>Wealth</strong>
    </h2>`;

    providesData.forEach(user => {
        const htmlEl = `<p class="person">
        ${user.name}<span class="money">${changeFormat(user.money)}$</span></p>`;
        main.insertAdjacentHTML('beforeend', htmlEl);
    });
}

function doubleMoney(){
    usersData = usersData.map(user => {
        return { ...user, money: user.money * 2}
    })
    updateDom();
}

function showMillionaires(){
    usersData = usersData.filter((user)=>{
        return user.money > 1000000;
    });
    updateDom();
}

function sumWealth(){
    const sumWealth = usersData.reduce((acc, user) => acc + user.money, 0);
    const htmlEl = `<div class="wealth">
    <p>Total Wealth :</p>
    <p>${changeFormat(sumWealth)}$</p>
    </div>`;

    main.insertAdjacentHTML('beforeend', htmlEl);
}

function sortData(){
    usersData.sort((a, b) => {
        return b.money - a.money;
    })
    updateDom();
}

// format number as moneny
function changeFormat(money){
    return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addUserBtn.addEventListener('click', creatUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortData);
showMillonairesBtn.addEventListener('click', showMillionaires);
calcWealth.addEventListener('click', sumWealth);