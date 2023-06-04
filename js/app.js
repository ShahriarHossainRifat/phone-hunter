const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  const response = await fetch(url)
  const data = await response.json()
  displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit) => {
  document.getElementById('phones-container').innerHTML = '';
  // display 12 phones only
  if (dataLimit && phones.length > 12) {
    phones = phones.slice(0, 12);
    document.getElementById('show-all').classList.remove('hidden');
  }
  else {
    document.getElementById('show-all').classList.add('hidden');
  }

  // display no phones found
  if (phones.length === 0) {
    document.getElementById('no-result-found').classList.remove('hidden');
  }
  else {
    document.getElementById('no-result-found').classList.add('hidden');
  }

  // display all phones
  phones.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.innerHTML = `
      <div class="card card-side bg-accent shadow-xl">
        <figure><img src="${phone.image}" alt="Movie"/></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <div class="card-actions justify-end">
            <div class="badge badge-outline bg-secondary-content text-white">${phone.brand}</div> 
          </div>
          <div class="card-actions justify-end">
            <button id="${phone.slug}" class="btn btn-primary" onclick="detailsButtonOnClickFunctions('${phone.slug}')">Details</button>
          </div>
        </div>
      </div>
    `;
    document.getElementById('phones-container').appendChild(phoneCard);
  });

  // stop loading spinner
  toggleSpinner(false);
}

detailsButtonOnClickFunctions = (phoneSlug) => {
  phone_modal.showModal()
  loadPhoneDetails(phoneSlug)
}

loadPhoneDetails = async (phoneSlug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`
  const response = await fetch(url)
  const data = await response.json()
  console.log(data.data)

  document.getElementById('modal-phone-title').innerText = data.data.name;
  document.getElementById('modal-phone-brand').innerText = data.data.brand;
  document.getElementById('modal-phone-release-date').innerText = data.data.releaseDate;
  document.getElementById('modal-phone-chipset').innerText = data.data.mainFeatures.chipSet;
  document.getElementById('modal-phone-display-size').innerText = data.data.mainFeatures.displaySize;
  document.getElementById('modal-phone-memory').innerText = data.data.mainFeatures.memory;
  document.getElementById('modal-phone-storage').innerText = data.data.mainFeatures.storage;
  document.getElementById('modal-phone-sensors').innerText = data.data.mainFeatures.sensors;
}

const processSearch = (dataLimit) => {
  toggleSpinner(true);

  const userSearch = document.getElementById('search-field').value;
  loadPhones(userSearch, dataLimit);
}

document.getElementById('search-field').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    // start loading spinner
    processSearch(12);
  }
});

document.getElementById('search-button').addEventListener('click', function () {
  // start loading spinner
  processSearch(12);
})

const toggleSpinner = isLoading => {
  const spinnerSection = document.getElementById('spinner-section');
  if (isLoading) {
    spinnerSection.classList.remove('hidden');
  }
  else {
    spinnerSection.classList.add('hidden');
  }
}

// load all phones (not the best practice)
document.getElementById('show-all-button').addEventListener('click', function () {
  // start loading spinner
  processSearch();
})

// loadPhones()