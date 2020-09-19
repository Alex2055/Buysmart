
const showResults = async function (event) {

    let storeId = document.getElementById('storeNames').value;
    let category = document.getElementById('categoryNames').value;
    let queryString = '';

    if (storeId) {
        queryString = "store_id=" + storeId;
    }
    if (category) {
        if (queryString) {
            queryString = queryString + "&";
        }
        queryString = queryString + "category_id=" + category;
    }

    let response = await fetch('/api/products/filtered?' + queryString);
    let products = await response.json();
    var x = await document.getElementById('productsOnLoad');
    x.innerHTML = "";
    for (let u = 0; u < products.length; u++) {
        let nodediv = document.createElement('DIV')
        let node = document.createElement('TR');
        let nodea = document.createElement('A');
        let nodeone = document.createElement('TD');
        let nodetwo = document.createElement('TD');
        let textnodeone = document.createTextNode(products[u].product_name);
        let textnodetwo = document.createTextNode("$" + products[u].price);

        nodea.href = '/product/view/' + products[u].id;
        nodea.appendChild(textnodeone);
        nodeone.appendChild(nodea);
        node.appendChild(nodeone);
        nodetwo.appendChild(textnodetwo);
        node.appendChild(nodetwo);
        nodeone.appendChild(nodediv);

        for (let i = 0; i < 5; i++) {
            let nodespan = document.createElement('SPAN');
            nodespan.classList.add('fa');
            nodespan.classList.add('fa-star');
            if (products[u].rating > i) {
                nodespan.classList.add('checked');
            }
            nodediv.appendChild(nodespan);
        }

        document.getElementById("productsOnLoad").appendChild(node);
    };

}

document.querySelector('#storeNames').addEventListener('change', showResults);
document.querySelector('#categoryNames').addEventListener('change', showResults);




