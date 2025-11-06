// // --------------header

// window.addEventListener("scroll", function() {
//   const header = document.querySelector(".header-main");

//   if (window.scrollY > 0) {
//     header.classList.add("scrolled");
//   } else {
//     header.classList.remove("scrolled");
//   }
// });


// // script.js - Mobile Menu Controller
// document.addEventListener("DOMContentLoaded", () => {
//   const checkbox = document.getElementById('menu-toggle');
//   const menu     = document.getElementById('menu');
//   const overlay  = document.getElementById('overlay');
//   const closeBtn = document.getElementById('close-menu');

//   const openMenu = () => {
//     menu.classList.add('open');
//     overlay.classList.add('active');
//   };

//   const closeMenu = () => {
//     menu.classList.remove('open');
//     overlay.classList.remove('active');
//     checkbox.checked = false;
//   };

//   // Open when burger clicked
//   checkbox.addEventListener('change', () => {
//     if (checkbox.checked) openMenu();
//     else closeMenu();
//   });

//   // Close when clicking overlay
//   overlay.addEventListener('click', closeMenu);

//   // Optional: Close when clicking a menu link
//   menu.querySelectorAll('a').forEach(link => {
//     link.addEventListener('click', closeMenu);
//   });
// });



// // aqedan iwyeba basket chemo dzmao------------




// const BASKET_GETALL_API = "https://restaurant.stepprojects.ge/api/Baskets/GetAll";
// const basketBody = document.getElementById("basketBody");
// const totalPriceElement = document.querySelector("#price");

// async function fetchBasket() {
//     try {
//         const response = await fetch(BASKET_GETALL_API, {
//             headers: {
//                 "accept": "application/json"
//                 // add any other headers if required
//             }
//         });
//         const data = await response.json();
//         renderBasket(data);
//     } catch (error) {
//         console.error("Error fetching basket:", error);
//     }
// }

// function renderBasket(cartItems) {
//     if (!basketBody) return;

//     basketBody.innerHTML = '';

//     if (!cartItems || cartItems.length === 0) {
//         basketBody.innerHTML =
//             `<tr>
//                 <td colspan="8" class="text-center">Your cart is empty</td>
//             </tr>`;
//         if (totalPriceElement) {
//             totalPriceElement.textContent = '0.00 ₾';
//         }
//         return;
//     }

//     let total = 0;
//     cartItems.forEach(item => {
//         if (!item.product) return;

//         const row = document.createElement('tr');
//         const product = item.product;

//         // Calculate item total
//         const itemTotal = (product.price || 0) * (item.quantity || 1);
//     total += itemTotal;

//     // Create the row content (exact same structure as Local Storage version)
//     row.innerHTML =
//         `<td class="product-thumbnail">
//                 <img src="${product.image || ''}" alt="${product.name || ''}">
//             </td>
//             <td class="product-name">${product.name || 'Unnamed Item'}</td>
//             <td class="product-quantity">
//                 <div class="quantity-controls" data-id="${product.id}">
//                     <button type="button" class="qty-btn minus">-</button>
//                     <span class="quantity-display">${item.quantity || 1}</span>
//                     <button type="button" class="qty-btn plus">+</button>
//                 </div>
//             </td>
//             <td class="product-total">${itemTotal.toFixed(2)} ₾</td>
//             <td class="product-spicy">${product.spiciness !== undefined ? product.spiciness : 'No'}</td>
//             <td class="product-nuts">${product.nuts ? 'Yes' : 'No'}</td>
//             <td class="product-remove">
//                 <button type="button" class="remove-btn" data-id="${product.id}" title="Remove item">×</button>
//             </td>`
//         ;
//     // Add event listeners to quantity buttons
//     const controls = row.querySelector('.quantity-controls');
//     const minusBtn = controls.querySelector('.minus');
//     const plusBtn = controls.querySelector('.plus');

//     minusBtn.addEventListener('click', () => updateQuantity(product.id, -1));
//     plusBtn.addEventListener('click', () => updateQuantity(product.id, 1));

//     // Add event listener to remove button
//     const removeBtn = row.querySelector('.remove-btn');
//     removeBtn.addEventListener('click', () => deleteProduct(product.id));

//     basketBody.appendChild(row);
// });

// // Update total price
// if (totalPriceElement) {
//     totalPriceElement.textContent = `${ total.toFixed(2) } ₾`;
// }
// }














window.addEventListener("scroll", function () {
    const header = document.querySelector(".header-main");

    if (window.scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


// script.js - Mobile Menu Controller
document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-menu');

    const openMenu = () => {
        menu.classList.add('open');
        overlay.classList.add('active');
    };

    const closeMenu = () => {
        menu.classList.remove('open');
        overlay.classList.remove('active');
        checkbox.checked = false;
    };

    // Open when burger clicked
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) openMenu();
        else closeMenu();
    });

    //   // Close with X button
    //   closeBtn.addEventListener('click', closeMenu);

    // Close when clicking overlay
    overlay.addEventListener('click', closeMenu);

    // Optional: Close when clicking a menu link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});



