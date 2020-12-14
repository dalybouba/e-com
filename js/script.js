function signUpAdmin() {
  var fName = document.getElementById("fName").value;
  var lName = document.getElementById("lName").value;
  var email = document.getElementById("email").value;
  var pwd = document.getElementById("pwd").value;
  var cPwd = document.getElementById("cPwd").value;
  // inputs verification
  var verifFirstName = verifLength(fName, 3, 20);
  var verifLastName = verifLength(lName, 3, 20);
  var verifPwd = verifLength(pwd, 8, 20);
  var verifEmailFormat = validateEmail(email);

  if (!verifFirstName) {
    document.getElementById("fNameError").innerHTML =
      "The First Name  length must be between 3 and 20";
  } else {
    document.getElementById("fNameError").innerHTML = "";
  }
  if (!verifLastName) {
    document.getElementById("lNameError").innerHTML =
      "The Last Name  length must be between 3 and 20";
  } else {
    document.getElementById("lNameError").innerHTML = "";
  }
  if (!verifPwd) {
    document.getElementById("pwdError").innerHTML =
      "The password length must be between 8 and 25";
  } else {
    document.getElementById("pwdError").innerHTML = "";
  }
  if (cPwd !== pwd) {
    document.getElementById("cPwdError").innerHTML =
      "Password and confirm password does not match";
  } else {
    document.getElementById("cPwdError").innerHTML = "";
  }

  // email format validation
  if (verifEmailFormat) {
    document.getElementById("emailError").innerHTML = "";
  } else {
    document.getElementById("emailError").innerHTML =
      "the email format is not valid";
  }

  // email existance verification
  var allUsers = JSON.parse(localStorage.getItem("logInUsers") || "[]");
  var userExist = false;
  for (var i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email === email) {
      userExist = true;
    }
  }
  if (userExist) {
    document.getElementById("emailError").innerHTML = "Email exists";
  } else {
    if (
      verifPwd &&
      verifFirstName &&
      verifLastName &&
      verifEmailFormat &&
      pwd === cPwd
    ) {
      var id = JSON.parse(localStorage.getItem("userId") || "1");
      var user = {
        id: id,
        firstName: fName,
        lastName: lName,
        email: email,
        password: pwd,
        confirmPassword: cPwd,
        role: "admin",
      };
      allUsers.push(user);
      localStorage.setItem("userId", id + 1);
      localStorage.setItem("logInUsers", JSON.stringify(allUsers));
      alert("User has been saved !!");
    }
  }
}

