// Espera a que la página esté lista para empezar a trabajar con el código
document.addEventListener('DOMContentLoaded', () => {


    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


    const guardarCarrito = () => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };


    const mostrarCarrito = () => {
        const listaCarrito = document.getElementById('lista-carrito');
        const totalCarritoElemento = document.getElementById('total-carrito');

     
        if (listaCarrito) {
            listaCarrito.innerHTML = '';
        }

        let total = 0;

    
        carrito.forEach(producto => {
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;

         
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';

          
            const nombreCantidad = document.createElement('div');
            nombreCantidad.textContent = `${producto.nombre} (x${producto.cantidad})`;

            
            const precioProducto = document.createElement('span');
            precioProducto.className = 'badge bg-primary rounded-pill';
            precioProducto.textContent = `$${subtotal.toLocaleString('es-CL')}`;

            li.appendChild(nombreCantidad);
            li.appendChild(precioProducto);

            
            if (listaCarrito) {
                listaCarrito.appendChild(li);
            }
        });

        
        if (totalCarritoElemento) {
            totalCarritoElemento.textContent = `$${total.toLocaleString('es-CL')}`;
        }
    };

    
    const agregarAlCarrito = (nombre, precio) => {
        // Busca si el perfume ya está en el carrito
        const productoExistente = carrito.find(producto => producto.nombre === nombre);

        if (productoExistente) {
           
            productoExistente.cantidad++;
        } else {
            
            carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
        }
        guardarCarrito(); 
        mostrarCarrito(); 
    };


    document.querySelectorAll('.boton-agregar-carrito').forEach(boton => {
        boton.addEventListener('click', (event) => {
            const card = event.target.closest('.card');
            const nombre = card.dataset.perfumeNombre;
            const precio = parseInt(card.dataset.perfumePrecio);
            
            agregarAlCarrito(nombre, precio);
        });
    });

    mostrarCarrito();
});