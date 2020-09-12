async function newFormHandler(event) {
    event.preventDefault();

    const product_name = document.querySelector('input[name="product-name"]').value;
    const category = document.querySelector('input[name="product-category"]').value;
    const description = document.querySelector('input[name="description"]').value.trim;
    const size = document.querySelector('input[name="size"]').value.trim;
    const price = document.querySelector('input[name="price"]').value;
    const rating = document.querySelector('input[name="rating"]').value;
    //temporary user-id field until log-in function is complete
    const user_id = document.querySelector('input[name="user-id"]').value;
    // const store = document.querySelector('input[name="store"]').value;
    //temporary store_id field
    const store_id = document.querySelector('input[name="store-id"]').value;

    const response = await fetch(`/api/products`, {
        method: 'POST',
        body: JSON.stringify({
          product_name,
          category,
          description,
          size,
          price,
          rating,
          user_id,
          store_id
        //   store
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
          console.log("Product added");
          console.log(response);
        // document.location.replace('/search-view');
      } else {
          console.log("product not added");
        alert(response.statusText);
      }
    }
    
    document.querySelector('.add-product-form').addEventListener('submit', newFormHandler);
