// const socketClient = io();

// const productsContainer = document.getElementById("products")
// const buttonDelete = document.getElementById("buttonDel")

// productsContainer.addEventListener("click",(event)=>{
//     if(event.target.classList.contains('deleteButton')){
//         const id = event.target.parentElement.querySelector('.propsProds').textContent.split('Id: ')[1]
//         socketClient.emit('deleteProduct', id)
//     }
// })


// socketClient.on('saludoDesdeBack', (message)=>{
//     console.log(message);
//     socketClient.emit('getProducts', 'traeme los productos')
// })

// socketClient.on('allProducts', (data)=>{
//     let infoProducts = '';
//     data.map((prod)=>{
//         infoProducts += `
//         <div class="containerProds">
//         <h3 class="titleProds">Title: ${prod.title}</h3>
//         <p class="propsProds">Id: ${prod.id}</p>
//         <p class="propsProds">Code: ${prod.code}</p>
//         <p class="propsProds">Category: ${prod.category}</p>
//         <p class="propsProds">Description: ${prod.description}</p>
//         <p class="propsProds">Stock: ${prod.stock}</p>
//         <p class="propsProds">Price: $${prod.price}</p>
//         <button class="deleteButton" >Eliminar producto</button>
//         </div>
//         </br>
//         <hr>
//         `
//     })
//     products.innerHTML = infoProducts
// })

// const form = document.getElementById('form')
// const inputTitle = document.getElementById('title')
// const inputPrice = document.getElementById('price')
// const inputDescription = document.getElementById('description')
// const inputCode = document.getElementById('code')
// const inputStock = document.getElementById('stock')
// const inputCategory = document.getElementById('category')
// const products = document.getElementById('products')

// form.onsubmit = (e) => {
//     e.preventDefault();
//     const title = inputTitle.value;
//     const price = inputPrice.value;
//     const description = inputDescription.value;
//     const code = inputCode.value;
//     const stock = inputStock.value;
//     const category = inputCategory.value;
//     const product = {
//         title,
//         price,
//         description,
//         code,
//         stock,
//         category,
//     };
//     inputTitle.value = "";
//     inputPrice.value = "";
//     inputDescription.value = "";
//     inputCode.value = "";
//     inputStock.value = "";
//     inputCategory.value = "";
//     socketClient.emit('newProduct', product);
// }

// socketClient.on('products', (data)=>{
//     let infoProducts = '';
//     data.map((prod)=>{
//         infoProducts += `
//         <div class="containerProds">
//         <h3 class="titleProds">Title: ${prod.title}</h3>
//         <p class="propsProds">Id: ${prod.id}</p>
//         <p class="propsProds">Code: ${prod.code}</p>
//         <p class="propsProds">Category: ${prod.category}</p>
//         <p class="propsProds">Description: ${prod.description}</p>
//         <p class="propsProds">Stock: ${prod.stock}</p>
//         <p class="propsProds">Price: ${prod.price}</p>
//         </div>
//         </br>
//         `
//     })
//     products.innerHTML = infoProducts
// })