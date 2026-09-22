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

let minPriceInput = document.getElementById("minPrice");

let maxPriceInput = document.getElementById("maxPrice");

let searchBtn = document.getElementById("searchBtn");

let productCount = document.getElementById("productCount");

let inventoryValue =
    document.getElementById("inventoryValue");

let priceRange =
    document.getElementById("priceRange");

let productsContainer =
    document.getElementById("productsContainer");


// ==============================
// SHOW PRODUCTS
// ==============================

function displayProducts(productList) {

    productsContainer.innerHTML = "";


    // No products found

    if (productList.length === 0) {

        productsContainer.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>
                    Try another price range.
                </p>
            </div>
        `;

        return;
    }


    // Display each product

    for (let product of productList) {

        let value =
            product.price * product.stock;


        productsContainer.innerHTML += `

            <div class="product-card">

                <h3>
                    ${product.name}
                </h3>

                <p class="brand">
                    Brand: ${product.brand}
                </p>

                <p class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <p class="stock">
                    Stock: ${product.stock}
                </p>

                <p class="inventory-value">
                    Inventory Value:
                    ₹${value.toLocaleString("en-IN")}
                </p>

            </div>

        `;
    }
}


// ==============================
// SEARCH PRODUCTS
// ==============================

function searchProducts() {

    let minPrice =
        Number(minPriceInput.value);

    let maxPrice =
        Number(maxPriceInput.value);


    // Check empty input

    if (
        minPriceInput.value === "" ||
        maxPriceInput.value === ""
    ) {

        alert("Please enter minimum and maximum price.");

        return;
    }


    // Check invalid range

    if (minPrice > maxPrice) {

        alert(
            "Minimum price cannot be greater than maximum price."
        );

        return;
    }


    let matchingProducts = [];

    let totalInventoryValue = 0;


    // Find products inside price range

    for (let product of products) {

        if (
            product.price >= minPrice &&
            product.price <= maxPrice
        ) {

            matchingProducts.push(product);


            // Inventory value = price × stock

            totalInventoryValue +=
                product.price * product.stock;
        }
    }


    // Update summary

    productCount.textContent =
        matchingProducts.length;


    inventoryValue.textContent =
        "₹" +
        totalInventoryValue.toLocaleString("en-IN");


    priceRange.textContent =
        "₹" +
        minPrice.toLocaleString("en-IN") +
        " - ₹" +
        maxPrice.toLocaleString("en-IN");


    // Display matching products

    displayProducts(matchingProducts);
}


// ==============================
// SEARCH BUTTON
// ==============================

searchBtn.addEventListener(
    "click",
    searchProducts
);