function signUpUser() {
  var fName = document.getElementById("fName").value;
  var lName = document.getElementById("lName").value;
  var email = document.getElementById("email").value;
  var pwd = document.getElementById("pwd").value;
  var cPwd = document.getElementById("cPwd").value;
  // inputs verification
  var verifFirstName = verifLength(fName, 3, 20);
  var verifLastName = verifLength(lName, 3, 20);
  var verifPwd = verifLength(pwd, 8, 20);
  var verifEmailFormat = validateEmail(email);

  if (!verifFirstName) {
    document.getElementById("fNameError").innerHTML =
      "The First Name  length must be between 3 and 20";
  } else {
    document.getElementById("fNameError").innerHTML = "";
  }
  if (!verifLastName) {
    document.getElementById("lNameError").innerHTML =
      "The Last Name  length must be between 3 and 20";
  } else {
    document.getElementById("lNameError").innerHTML = "";
  }
  if (!verifPwd) {
    document.getElementById("pwdError").innerHTML =
      "The password length must be between 8 and 25";
  } else {
    document.getElementById("pwdError").innerHTML = "";
  }
  if (cPwd !== pwd) {
    document.getElementById("cPwdError").innerHTML =
      "Password and confirm password does not match";
  } else {
    document.getElementById("cPwdError").innerHTML = "";
  }

  // email format validation
  if (verifEmailFormat) {
    document.getElementById("emailError").innerHTML = "";
  } else {
    document.getElementById("emailError").innerHTML =
      "the email format is not valid";
  }

  // email existance verification
  var allUsers = JSON.parse(localStorage.getItem("logInUsers") || "[]");
  var userExist = false;
  for (var i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email === email) {
      userExist = true;
    }
  }
  if (userExist) {
    document.getElementById("emailError").innerHTML = "Email exists";
  } else {
    if (
      verifPwd &&
      verifFirstName &&
      verifLastName &&
      verifEmailFormat &&
      pwd === cPwd
    ) {
      var id = JSON.parse(localStorage.getItem("userId") || "1");
      var user = {
        id: id,
        firstName: fName,
        lastName: lName,
        email: email,
        password: pwd,
        confirmPassword: cPwd,
        role: "user",
      };
      allUsers.push(user);
      localStorage.setItem("userId", id + 1);
      localStorage.setItem("logInUsers", JSON.stringify(allUsers));
      alert("User has been saved !!");
    }
  }
}
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//function login
function logIn() {
  var email = document.getElementById("logInEmail").value;
  var pwd = document.getElementById("logInPwd").value;

  // user must enter email & pwd

  if (email.length === 0 || pwd.length === 0) {
    document.getElementById("logInError").innerHTML =
      "Please enter your email & your password ";
  } else {
    document.getElementById("logInError").innerHTML = "";
  }

  if (
    validateEmail(email) === false &&
    email.length !== 0 &&
    pwd.length !== 0
  ) {
    document.getElementById("logInEmailError").innerHTML =
      "the email format is not valid";
  } else if (validateEmail(email)) {
    document.getElementById("logInEmailError").innerHTML = "";
  }

  // user existance verification
  var allUsers = JSON.parse(localStorage.getItem("logInUsers"));
  var user;
  for (var i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email === email && allUsers[i].password === pwd) {
      user = allUsers[i];
    }
  }
  if (user) {
    localStorage.setItem("connectedUser", JSON.stringify(user));
    if (user.role === "admin") {
      location.replace("admin.html");
    } else {
      location.replace("index.html");
    }
  } else {
    document.getElementById("logInError").innerHTML =
      "Please verify your email or your password ";
  }
}

//function add product
function addProduct() {
  var pName = document.getElementById("productName").value;
  var price = document.getElementById("price").value;
  var stock = document.getElementById("stock").value;
  var category = document.getElementById("category").value;

  if (pName === "") {
    document.getElementById("pNameError").innerHTML =
      "Please enter a name for your product";
  } else if (pName.length < 5) {
    document.getElementById("pNameError").innerHTML =
      "The product Name length must be more than 5 caracters";
  } else {
    document.getElementById("pNameError").innerHTML = "";
  }

  if (price === "") {
    document.getElementById("priceError").innerHTML =
      "Please enter a price for your product";
  } else if (price <= 0) {
    document.getElementById("priceError").innerHTML =
      "The product price must be not null";
  } else {
    document.getElementById("priceError").innerHTML = "";
  }

  if (stock === "") {
    document.getElementById("stockError").innerHTML =
      "Please enter a stock number for your product";
  } else if (stock <= 0) {
    document.getElementById("stockError").innerHTML =
      "The product stock must be not null ";
  } else {
    document.getElementById("stockError").innerHTML = "";
  }

  if (category === "") {
    document.getElementById("categoryError").innerHTML =
      "Please enter a category for your product ";
  } else {
    document.getElementById("categoryError").innerHTML = "";
  }

  // creating product object and local stock the new product
  var allProducts = getAllProducts();
  var productExist = false;
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === pName) {
      productExist = true;
    }
  }
  if (productExist === true) {
    document.getElementById("productExistError").innerHTML =
      "The product already exist";
  } else {
    document.getElementById("productExistError").innerHTML = "";

    var id = JSON.parse(localStorage.getItem("prId") || "1");
    var product = {
      id: id,
      name: pName,
      price: price,
      stock: stock,
      category: category,
    };

    allProducts.push(product);
    localStorage.setItem("prId", id + 1);
    localStorage.setItem("products", JSON.stringify(allProducts));
  }
}

