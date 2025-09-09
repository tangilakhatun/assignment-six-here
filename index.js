
let cart = [];

const loadAllPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => displayAllPlants(data.plants));
};

const displayAllPlants = (plants) => {
  const cardsContainer = document.getElementById("Cards-container");
  cardsContainer.innerHTML = "";
  for (let plant of plants) {
    const { category, description, id, image, name, price } = plant;

    const div = document.createElement("div");
    div.className = "card bg-white p-2 shadow-md";

    div.innerHTML = `
            <img
              src="${image}"
              alt=""
              srcset=""
              class="h-[200px] object-cover"
            />
            <div class="my-4">
              <div class="card-des my-3 ">
                <h2 class="font-bold cursor-pointer" onclick="loadDetails(${id})">${name}</h2>
                <p>${description.slice(0, 70)}</p>
              </div>
              <div class="flex justify-between my-3 font-bold">
                <p class="px-2 py-1 bg-green-300 rounded-full">${category}</p>
                <p>৳${price}</p>
              </div>
              <button onclick="displayCart('${name}',${price},${id})" class="btn w-full rounded-full text-white bg-[#15803D]">
                Add to cart
              </button>
            </div>
        `;
    cardsContainer.append(div);
  }
  manageLoader(false);
};

// load categories start hear

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("category");
  categories.innerHTML = "";
  for (let category of categories) {
    const { category_name, id } = category;
    const div = document.createElement("div");
    div.innerHTML = `
    <button onclick="loadCategory(${id})" class="btn btn-tree w-10/12 hover:bg-green-400" id="category${id}">${category_name} <button>    `;
    categoriesContainer.append(div);
  }
};

const loadCategory = (id) => {
  removeClass("btn-tree");
  const clickedBtn = document.getElementById(`category${id}`);
  clickedBtn.classList.add("active");
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  manageLoader(true);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displaySpecificCategory(data.plants);
    });
};

const displaySpecificCategory = (categoryData) => {
  displayAllPlants(categoryData);
};

const loadDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetails(data.plants));
};

const displayDetails = (details) => {
  const { name, image, description, price, category } = details;
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
  
    <img
              src="${image}"
              alt=""
              srcset=""
              class="w-full h-[200px] object-cover"
            />
            <div class="my-4">
              <div class="card-des my-3 ">
                <h2 class="font-bold cursor-pointer">${name}</h2>
                <p>${description}</p>
              </div>
              <div class="flex justify-between my-3 font-bold">
                <p class="px-2 py-1 bg-green-300 rounded-full">${category}</p>
                <p>৳${price}</p>
              </div>

  `;
  document.getElementById("my_modal_5").showModal();
};

function removeClass(className) {
  const allBtn = document.getElementsByClassName(className);
  for (let btn of allBtn) {
    btn.classList.remove("active");
  }
}


const displayCart = (name, price, id) => {
  alert(`${name} added to the cart`);

  const treeInfo = {};
  const totalPrice = document.getElementById("price-continer");
  totalPrice.classList.remove("hidden");
  treeInfo.name = name;
  treeInfo.price = price;
  treeInfo.id = id;

  cart.push(treeInfo);

  dataAddToCart(cart);
};

const dataAddToCart = (carts) => {
  const totalPricefield = document.getElementById("price-continer");
  totalPricefield.classList.remove("hidden");
  if (carts.length === 0) {
    totalPricefield.classList.add("hidden");
  }
  const cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = "";
  const totalPrice = document.getElementById("total-price");
  let total = 0;
  for (let cart of carts) {
    const { name, price, id } = cart;
    total += price;
    const div = document.createElement("div");
    div.className = "mb-3 bg-gray-300 flex justify-between items-center";
    div.innerHTML = `
    <div class="">
    <h2>${name}</h2>
    <h2>${price}</h2>
    </div>
    <button onclick="cartFilter(${id})" class="btn font-bold text-red-600">X</button>
    `;
    cartContainer.append(div);
  }
  totalPrice.innerText = total;
};

const cartFilter = (id) => {
  cart = cart.filter((item) => item.id !== id);
  dataAddToCart(cart);
};

function manageLoader(status) {
  const spinner = document.getElementById("loader");
  const cardsContainer = document.getElementById("Cards-container");
  if (status === true) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
}
loadCategories();
loadAllPlants();
