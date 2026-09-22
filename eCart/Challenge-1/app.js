// ==============================
// GET ALL PRODUCTS
// ==============================

let products = [];

for (let category of storeData.categories) {

    for (let subcategory of category.subcategories) {

        for (let product of subcategory.products) {

            products.push(product);

        }
    }
}


// ==============================
// GET HTML ELEMENTS
// ==============================

let productsContainer =
    document.getElementById("productsContainer");

let searchBtn =
    document.getElementById("searchBtn");

let showAllBtn =
    document.getElementById("showAllBtn");

let priceInput =
    document.getElementById("priceInput");

let productsTitle =
    document.getElementById("productsTitle");

let productsSubtitle =
    document.getElementById("productsSubtitle");

let productCount =
    document.getElementById("productCount");


// ==============================
// DISPLAY PRODUCTS
// ==============================

function displayProducts(productList) {

    productsContainer.innerHTML = "";

    productCount.textContent =
        productList.length + " Products";


    for (let product of productList) {

        productsContainer.innerHTML += `

            <div class="product-card">

                <div class="product-image">
                    🛒
                </div>

                <h3>${product.name}</h3>

                <p class="brand">
                    Brand: ${product.brand}
                </p>

                <p class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <p class="rating">
                    ⭐ ${product.rating}
                </p>

                <p class="reviews">
                    ${product.reviews} Reviews
                </p>

                <button>
                    View Product
                </button>

            </div>

        `;
    }
}


// ==============================
// SHOW ALL PRODUCTS ON PAGE LOAD
// ==============================

displayProducts(products);


// ==============================
// SEARCH FUNCTION
// ==============================

function searchProducts() {

    let targetPrice = Number(priceInput.value);


    // If input is empty
    if (priceInput.value === "") {

        displayProducts(products);

        productsTitle.textContent =
            "All Products";

        productsSubtitle.textContent =
            "Explore all available products";

        return;
    }


    // Store products with price difference
    let result = [];


    for (let product of products) {

        let difference =
            Math.abs(product.price - targetPrice);

        result.push({

            product: product,

            difference: difference

        });
    }


    // Sort according to price difference
    result.sort(function (a, b) {

        return a.difference - b.difference;

    });


    // Get closest 3 products
    let closestProducts =
        result.slice(0, 3);


    // Create product list
    let closestProductList =
        closestProducts.map(function (item) {

            return item.product;

        });


    // Display closest products
    displayProducts(closestProductList);


    productsTitle.textContent =
        "Closest Products";

    productsSubtitle.textContent =
        "Products closest to ₹" +
        targetPrice.toLocaleString("en-IN");
}


// ==============================
// SEARCH BUTTON
// ==============================

searchBtn.addEventListener("click", function () {

    searchProducts();

});


// ==============================
// ENTER KEY
// ==============================

priceInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        searchProducts();

    }

});


// ==============================
// SHOW ALL BUTTON
// ==============================

showAllBtn.addEventListener("click", function () {

    priceInput.value = "";

    displayProducts(products);

    productsTitle.textContent =
        "All Products";

    productsSubtitle.textContent =
        "Explore all available products";

});