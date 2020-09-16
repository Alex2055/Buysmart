async function newFormHandler(event) {
    event.preventDefault();

    const product_name = document.querySelector('input[name="product-name"]').value;
    const category = document.querySelector('input[name="product-category"]').value;
    const description = document.querySelector('input[name="description"]').value;
    const size = document.querySelector('input[name="size"]').value;
    const price = document.querySelector('input[name="price"]').value;
    const rating = document.querySelector('input[name="rating"]').value;
    const store_id = document.querySelector('select[name="store-id"]').value;

    const response = await fetch(`/api/products`, {
        method: 'POST',
        body: JSON.stringify({
          product_name,
          category,
          description,
          size,
          price,
          rating,
          store_id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
          console.log("Product added");
          console.log(response);
        document.location.replace('/product');
      } else {
          console.log("product not added");
        alert(response.statusText);
      }
    }
    
    document.querySelector('.add-product-form').addEventListener('submit', newFormHandler);
