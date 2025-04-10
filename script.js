var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("ProductImage");
var productSelect = document.getElementById("productSelect");
var displayProductss = document.getElementById("col-display");
var searchBtn = document.getElementById("searchBtn");
var addProductButton = document.getElementById("addProductButton");
var updateProductButton = document.getElementById("updateProductButton");
var updateProductIndex;
var NameRegex = /^[A-Z].+$/;
var PriceRegex = /^[1-9]+[0-9]*$/;
var CategoryRegex = /(^phone|Camera|Tv|LabTop|Mobile|Watch)$/;

var products = [];
if (localStorage.getItem("myProducts")) {
  products = localStorage.getItem("myProducts");
  products = JSON.parse(products);
  displayProducts(products);
}

function AddProduct() {
  if (
    ValidProductInput(NameRegex, productName) &&
    ValidProductInput(PriceRegex, productPrice) &&
    productImage.files[0]
  ) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      description: productDescription.value,
      image: productImage.files[0].name,
      category: productSelect.value,
    };
    products.push(product);
    localStorage.setItem("myProducts", JSON.stringify(products));
    // console.log(products);
    resetProduct();
    displayProducts(products);
  } else {
    alert("Please enter valid data");
  }
}
function resetProduct() {
  productName.value = null;
  productPrice.value = null;
  productDescription.value = null;
  productSelect.value = null;
  productImage.value = null;
}
function displayProducts(arr) {
  displayProductss.innerHTML = "";
  for (var i = 0; i < arr.length; i++) {
    displayProductss.innerHTML += `
                            <div class="g-3">
            <div class="col border shadow-sm">
              <div class="image">
                <img
                  src="assets/${arr[i].image}"
                  alt=""
                  class="w-100 h-75 overflow-hidden object-fit-contain"
                />
              </div>
              <div class="text p-2">
                <h3>${arr[i].name}</h3>
                <p>${arr[i].description}</p>
                <p>${arr[i].category}</p>
                <div class="icon d-flex justify-content-between">
                  <p>${arr[i].price}</p>
                  <div class="icons">
                    <i class="fa-solid fa-trash-can text-danger fs-4" onclick="DeleteItem(
                    ${
                      products.length == arr.length ? i : arr[i].ElementIndex
                    })" id="DeleteItem"></i>
                    <i class="fa-solid fa-pen-to-square fs-4" onclick="GetProduct(${i})"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
                    
        `;
  }
}

function DeleteItem(index) {
  products.splice(index, 1);
  localStorage.setItem("myProducts", JSON.stringify(products));
  searchBtn.value = null;
  displayProducts(products);
}

function SearchProduct(trim) {
  var search = trim.toLowerCase();
  var searchItems = [];
  for (var i = 0; i < products.length; i++) {
    if (
      products[i].name.toLowerCase().includes(search) ||
      products[i].category.toLowerCase().includes(search)
    ) {
      products[i].ElementIndex = i;
      searchItems.push(products[i]);
    }
  }
  displayProducts(searchItems);
}

function GetProduct(index) {
  productName.value = products[index].name;
  productPrice.value = products[index].price;
  productDescription.value = products[index].description;
  // var productImage.value = products[index].image;
  productSelect.value = products[index].category;
  addProductButton.classList.replace("d-block", "d-none");
  updateProductButton.classList.replace("d-none", "d-block");
  updateProductIndex = index;
}
function Update() {
  products[updateProductIndex].name = productName.value;
  products[updateProductIndex].price = productPrice.value;
  products[updateProductIndex].description = productDescription.value;
  products[updateProductIndex].category = productSelect.value;
  if (productImage.files[0]) {
    products[updateProductIndex].image = productImage.files[0].name;
  }
  localStorage.setItem("myProducts", JSON.stringify(products));
  addProductButton.classList.replace("d-none", "d-block");
  updateProductButton.classList.replace("d-block", "d-none");
  displayProducts(products);
  resetProduct();
}

function ValidProductInput(regex, ele) {
  if (regex.test(ele.value)) {
    ele.classList.remove("is-invalid");
    ele.classList.add("is-valid");
    ele.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    ele.classList.remove("is-valid");
    ele.classList.add("is-invalid");
    ele.nextElementSibling.classList.replace("d-none", "d-block");

    return false;
  }
}
