const deletethisProduct = async function() {
  showSpinner($(this));
    const product_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
      
      const response = await fetch(`/api/products/${product_id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          product_id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
          console.log("Product deleted");
          console.log(response);
        document.location.replace(`/product`);
      } else {
          console.log("product not deleted");
        alert(response.statusText);
      }
}



document
  .querySelector("#deleteProductButton")
  .addEventListener("click", deletethisProduct);