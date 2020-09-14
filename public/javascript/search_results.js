let category = "";
let store = 0;
const showStoreResults = async function (event) {
    store = event.target.value;
    let categoryQuery;
    if(category === ""){
        categoryQuery = "";
    }
    else{
        categoryQuery = "&category="+category;
    }
    
    
   
    let storeId = event.target.value
    let response = await fetch('/api/products/filtered?store_id=' + storeId+categoryQuery);
    let products = await response.json();
    var x = await document.getElementsByClassName("title-text");
    for (let i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    for (let u = 0; u < products.length; u++) {
        let node = document.createElement('LI');
        let textnode = document.createTextNode(
            products[u].product_name + " " + "$" + products[u].price + " " + "(" + products[u].rating + "out of 5)"
        )
        node.classList.add("title-text");
        node.appendChild(textnode);
        document.getElementById("productsOnLoad").appendChild(node);
    };

}

document.querySelector('#storeNames').addEventListener('change', showStoreResults);



const showCategoryResults = async function (event) {
let storeQuery;
    if(store === 0){
        storeQuery = "";
    }
    else{
    storeQuery = "&store_id="+store;
    }
    
    category = event.target.value;
    let categoryName = event.target.value
    let response = await fetch('/api/products/filtered?category=' + categoryName+storeQuery);
    let products = await response.json();
    var x = await document.getElementsByClassName("title-text");
    for (let i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    for (let u = 0; u < products.length; u++) {
        let node = document.createElement('LI');
        let textnode = document.createTextNode(
            products[u].product_name + " " + "$" + products[u].price + " " + "(" + products[u].rating + "out of 5)"
        )
        node.classList.add("title-text");
        node.appendChild(textnode);
        document.getElementById("productsOnLoad").appendChild(node);
    };

}

document.querySelector('#categoryNames').addEventListener('change', showCategoryResults);