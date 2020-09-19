async function newFormHandler(event) {
    event.preventDefault();

    const category_name = document.querySelector('input[name="category-name"]').value;
    if (category_name === '') {
      window.alert('Please enter category name')
    }
    else{
      showSpinner($(this));
    const response = await fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify({
          category_name
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      if (response.ok) {
          console.log("Category added");
          console.log(response);
        document.location.reload();
      } else {
          console.log("Category not added");
        alert(response.statusText);
      }
    }
  }
    document.querySelector('.add-category-form').addEventListener('submit', newFormHandler);  