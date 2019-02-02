import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcion;
  productoID: string;

  constructor( private route: ActivatedRoute,
               public roductoService: ProductosService) { }
  ngOnInit() {
    this.route.params
    .subscribe( parametros => {
      this.roductoService.getProducto(parametros['id'])
          .subscribe( (producto: ProductoDescripcion) => {
            this.productoID = parametros['id'];
            this.producto = producto;
          })
      ;

    });
  }

}
