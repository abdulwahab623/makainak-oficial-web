$(document).ready(function() {
    // Initialize Cart
    let cart = JSON.parse(localStorage.getItem('makainak_cart')) || [];
    updateCartUI();

    // Add to Cart
    $(document).on('click', '.cart-add-btn', function(e) {
        e.preventDefault();
        const btn = $(this);
        const item = {
            id: btn.data('id'),
            name: btn.data('name'),
            price: parseFloat(btn.data('price')),
            tonnage: btn.closest('.service-selection-card').find('.ton-select-dropdown-small').val() || 'N/A',
            quantity: 1
        };

        if (btn.hasClass('added')) {
            // Remove from cart
            cart = cart.filter(i => i.id !== item.id);
            btn.removeClass('added').html('<i class="bi bi-plus"></i>');
            btn.siblings('.service-added-text').addClass('d-none');
            btn.closest('.service-selection-card').removeClass('selected');
        } else {
            // Add to cart
            const exists = cart.find(i => i.id === item.id);
            if (!exists) {
                cart.push(item);
            }
            btn.addClass('added').html('<i class="bi bi-check-lg"></i>');
            btn.siblings('.service-added-text').removeClass('d-none');
            btn.closest('.service-selection-card').addClass('selected');
        }

        saveCart();
        updateCartUI();
    });

    // Save Cart to LocalStorage
    function saveCart() {
        localStorage.setItem('makainak_cart', JSON.stringify(cart));
    }

    // Update Cart Badge and UI elements
    function updateCartUI() {
        const totalItems = cart.length;
        $('.cart-badge').text(totalItems);
        
        // Update states of buttons on page load
        $('.cart-add-btn').each(function() {
            const btnId = $(this).data('id');
            const inCart = cart.find(i => i.id === btnId);
            if (inCart) {
                $(this).addClass('added').html('<i class="bi bi-check-lg"></i>');
                $(this).siblings('.service-added-text').removeClass('d-none');
                $(this).closest('.service-selection-card').addClass('selected');
            }
        });
    }

    // Cart Page Specific Logic
    if (window.location.pathname.includes('cart.html')) {
        renderCartPage();
    }

    function renderCartPage() {
        const cartItemsList = $('#cartItemsList');
        const cartSummary = $('#cartSummary');
        
        if (cart.length === 0) {
            cartItemsList.html(`
                <div class="text-center py-5">
                    <i class="bi bi-cart-x display-1 text-muted mb-4"></i>
                    <h3 class="fw-bold">Your cart is empty</h3>
                    <p class="text-muted mb-4">Looks like you haven't added any services yet.</p>
                    <a href="index.html" class="btn btn-primary rounded-pill px-5 py-3">Explore Services</a>
                </div>
            `);
            cartSummary.hide();
            return;
        }

        let html = '';
        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            html += `
                <div class="cart-item-row p-4 mb-3 bg-white rounded-4 border shadow-sm" data-index="${index}">
                    <div class="row align-items-center">
                        <div class="col-md-2 mb-3 mb-md-0">
                            <div class="bg-light rounded-3 p-3 text-center">
                                <i class="bi bi-tools fs-1 text-primary"></i>
                            </div>
                        </div>
                        <div class="col-md-5 mb-3 mb-md-0">
                            <h5 class="fw-bold mb-1">${item.name}</h5>
                            <p class="text-muted small mb-0">Tonnage: ${item.tonnage}</p>
                        </div>
                        <div class="col-md-3 mb-3 mb-md-0">
                            <div class="d-flex align-items-center gap-3">
                                <button class="btn btn-sm btn-light rounded-circle q-minus" data-index="${index}"><i class="bi bi-dash"></i></button>
                                <span class="fw-bold">${item.quantity}</span>
                                <button class="btn btn-sm btn-light rounded-circle q-plus" data-index="${index}"><i class="bi bi-plus"></i></button>
                            </div>
                        </div>
                        <div class="col-md-2 text-md-end">
                            <h5 class="fw-bold mb-0">Rs. ${itemTotal}</h5>
                            <button class="btn btn-link text-danger p-0 mt-2 remove-item small" data-index="${index}">Remove</button>
                        </div>
                    </div>
                </div>
            `;
        });

        cartItemsList.html(html);
        updateSummary(subtotal);
        cartSummary.show();
    }

    function updateSummary(subtotal) {
        const tax = subtotal * 0.05; // 5% tax example
        const total = subtotal + tax;
        
        $('#subtotal').text(`Rs. ${subtotal}`);
        $('#tax').text(`Rs. ${tax}`);
        $('#total').text(`Rs. ${total}`);
    }

    // Cart Page Interactions
    $(document).on('click', '.q-plus', function() {
        const idx = $(this).data('index');
        cart[idx].quantity++;
        saveCart();
        renderCartPage();
        updateCartUI();
    });

    $(document).on('click', '.q-minus', function() {
        const idx = $(this).data('index');
        if (cart[idx].quantity > 1) {
            cart[idx].quantity--;
            saveCart();
            renderCartPage();
            updateCartUI();
        }
    });

    $(document).on('click', '.remove-item', function() {
        const idx = $(this).data('index');
        cart.splice(idx, 1);
        saveCart();
        renderCartPage();
        updateCartUI();
    });
});