// DOM Elements
// const basketBody = document.getElementById("basketBody");
// const totalPriceElement = document.querySelector("#price");
const checkoutBtn = document.querySelector(".checkout-btn");
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderBasket();
    updateCartCount();

    // Add event listener for checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
});

// Update cart count in header
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Delete product from cart with SweetAlert2 confirmation
// async function deleteProduct(id, event) {
//     if (event) {
//         event.preventDefault();
//         event.stopPropagation();
//     }

//     const item = cartItems.find(item => item.id === id);
//     if (!item) return;

//     try {
//         const result = await Swal.fire({
//             title: 'Remove Item',
//             text: `Are you sure you want to remove ${item.name || 'this item'} from your cart?`,
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#ff6b00',
//             cancelButtonColor: '#6c757d',
//             confirmButtonText: 'Yes, remove it!',
//             cancelButtonText: 'No, keep it',
//             customClass: {
//                 confirmButton: 'swal-confirm-btn',
//                 cancelButton: 'swal-cancel-btn'
//             },
//             buttonsStyling: false
//         });

//         if (result.isConfirmed) {
//             cartItems = cartItems.filter(item => item.id !== id);
//             localStorage.setItem('cart', JSON.stringify(cartItems));

//             // Show success message
//             await Swal.fire({
//                 title: 'Removed!',
//                 text: `The item has been removed from your cart. ${item.name}`,
//                 icon: 'success',
//                 timer: 1500,
//                 showConfirmButton: false
//             });

//             renderBasket();
//             updateCartCount();
//         }
//     } catch (error) {
//         console.error('Error in delete confirmation:', error);
//     }
// }
// Update product quantity




const BASKET_DELETE_API = "https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/";