// Verify Text Length between min and max
function verifLength(ch, min, max) {
  return ch.length >= min && ch.length <= max;
}

function displayProducts() {
  var allProducts = getAllProducts();
  var productTable = `
                        <table id='allProducts'>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Category</th>
                                    <th>Delete</th>
                                    <th>Details</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>`;
  for (var i = 0; i < allProducts.length; i++) {
    productTable += `
                            
                                <tr>
                                    <td class="cart__product__item">
                                        <img src="img/shop-cart/cp-1.jpg" alt="">
                                        <div class="cart__product__item__title">
                                            <h6>${allProducts[i].name}</h6>
                                            <div class="rating">
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="cart__price">$ ${allProducts[i].price}</td>
                                    <td class="cart__quantity">
                                    ${allProducts[i].stock}
                                    </td>
                                    <td class="cart__total">${allProducts[i].category}</td>
                                    <td><button onclick='deleteProduct(${i})' class="btn btn-danger">Delete</button></td>
                                    <td><button onclick='productDetails(${allProducts[i].id})' class="btn btn-success">Details</button></td>
                                    <td><button onclick='editProduct(${allProducts[i].id})' class="btn btn-info">Edit</button></td>

                                </tr>
    `;
  }
  productTable += `
                            </tbody>
                        </table>
    
    `;

  document.getElementById("productTable").innerHTML = productTable;
}

function deleteProduct(indice) {
  var products = getAllProducts();
  products.splice(indice, 1);
  localStorage.setItem("products", JSON.stringify(products));
  location.reload();
}

// Search Product By id
function searchById(id) {
  var products = getAllProducts();
  var product;
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      product = products[i];
    }
  }
  return product;
}
function getAllProducts() {
  return JSON.parse(localStorage.getItem("products") || "[]");
}
function productDetails(id) {
  var product = searchById(id);
  localStorage.setItem("foundedProduct", JSON.stringify(product));
  location.replace("product-details.html");
}

function displayDetails() {
  var product = JSON.parse(localStorage.getItem("foundedProduct"));
  document.getElementById("prFoundedName").innerHTML = product.name;
  document.getElementById("prFoundedPrice").innerHTML = product.price + " $";
  document.getElementById("prFoundedStock").innerHTML = product.stock;
  document.getElementById("prFoundedCategory").innerHTML = product.category;
}

function editProduct(id) {
  var product = searchById(id);
  var editForm = `
  <section class="contact spad">
        <div class="container">
            <div class="contact__content">
                <div class="contact__form text-center">
                    <h5 class="text-center">Edit Product</h5>
                    <div class="form-group">
                        <input type="number" id="priceEdit" placeholder="Price" value=${product.price} class="form-control">
                    </div>
                    <div class="textError"><span id="priceError"></span></div>
                    <div class="form-group">
                        <input type="number" id="stockEdit" placeholder="Stock" value=${product.stock}  class="form-control">
                    </div>

                    <div class="text-center"><button onclick="validateEdit(${product.id})" type="submit" class="site-btn">Edit
                            Product</button></div>
                </div>
            </div>
        </div>
        </div>
    </section>
  `;

  document.getElementById("editForm").innerHTML = editForm;
}

function validateEdit(id) {
  // create products array
  var products = getAllProducts();
  // get new values from inputs
  var newPrice = document.getElementById("priceEdit").value;
  var newStock = document.getElementById("stockEdit").value;
  // loop to find product and update attributes
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      products[i].price = newPrice;
      products[i].stock = newStock;
    }
  }
  // Set all products to localstorage
  localStorage.setItem("products", JSON.stringify(products));
  location.reload();
}

