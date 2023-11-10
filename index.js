let myStores = [];
const inputEl = document.getElementById("input-el");
const buttonEl = document.getElementById("button-el");
const ulEl = document.getElementById("ul-el");
const storesFromLocalStorage = JSON.parse(localStorage.getItem("myStores"));
const tabBtn = document.getElementById("buttonTab");

if(storesFromLocalStorage){
    myStores = storesFromLocalStorage;
    render(myStores);
}

tabBtn.addEventListener("click",function(){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myStores.push(tabs[0].url);
        localStorage.setItem("myStores", JSON.stringify(myStores));
        render(myStores);
    })
})

function render(stores) {

    let listItems = "";
    for(let i = 0; i < stores.length; i++) {
        // listItems += "<li><a target='_blank' href='" + myStores[i] +"'>" + myStores[i] + "</a></li>";
        listItems += `
        <li>
            <a target='_blank' href='${stores[i]}'>
                ${stores[i]}
            </a>
        </li>
        `;
    }
    ulEl.innerHTML = listItems;
}

buttonDel.addEventListener("dblclick", function(){
    localStorage.clear();
    myStores = [];
    render(myStores);
});

buttonEl.addEventListener("click", function(){
    myStores.push(inputEl.value);
    inputEl.value = "";
    
    localstorage = localStorage.setItem("myStores",JSON.stringify(myStores)); 

    render(myStores);
});

function enterele(event) {

    if(event.key === 'Enter'){
        myStores.push(inputEl.value);
        inputEl.value = "";

        localstorage = localStorage.setItem("myStores",JSON.stringify(myStores));
        
        render(myStores);
    }
}

