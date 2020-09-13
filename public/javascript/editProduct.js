async function newFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1];

    const product_name = document.querySelector('input[name="product-name"]').value;
    const category = document.querySelector('input[name="product-category"]').value;
    const description = document.querySelector('input[name="description"]').value;
    const size = document.querySelector('input[name="size"]').value;
    const price = document.querySelector('input[name="price"]').value;
    const rating = document.querySelector('input[name="rating"]').value;
    //temporary user-id field until log-in function is complete
    // const user_id = document.querySelector('input[name="user-id"]').value;
    // const store = document.querySelector('input[name="store"]').value;
    //temporary store_id field
    const store_id = document.querySelector('input[name="store-id"]').value;

    const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          product_name,
          category,
          description,
          size,
          price,
          rating,
          store_id
        //   store
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
          console.log("Product updated");
          console.log(response);
        document.location.replace(`/product/view/${id}`);
      } else {
          console.log("product not updated");
        alert(response.statusText);
      }
    }
    
    document.querySelector('.edit-product-form').addEventListener('submit', newFormHandler);