function products() {
  // get all objects from local Storage [{},{},{}]
  var allProducts = getAllProducts();
  var productsDiv = "";
  for (var i = 0; i < allProducts.length; i++) {
    productsDiv += `
  <div class="col-lg-4 col-md-4 col-sm-6" >

  <div class="product__item">
    <div class="product__item__pic set-bg" data-setbg="img/product/product-4.jpg">
        <div class="label new">New</div>
        <ul class="product__hover">
            <li><a href="img/product/product-4.jpg" class="image-popup"><span class="arrow_expand"></span></a></li>
            <li><a href="#"><span class="icon_heart_alt"></span></a></li>
            <li><a href="#"><span class="icon_bag_alt"></span></a></li>
        </ul>
    </div>
    <div class="product__item__text">
        <h6><a href="#">${allProducts[i].name}</a></h6>
        <div class="product__price">$ ${allProducts[i].price}</div>
        <div><button class="btn btn-success" onclick="goToReservation(${allProducts[i].id})">Reserve</button></div>

    </div>
</div>
</div>     

  `;
  }

  document.getElementById("products").innerHTML = productsDiv;
}

function calcul(a, b) {
  return a + b;
}

function goToReservation(id) {
  var product = searchById(id);
  localStorage.setItem("reservedProduct", JSON.stringify(product));
  location.replace("reservation.html");
}

function injectName() {
  var product = JSON.parse(localStorage.getItem("reservedProduct"));
  document.getElementById("reservedProductName").value = product.name;
}

function validateReservation() {
  var qty = document.getElementById("qty").value;
  var resProduct = JSON.parse(localStorage.getItem("reservedProduct"));

  if (Number(resProduct.stock) >= Number(qty)) {
    // Stock disponible
    var id = JSON.parse(localStorage.getItem("orderId") || "1");
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    var order = {
      id: id,
      productId: resProduct.id,
      qty: qty,
      userId: connectedUser.id,
    };

    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.setItem("orderId", id + 1);
    document.getElementById("qtyError").innerHTML = "";

    var products = JSON.parse(localStorage.getItem("products"));

    for (var i = 0; i < products.length; i++) {
      if (products[i].id === resProduct.id) {
        products[i].stock = Number(products[i].stock) - Number(qty);
        resProduct.stock = products[i].stock;
      }
    }
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("reservedProduct", JSON.stringify(resProduct));
    location.replace('products.html');
  } else {
    document.getElementById(
      "qtyError"
    ).innerHTML = `Stock disponible : ${resProduct.stock} `;
    document.getElementById("qtyError").style.color = "red";
  }
}

function displayOrders() {
  var allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
  var connecteduser = JSON.parse(localStorage.getItem("connectedUser"));
  var orderTable = `
                        <table id='allProducts'>
                            <thead>
                                <tr>
                                    <th>Order N°</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>`;
  for (var i = 0; i < allOrders.length; i++) {
    if (allOrders[i].userId === connecteduser.id) {
      orderTable += `
                            
                                <tr>
                                    <td class="cart__product__item">
                                        <div class="cart__product__item__title">
                                            <h6>${allOrders[i].id}</h6>
                                        </div>
                                    </td>
                                    <td class="cart__price"> ${
                                      searchById(allOrders[i].productId).name
                                    }</td>
                                    <td class="cart__quantity">
                                    ${searchById(allOrders[i].productId).price}
                                    </td>
                                    <td class="cart__total">${
                                      allOrders[i].qty
                                    }</td>
                                    <td class="cart__total">${
                                      Number(allOrders[i].qty) *
                                      Number(
                                        searchById(allOrders[i].productId).price
                                      )
                                    }</td>
                                    
                                </tr>
    `;
    }
  }
  orderTable += `
                            </tbody>
                        </table>
    
    `;

  document.getElementById("ordersTable").innerHTML = orderTable;
}

