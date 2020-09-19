async function newFormHandler(event) {
  event.preventDefault();
  showSpinner($(this));
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1];

  const product_name = document.querySelector('input[name="product-name"]').value;
  const description = document.querySelector('input[name="description"]').value;
  const size = document.querySelector('input[name="size"]').value;
  const price = document.querySelector('input[name="price"]').value;
  const rating = document.querySelector('input[name="rating"]').value;

  const response = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      product_name,
      description,
      size,
      price,
      rating
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
