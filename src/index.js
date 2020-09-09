document.addEventListener('DOMContentLoaded', () => {
    const navBar = document.querySelector(".navbar")
    const navLeft = document.querySelector("#nav-left")
    const navCart = document.querySelector(".nav-cart")
    const navWishlist = document.querySelector(".nav-wishlist")
    const containers = document.querySelector("#containers")
    const cartContainer = document.querySelector(".cart-container")
    const ddAisle = document.querySelector(".dropdown-aisle")
    const mainContainers = document.querySelector("#main-containers")
    const sideNav = document.querySelector(".item-side-nav")
    const blank = document.querySelector(".blank")
    const cartBtn = document.querySelector(".cart-btn")
    const cartList = document.querySelector(".cart-middle-left")
    const wishContainer = document.querySelector(".wishlist-container")
    const compareBtn = document. querySelector(".compare-btn")
    const compareContainer = document.querySelector(".compare-container")
    const compareX = document.querySelectorAll(".cart-btn")[1]
    const goCartBtn = document.querySelector(".go-cart-btn")
    const wishlistMiddle = document.querySelector(".wishlist-middle")
    const categoryItems = document.querySelector(".category-items")
    const groceryIndex = document.querySelector(".grocery-index")
    // const groceryIndexRight = document.querySelector(".grocery-index-right")

    //fetch baseUrl
    const itemFetchAdapter = new FetchAdapter("http://localhost:3000/")
    // itemFetchAdapter.get("items", action)

    // Fetch all items from cart
    const fetchCart = carts => carts.forEach(cart => {
        cart.items.forEach(item => {
            renderCartItem(item)
        })
    })

    // Fetch all items
    const action = items => items.forEach(item => renderItem(item))

    // sub-category lists
    const subCategory = (item) => {
        const subCategoryP = document.createElement('p')
        subCategoryP.innerText = item.sub_category
        subCategoryP.className = "sub-category-nav"
        
        if(sideNav.innerText.includes(item.sub_category)){
            subCategoryP.innerText = ""
        } else {
            sideNav.append(subCategoryP)
        }
    }

    // Fetch items and subcategories by category
    const bakery = items => items.forEach(item => { 
        if (item.category === "Bakery") {
            renderItem(item)
            subCategory(item)
        }
    })

    const cheese = items => items.forEach(item => { 
        if (item.category === "Cheese") {
            renderItem(item)
            subCategory(item)
        }
    })

    const meat = items => items.forEach(item => { 
        if (item.category === "Meat") {
            renderItem(item)
            subCategory(item)
        }
    })

    const seafood = items => items.forEach(item => { 
        if (item.category === "Seafood") {
            renderItem(item)
            subCategory(item)
        }
    })

    const subCategoryItems = items => items.forEach(item => {
        if (itemSubCategory === item.sub_category) {
            renderItem(item)
        }
    })

    // render items to cart
    const renderCartItem = item => {
        const cartItem = document.createElement("div")
        cartItem.className = "cart-item"
        cartItem.draggable = "true"
        cartList.append(cartItem)
        // debugger

        const cartImage = document.createElement("img")
        cartImage.className = "cart-image"
        cartImage.src = item.image
        cartImage.alt = item.name
        cartItem.append(cartImage)

        const cartName = document.createElement("div")
        cartName.className = "cart-name"
        cartName.innerHTML = item.name
        cartItem.append(cartName)

        const cartPrice = document.createElement("div")
        cartPrice.className = "cart-price"
        cartPrice.innerHTML = item.sales_price
        cartItem.append(cartPrice)

        const removeItemBtn = document.createElement("button")
        removeItemBtn.className = "remove-item-btn"
        removeItemBtn.innerText = "X"
        cartItem.append(removeItemBtn)

        cartItem.addEventListener("dragstart", () => {
            cartItem.classList.add("dragging")
        })

        cartItem.addEventListener("dragend", () => {
            cartItem.classList.remove("dragging")
        })
        
    }

    cartList.addEventListener("dragover", () => {
        const draggable = document.querySelector(".dragging")
        draggable.style.borderBottom = "dotted"
        draggable.style.height="85px"
        cartList.appendChild(draggable)
    })

    wishContainer.addEventListener("dragover", () => {
        const draggable = document.querySelector(".dragging")
        draggable.style.borderBottom = "none"
        draggable.style.height="30px"
        wishContainer.append(draggable)
    })

    // sideNav listener
    sideNav.addEventListener("click", (e) => {
        if (e.target.className === "sub-category-nav") {
            categoryItems.innerHTML = ""
            itemSubCategory = e.target.innerText
            itemFetchAdapter.get("items", subCategoryItems)
        }
    })

    const renderItem = (item) => {
        const itemDiv = document.createElement("div")
        itemDiv.className = "grocery-item"
        
        
        //item name
        const apiItemName = document.createElement("div")
        apiItemName.className = "api-item-name"
        apiItemName.innerHTML = `${item.name}`
        itemDiv.append(apiItemName)

        //item image
        const itemImg = document.createElement('img')
        itemImg.className = "grocery-image"
        itemImg.src = item.image
        itemImg.alt = item.name
        itemDiv.append(itemImg)

        //Add to cart button
        const itemToCart = document.createElement('button')
        itemToCart.className = "add-to-cart"
        itemToCart.innerText = "Add to Cart"
        itemDiv.append(itemToCart)

        //view item button
        const itemButton = document.createElement('button')
        itemButton.dataset.id = item.id
        itemButton.className = "grocery-show-button"
        itemButton.innerText = "View"
        itemDiv.append(itemButton)

        categoryItems.append(itemDiv)

        // dataset database
        itemDiv.id = item.id
        itemDiv.dataset.category = item.category
        itemDiv.dataset.sub_category = item.sub_category
        itemDiv.dataset.name = item.name
        itemDiv.dataset.sku = item.item_id
        itemDiv.dataset.price = item.sales_price
        itemDiv.dataset.description = item.description
        itemDiv.dataset.image = item.image
        itemDiv.dataset.receipt_info = item.receipt_info
        itemDiv.dataset.nutrition = item.nutrition
    }

    // Flatiron click => page reload
    navLeft.addEventListener("click", (e) => {
        location.reload()
    })
    
    // hide & seek with the cart
    navCart.addEventListener("click", () => {
        cartContainer.style.display = "block"
        navBar.style.opacity = 0.3
        blank.style.opacity = 0.3
        sideNav.style.opacity = 0.3
        containers.style.opacity = 0.3
        document.body.style.overflow = "hidden"
        itemFetchAdapter.get("carts", fetchCart)
    })
    
    // clickhandler
    document.addEventListener("click", (e) => {
        if (e.target === cartBtn) {
            cartContainer.style.display = "none"
            cartList.innerHTML = ""
            navBar.style.opacity = 1
            blank.style.opacity = 1
            sideNav.style.opacity = 1
            containers.style.opacity = 1
            document.body.style.overflow = "scroll"
        } else if (e.target === compareX) {
            compareContainer.style.display = "none"
            navBar.style.opacity = 1
            blank.style.opacity = 1
            sideNav.style.opacity = 1
            containers.style.opacity = 1
            document.body.style.overflow = "scroll"
        } else if (e.target === navWishlist) {
            compareContainer.style.display = "block"
            navBar.style.opacity = 0.3
            blank.style.opacity = 0.3
            sideNav.style.opacity = 0.3
            containers.style.opacity = 0.3
            document.body.style.overflow = "hidden"
        } else if (e.target === goCartBtn) {
            wishlistMiddle.innerHTML = ""
            compareContainer.style.display = "none"
            cartContainer.style.display = "block"
        } else if (e.target.className === "grocery-show-button" ){
            groceryIndex.style.display = "block"
            document.body.style.overflow = "hidden"
            navBar.style.opacity = 0.3
            blank.style.opacity = 0.3
            sideNav.style.opacity = 0.3
            containers.style.opacity = 0.3

            // console.dir(e.target)
            /// e.target = grocery show button
            let image = document.querySelector('.index-image')
            let name = document.querySelector('.index-name')
            let category = document.querySelector('.index-category')
            let subCategory = document.querySelector('.index-sub-category')
            let description = document.querySelector('.index-description')
            let sku = document.querySelector('.index-sku')
            let price = document.querySelector('.index-price')
            

            item = e.target.parentElement
            
            //item info
            category.innerText = item.dataset.category
            subCategory.innerText = item.dataset.sub_category
            name.innerText = item.dataset.name
            sku.innerText = item.dataset.sku
            price.innerText = item.dataset.price
            description.innerText = item.dataset.description
            image.src = item.dataset.image
            image.alt = item.dataset.name
        } else if (e.target.className === "close-btn") {
            groceryIndex.style.display = "none"
            document.body.style.overflow = "scroll"
            navBar.style.opacity = 1
            blank.style.opacity = 1
            sideNav.style.opacity = 1
            containers.style.opacity = 1
        }
    })

    // click the items in dropdown list to fetch the category api

    ddAisle.addEventListener("click", (e) => {
        let categoryId = e.target.dataset.num
        let itemCategory = e.target.innerText 

        blank.innerText = itemCategory

        // category different colors
        switch (blank.innerText){
            case "Bakery":
                categoryItems.innerHTML = "";
                blank.style.backgroundColor = "BurlyWood";
                blank.style.height = "50px";
                categoryItems.style.display = "block";
                itemFetchAdapter.get("items", bakery)
                break;
            case "Produce":
                blank.style.backgroundColor = "LightGreen";
                blank.style.height = "50px";
                break;
            case "Cheese":
                categoryItems.innerHTML = "";
                blank.style.backgroundColor = "GoldenRod";
                blank.style.height = "50px";
                categoryItems.style.display = "block"
                itemFetchAdapter.get("items", cheese)
                break;
            case "Prepared Foods":
                blank.style.backgroundColor = "LightSlateGrey";
                blank.style.height = "50px";
            break;
            case "Meat":
                categoryItems.innerHTML = "";
                blank.style.backgroundColor = "FireBrick";
                blank.style.height = "50px";
                categoryItems.style.display = "block"
                itemFetchAdapter.get("items", meat)
            break;
            case "Seafood":
                categoryItems.innerHTML = "";
                blank.style.backgroundColor = "DodgerBlue";
                blank.style.height = "50px";
                categoryItems.style.display = "block"
                itemFetchAdapter.get("items", seafood)
            break;
            case "Wine, Beer & Spirits":
                blank.style.backgroundColor = "Crimson";
                blank.style.height = "50px";
            break;
            case "Other Departments":
                blank.style.backgroundColor = "BlueViolet";
                blank.style.height = "50px";
            break;
            case "View All":
                categoryItems.innerHTML = "";
                blank.style.backgroundColor = "DimGrey";
                blank.style.height = "50px";
                categoryItems.style.display = "block"
                itemFetchAdapter.get("items", action)
            break;
        }

        //dataset.num ( category ID )
        
        const newDiv = document.createElement("div")
        newDiv.dataset.num = categoryId
        newDiv.classList.add("item-categories")
        mainContainers.innerHTML = ""
        
        //Side Navigation Bar
        sideNav.style.display = "block"       
        sideNav.innerHTML = `
            <em>${itemCategory}</em>
        `
        sideNav.dataset.num = categoryId
    })

    //compare click button
    compareBtn.addEventListener("click", (e) => {
        if (e.target.previousElementSibling.childElementCount <= 1) {
            alert("You need to choose two or more items to compare!")
        } else {
            wishContainer.childNodes.forEach(item => {
                //create div for each item
                const itemDiv = document.createElement("div")
                itemDiv.className = "wishlist-middle-item"
                wishlistMiddle.append(itemDiv)
                
                //create item title
                const itemTitle = document.createElement("div")
                itemTitle.className = "wishlist-item-title"
                itemDiv.append(itemTitle)
                itemTitle.innerHTML = `${item.innerHTML}`

                //create item price
                const itemPrice = document.createElement("div")
                itemPrice.className = "wishlist-item-price"
                itemPrice.innerText = "Price goes here"
                itemDiv.append(itemPrice)

                //create item nutrition
                const itemNutrition = document.createElement("div")
                itemNutrition.className = "wishlist-item-nutrition"
                itemNutrition.innerHTML = "nutrition goes here"
                itemDiv.append(itemNutrition)

                //create remove button
                const wishlistRemoveBtn = document.createElement("button")
                wishlistRemoveBtn.className = "wishlist-remove-btn"
                wishlistRemoveBtn.innerText = "Remove Item"
                itemDiv.append(wishlistRemoveBtn)
                    //clickhandler => DELETE item from cart 
            })

            cartContainer.style.display = "none"
            compareContainer.style.display = "block"
            navBar.style.opacity = 0.3
            blank.style.opacity = 0.3
            sideNav.style.opacity = 0.3
            containers.style.opacity = 0.3
            document.body.style.overflow = "hidden"
            
        }
    })

})

