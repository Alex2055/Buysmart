async function newFormHandler(event) {
    event.preventDefault();
    const store_name = document.querySelector('input[name="store-name"]').value;
    const city = document.querySelector('input[name="city"]').value;
    const state = document.querySelector('input[name="state"]').value;
    const zip = document.querySelector('input[name="zip"]').value;

    if (store_name === "") {
      window.alert('Please enter Store name')
    }
    else if(city === ""){
      window.alert('Please enter City name')
    }
    else if(state === ""){
      window.alert('Please enter the state')
    }
    else if(zip === ""){
      window.alert('Please enter zip code')
    }
    else{
    showSpinner($(this));
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
  }
    document.querySelector('.add-store-form').addEventListener('submit', newFormHandler);  