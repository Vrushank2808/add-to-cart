// // Base / Parent product class
// class Products {
//   constructor(id, name, product, imageUrl) {
//     // abstract
//     if (this.constructor === Products) {
//       throw new Error("can not inilize the abstract class");
//     }
//     this.id = id;
//     this.name = name;
//     this.product = product;
//     this.imageUrl = imageUrl;
//   }

//   // abstract method
//   displayProduct() {
//     throw new Error("Abstract method must be implemented");
//   }
// }

// // PhysicalProduct inherited from Products
// class PhysicalProduct extends Products {
//   constructor(id, name, price, weigth, imageUrl) {
//     super(id, name, price, imageUrl);
//     this.weigth = weigth; // additional property
//   }

//   displayProduct() {
//     return `<div class = "product">
//       <img src="${this.imageUrl}"
//       alt = "${this.name}"
//       class = "product-image" height = "200px" width="200px">
//       <h3>${this.name}</h3>
//       <p>Weight : ${this.weigth} Kg </p>
//       <button onclick="shop.addtocart(${this.id})">Add to Card</button>
//       </div>
//       `;
//   }
// }

// // DigitalProduct inherited from Products
// class DigitalProduct extends Products {
//   constructor(id, name, price, fileSize, imageUrl) {
//     super(id, name, price, imageUrl);
//     this.fileSize = fileSize; // additional property
//   }

//   displayProduct() {
//     return `<div class = "product">
//         <img src="${this.imageUrl}"
//         alt = "${this.name}"
//         class = "product-image" height = "200px" width="200px">
//         <h3>${this.name}</h3>
//         <p>fileSize : ${this.fileSize} MB </p>
//         <button onclick="shop.addtocart(${this.id})">Add to Card</button>
//         </div>
//         `;
//   }
// }

// // cartItem class to to represent items in the cart
// class CartItem {
//   constructor(product, quantity = 1) {
//     this.product = product;
//     this.quantity = quantity;
//   }

//   incrementQuantity() {
//     this.quantity++;
//   }

//   getTotalPrice() {
//     return this.product.price * this.quantity;
//   }

//   // factory
//   displayCartItem() {
//     return ``;
//   }
// }

// // cart class to manage cart items
// class Cart {
//   constructor() {
//     this.items = []; // empty
//   }
//   addProduct(product) {
//     const existingItem = this.items.find(
//       (item) => this.product.id == product.id
//     );

//     if (existingItem) {
//       existingItem.incrementQuantity();
//     } else {
//       this.items.push(new CartItem(product));
//     }
//     this.displayCartItem();
//   }

//   displayCart() {
//     const cartItem = document.getElementById("cart-item");
//     cartItem.innerHTML = "";
//     this.items.forEach((item) => {
//       cartItem.innerHTML += item.displayCartItem();
//     });
//   }

//   checkout() {
//     if (this.items.length === 0) {
//       alert("Your cart is empty");
//     }

//     alert(`Checkout ${this.items.length}. Total price : ${this.getTotal()}`);
//     this.items = [];
//     this.displayCart();
//   }

//   // factory
//   getTotal() {
//     return this.items.reduce((total, item) => total + item.getTotalPrice());
//   }
// }

// let obj = new DigitalProduct(22, "jvysdvf", 654, 432, "yef");
// obj.displayProduct();


// Base / Parent product class
class Products {
  constructor(id, name, price, imageUrl) {
    if (new.target === Products) {
      throw new Error("Cannot instantiate abstract class.");
    }
    this.id = id;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  displayProduct() {
    throw new Error("Abstract method must be implemented.");
  }
}

// PhysicalProduct inherited from Products
class PhysicalProduct extends Products {
  constructor(id, name, price, weight, imageUrl) {
    super(id, name, price, imageUrl);
    this.weight = weight;
  }

  displayProduct() {
    return `
      <div class="product">
        <img src="${this.imageUrl}" alt="${this.name}" class="product-image">
        <h3>${this.name}</h3>
        <p>Weight: ${this.weight} Kg</p>
        <p>Price: ${this.price}</p>
        <button onclick="shop.addToCart(${this.id})">Add to Cart</button>
      </div>
    `;
  }
}

// DigitalProduct inherited from Products
class DigitalProduct extends Products {
  constructor(id, name, price, fileSize, imageUrl) {
    super(id, name, price, imageUrl);
    this.fileSize = fileSize;
  }

  displayProduct() {
    return `
      <div class="product">
        <img src="${this.imageUrl}" alt="${this.name}" class="product-image">
        <h3>${this.name}</h3>
        <p>File Size: ${this.fileSize} MB</p>
        <p>Price: ${this.price}</p>
        <button onclick="shop.addToCart(${this.id})">Add to Cart</button>
      </div>
    `;
  }
}

// CartItem class to represent items in the cart
class CartItem {
  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  incrementQuantity() {
    this.quantity++;
  }

  getTotalPrice() {
    return this.product.price * this.quantity;
  }

  displayCartItem() {
    return `
      <li>
        <span>${this.product.name}</span>
        <span>Quantity: ${this.quantity}</span>
        <span>Price: ${this.getTotalPrice()}</span>
      </li>
    `;
  }
}

// Cart class to manage cart items
class Cart {
  constructor() {
    this.items = [];
  }

  addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      const existingItem = this.items.find(item => item.product.id === productId);
      if (existingItem) {
        existingItem.incrementQuantity();
      } else {
        this.items.push(new CartItem(product));
      }
      this.displayCart();
    } else {
      throw new Error("Product not found");
    }
  }

  displayCart() {
    const cartItemList = document.getElementById("cart-item");
    cartItemList.innerHTML = "";
    this.items.forEach(item => {
      cartItemList.innerHTML += item.displayCartItem();
    });
  }

  checkout() {
    if (this.items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    alert(`Checkout ${this.items.length} item(s). Total price: $${this.getTotal()}`);
    this.items = [];
    this.displayCart();
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }
}

// Initialize cart and products
const shop = new Cart();

const products = [
  new PhysicalProduct(1, "Physical Product 1", 300000, 1.5, "https://via.placeholder.com/200"),
  new DigitalProduct(2, "Digital Product 1", 10500, 500, "https://via.placeholder.com/200")
];

// Display products
const productListSection = document.getElementById("product-list");
products.forEach(product => {
  productListSection.innerHTML += product.displayProduct();
});

// Attach checkout functionality
document.getElementById("checkout-button").addEventListener("click", () => {
  shop.checkout();
});
