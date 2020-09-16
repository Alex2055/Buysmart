async function newFormHandler(event) {
    event.preventDefault();

    const store_name = document.querySelector('input[name="store-name"]').value;
    const city = document.querySelector('input[name="city"]').value;
    const state = document.querySelector('input[name="state"]').value;
    const zip = document.querySelector('input[name="zip"]').value;

    const response = await fetch('/api/stores', {
        method: 'POST',
        body: JSON.stringify({
          store_name,
          city,
          state,
          zip
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      if (response.ok) {
          console.log("Store added");
          console.log(response);
        document.location.reload();
      } else {
          console.log("Store not added");
        alert(response.statusText);
      }
    }
    
    document.querySelector('.add-store-form').addEventListener('submit', newFormHandler);  