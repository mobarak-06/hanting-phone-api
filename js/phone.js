const loadPhone = async (inputText = 13, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${inputText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");

  //    display show all button if there are more than 12
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  phoneContainer.textContent = "";
  console.log("show all", isShowAll);
  //    display only 12 phones
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card bg-gray-100 p-4 shadow-xl";
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button onclick = "handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });

  //   hide loading spinner
  toggleLoadingSpinner(false);
};

// handle search btn
const handleSearch = (isShowAll) => {
  const inputField = document.getElementById("search-field");
  const inputText = inputField.value;
  console.log(inputText);
  toggleLoadingSpinner(true);
  loadPhone(inputText, isShowAll);
};

// const handleSearch2 = () =>{
//     const searchInput = document.getElementById('search-field2');
//     const searchText = searchInput.value;
//     toggleLoadingSpinner(true);
//     loadPhone(searchText)
// }

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const handleShowDetails = async (id) => {
  console.log(id);
  //
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  // console.log(data);
  const phone = data.data;

  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);

  const phoneName = document.getElementById("phone-name");
  phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById(
    "show-details-container"
  );
  showDetailsContainer.innerHTML = `
   <img src="${phone.image}" alt="">
   <p><span>storage:</span> ${phone.mainFeatures?.storage}</p>
   <p><span>Display Size:</span> ${phone.mainFeatures?.displaySize}</p>
   <p><span>Chipset:</span> ${phone.mainFeatures?.chipSet}</p>
   <p><span>Slug:</span> ${phone.slug}</p>
   <p><span>Release data:</span> ${phone.releaseDate}</p>
   <p><span>Brand:</span> ${phone.brand}</p>
   <p><span>GPS:</span> ${phone?.others?.GPS || 'NO GPS AVAILABLE'}</p>
   <p><span>GPS:</span> ${phone?.others?.GPS ? phone?.others.GPS: 'no gps available in this device'}</p>
   
   
   `;

  // show the modal
  show_details_modal.showModal();
};

const handleShowAll = () => {
  handleSearch(true);
};

loadPhone();