function manageHeader() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  if (connectedUser) {
    var role = connectedUser.role;
    if (role === "admin") {
      var header = `
    <nav class="header__menu">
                        <ul>
                            <li><a href="addProduct.html">Add Product</a></li>
                            <li><a href="admin.html">Admin</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </nav>
    `;
    } else {
      var userOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      var s = 0;
      for (var i = 0; i < userOrders.length; i++) {
        if (userOrders[i].userId === connectedUser.id) {
          s += 1;
        }
      }
      var header = `
    <nav class="header__menu header__right__widget">
                        <ul>
                            <li class="active"><a href="./products.html">Home</a></li>
                            <li><a href="contact.html">Contact</a></li>
                            <li><a href="#">Panier</a></li>
                            <li><a href="panier.html"><span class="icon_bag_alt"></span>
                                    <div class="tip">${s}</div>
                                </a></li>
                        </ul>
                    </nav>
    `;
    }
    document.getElementById("myHeader").innerHTML = header;
  } else {
    var header = `
    <nav class="header__menu">
                        <ul>
                            <li class="active"><a href="./products.html">Home</a></li>
                            <li><a href="contact.html">Contact</a></li>

                        </ul>
                    </nav>
    `;
    var authModule = `
      <a href="login.html">Login</a>
      <a href="sign-up.html">Signup</a>`;
    document.getElementById("myHeader").innerHTML = header;
    document.getElementById("authModule").innerHTML = authModule;
  }

  if (connectedUser) {
    var authModule = `
      <a href="#"> Welcome ${connectedUser.firstName} </a>
      <a href="#" onclick='logout()'>Logout</a>
                            `;
  } else {
    var authModule = `
      <a href="login.html">Login</a>
      <a href="sign-up.html">Signup</a>`;
  }

  document.getElementById("authModule").innerHTML = authModule;
}

function logout() {
  localStorage.removeItem("connectedUser");
  location.replace("login.html");
}


function goToFacture() {
  location.replace('facture.html');
}

function invoice() {
  var allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
  var connecteduser = JSON.parse(localStorage.getItem("connectedUser"));
  var invoiceList = '';
  var subtotal = 0;
  for (var i = 0; i < allOrders.length; i++) {
    if (allOrders[i].userId === connecteduser.id) {
      var subtotal = subtotal + Number(allOrders[i].qty) * Number(
        searchById(allOrders[i].productId).price);

      invoiceList += `
          <tr>
            <td class="service">${searchById(allOrders[i].productId).category}</td>
            <td class="desc">${searchById(allOrders[i].productId).name}</td>
            <td class="unit">$ ${searchById(allOrders[i].productId).price}</td>
            <td class="qty">${allOrders[i].qty}</td>
            <td class="total">${
              Number(allOrders[i].qty) *
              Number(
                searchById(allOrders[i].productId).price
              )
            }</td>
          </tr>
    `;
    }
  }
  invoiceList+= `
  <tr>
                    <td colspan="4">SUBTOTAL</td>
                    <td class="total" >${Number(subtotal).toFixed(2)} DT</td>
                </tr>
                <tr>
                    <td colspan="4">TAX 19%</td>
                    <td class="total" >${subtotal * 0.19} DT</td>
                </tr>
                <tr>
                    <td colspan="4" class="grand total">GRAND TOTAL</td>
                    <td class="grand total" >${subtotal * 1.19} DT</td>
                </tr>`;
  document.getElementById('orders').innerHTML = invoiceList;
}

function clientInvoiceDetails() {
  var day = new Date();
  var invoiceDate = day.getFullYear() + '/' + Number(day.getMonth()+1) + '/' + day.getDate();
  var connecteduser = JSON.parse(localStorage.getItem("connectedUser"));
  document.getElementById('invoiceRef').innerHTML = '#'+invoiceDate;
  document.getElementById('userName').innerHTML = connecteduser.firstName;
  document.getElementById('userEmail').innerHTML = connecteduser.email;
  document.getElementById('invoiceDate').innerHTML = invoiceDate;
}