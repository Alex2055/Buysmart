async function newFormHandler(event) {
  event.preventDefault();
  const product_name = document.querySelector('input[name="product-name"]').value;
  const category_id = document.querySelector('select[name="category-id"]').value;
  const description = document.querySelector('input[name="description"]').value;
  const size = document.querySelector('input[name="size"]').value;
  const price = document.querySelector('input[name="price"]').value.toString();
  const rating = document.querySelector('input[name="rating"]').value;
  const store_id = document.querySelector('select[name="store-id"]').value;

  if (store_id === ' ') {
    window.alert('Please choose the Store name')
    
  }
  else if (category_id === ' ') {
    window.alert('Please choose the category')
  }

  else if (product_name === "") {
    window.alert('Please enter product name')
  }
  else if (description === "") {
    window.alert('Please enter description')
  }
  else if (size === "") {
    window.alert('Please enter size of the product')
  }
  else if (price === "") {
    window.alert('Please enter price')
  }
  else if (rating === "") {
    window.alert('Please add rating')
  }


  else {
    showSpinner($(this));
    const response = await fetch(`/api/products`, {
      method: 'POST',
      body: JSON.stringify({
        product_name,
        category_id,
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
      console.log(response.statusText);
      window.alert('Some information is missing. Please try again')
      document.location.replace('/product/add');
    }
  }
}
document.querySelector('.add-product-form').addEventListener('submit', newFormHandler);
