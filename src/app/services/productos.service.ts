import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { resolve, reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise( ( resolve, reject )=> {
     this.http.get('https://angula-html-9836a.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    });
  }

  getProducto(id: string) {
     return this.http
      .get(`https://angula-html-9836a.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ) {
    if ( this.productos.length === 0 ){
      // cargar productos
      this.cargarProductos().then( ()=>{
        // ejecutar depues de cargar productos
        // aplicar filtro
        this.filtrarProductos( termino );
      });
    } else {
      // apñicar filtro
      this.filtrarProductos( termino );
    }

  }

  private filtrarProductos( termino: string ) {
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach ( prod => {
      const titlolower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf( termino ) >= 0 || titlolower.indexOf( termino ) >= 0 ) {
        this.productosFiltrado.push ( prod );
      }
    });
  }
}