async function deleteProd(id) {
    try {
        const response = await fetch(BASKET_DELETE_API + id, {
            method: "DELETE",
            headers: {
                "accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Delete failed with status ${response.status}`);
        }

        const info = await response.text();
        console.log("Delete success:", info);

    } catch (error) {
        console.error("Error deleting product:", error);
    }
}







function updateQuantity(id, change) {
    // Find the item in the cart
    const itemIndex = cartItems.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        const item = cartItems[itemIndex];
        const currentQuantity = item.quantity || 1;
        const newQuantity = currentQuantity + change;

        // If quantity is less than 1, remove the item
        if (newQuantity < 1) {
            deleteProd(id);
            return;
        }

        // Update the quantity
        cartItems[itemIndex].quantity = newQuantity;

        // Save to localStorage and update the UI
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Update the display
        const quantityDisplay = document.querySelector(`.quantity-controls[data-id="${id}"] .quantity-display`);
        if (quantityDisplay) {
            quantityDisplay.textContent = newQuantity;
            quantityDisplay.classList.add('quantity-updated');
            setTimeout(() => quantityDisplay.classList.remove('quantity-updated'), 200);

            // Update the total price for this item
            const price = parseFloat(item.price || 0);
            const totalCell = quantityDisplay.closest('tr').querySelector('.product-total');
            if (totalCell) {
                totalCell.textContent = (price * newQuantity).toFixed(2) + ' ₾';
            }
        }

        // Update the cart total
        updateCartTotal();
        updateCartCount();
    }
}

// Update cart total
function updateCartTotal() {
    if (!totalPriceElement) return;

    const total = cartItems.reduce((sum, item) => {
        return sum + (parseFloat(item.price || 0) * (item.quantity || 1));
    }, 0);

    totalPriceElement.textContent = total.toFixed(2) + ' ₾';
}

// function renderBasket() {
//     if (!basketBody) return;

//     basketBody.innerHTML = '';

//     if (cartItems.length === 0) {
//         basketBody.innerHTML = `
//             <tr>
//                 <td colspan="8" class="text-center">Your cart is empty</td>
//             </tr>`;
//         if (totalPriceElement) {
//             totalPriceElement.textContent = '0.00 ₾';
//         }
//         return;
//     }

//     let total = 0;

//     cartItems.forEach(item => {
//         const row = document.createElement('tr');

//         // Calculate item total
//         const itemTotal = (item.price || 0) * (item.quantity || 1);
//         total += itemTotal;

//         // Create the row content
//         row.innerHTML = `
//             <td class="product-thumbnail">
//                 <img src="${item.image || ''}" alt="${item.name || ''}">
//             </td>
//             <td class="product-name">${item.name || 'Unnamed Item'}</td>
//             <td class="product-quantity">
//                 <div class="quantity-controls" data-id="${item.id}">
//                     <button type="button" class="qty-btn minus">-</button>
//                     <span class="quantity-display">${item.quantity || 1}</span>
//                     <button type="button" class="qty-btn plus">+</button>
//                 </div>
//             </td>
//             <td class="product-total">${itemTotal.toFixed(2)} ₾</td>
//             <td class="product-spicy">${item.spiciness !== undefined ? item.spiciness : 'No'}</td>
//             <td class="product-nuts">${item.nuts ? 'Yes' : 'No'}</td>
//             <td class="product-remove">
//                 <button type="button" class="remove-btn" data-id="${item.id}" title="Remove item">×</button>
//             </td>
//         `;

//         // Add event listeners to the quantity buttons
//         const controls = row.querySelector('.quantity-controls');
//         const minusBtn = controls.querySelector('.minus');
//         const plusBtn = controls.querySelector('.plus');

//         minusBtn.addEventListener('click', () => updateQuantity(item.id, -1));
//         plusBtn.addEventListener('click', () => updateQuantity(item.id, 1));

//         // Add event listener to the remove button
//         const removeBtn = row.querySelector('.remove-btn');
//         removeBtn.addEventListener('click', () => deleteProduct(item.id));

//         basketBody.appendChild(row);
//     });

//     // Update total price
//     if (totalPriceElement) {
//         totalPriceElement.textContent = total.toFixed(2) + ' ₾';
//     }
//     if (totalPriceElement) {
//         totalPriceElement.textContent = `${total.toFixed(2)} ₾`;
//     }

// }


// Handle checkout

const BASKET_GETALL_API = "https://restaurant.stepprojects.ge/api/Baskets/GetAll";
const basketBody = document.getElementById("basketBody");
const totalPriceElement = document.querySelector("#price");

async function fetchBasket() {
    try {
        const response = await fetch(BASKET_GETALL_API, {
            headers: {
                "accept": "application/json"
                // add any other headers if required
            }
        });
        const data = await response.json();
        renderBasket(data);
    } catch (error) {
        console.error("Error fetching basket:", error);
    }
}

function renderBasket(cartItems) {
    if (!basketBody) return;

    basketBody.innerHTML = '';

    if (!cartItems || cartItems.length === 0) {
        basketBody.innerHTML =
            `<tr>
                <td colspan="8" class="text-center">Your cart is empty</td>
            </tr>`;
        if (totalPriceElement) {
            totalPriceElement.textContent = '0.00 ₾';
        }
        return;
    }

    let total = 0;
    cartItems.forEach(item => {
        if (!item.product) return;

        const row = document.createElement('tr');
        const product = item.product;

        // Calculate item total
        const itemTotal = (item.product.price || 0) * (item.quantity || 1);
        total += itemTotal;

        // Create the row content (exact same structure as Local Storage version)
        row.innerHTML =
            `<td class="product-thumbnail">
                <img src="${product.image || ''}" alt="${product.name || ''}">
            </td>
            <td class="product-name">${product.name || 'Unnamed Item'}</td>
            <td class="product-quantity">
                <div class="quantity-controls" data-id="${product.id}">
                    <button type="button" class="qty-btn minus">-</button>
                    <span class="quantity-display">${item.quantity || 1}</span>
                    <button type="button" class="qty-btn plus">+</button>
                </div>
            </td>
            <td class="product-total">${itemTotal.toFixed(2)} ₾</td>
            <td class="product-spicy">${product.spiciness !== undefined ? product.spiciness : 'No'}</td>
            <td class="product-nuts">${product.nuts ? 'Yes' : 'No'}</td>
            <td class="product-remove">
                <button type="button" class="remove-btn" data-id="${product.id}" title="Remove item">×</button>
            </td>`
            ;
        // Add event listeners to quantity buttons
        const controls = row.querySelector('.quantity-controls');
        const minusBtn = controls.querySelector('.minus');
        const plusBtn = controls.querySelector('.plus');

        minusBtn.addEventListener('click', () => updateQuantity(product.id, -1));
        plusBtn.addEventListener('click', () => updateQuantity(product.id, 1));

        // Add event listener to remove button
        // const removeBtn = row.querySelector('.remove-btn');
        // removeBtn.addEventListener('click', () => {
        //     deleteProd(item.product.id);

        // });
        const removeBtn = row.querySelector('.remove-btn');
        removeBtn.addEventListener('click', async () => {
            await deleteProd(item.product.id);  // Wait for delete to finish
            await fetchBasket();                // Then refresh the list
        });

        basketBody.appendChild(row);
    });

    // Update total price
    if (totalPriceElement) {
        totalPriceElement.textContent = `${total.toFixed(2)} ₾`;
    }
}

// Load basket on page load
document.addEventListener('DOMContentLoaded', fetchBasket);


async function handleCheckout(event) {
    event.preventDefault();

    if (cartItems.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Your cart is empty',
            text: 'Please add items to your cart before checking out',
            confirmButtonColor: '#ff6b00'
        });
        return;
    }

    // Calculate total and save to localStorage
    const total = cartItems.reduce((sum, item) => {
        return sum + (parseFloat(item.price) * (item.quantity || 1));
    }, 0);

    // Save cart data for checkout page
    localStorage.setItem('orderTotal', total.toFixed(2));
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Burger menu functionality
document.addEventListener('DOMContentLoaded', function () {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    if (burger && nav) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            nav.classList.toggle('active');
            burger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burger.classList.remove('active');
            });
        });
    }
});

// Make functions available globally
window.deleteProd = deleteProd;
window.updateQuantity = updateQuantity;

