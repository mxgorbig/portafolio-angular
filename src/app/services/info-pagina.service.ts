import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
  export class InfoPaginaService {
    iinfo: InfoPagina = {};
    cargada = false;
    equipo: any[] = [];

    constructor( private http: HttpClient) {
      this.cargarInfo();
      this.cargarEquipo();
    }

  private cargarInfo() {
    this.http.get('assets/data/data-pagina.json')
      .subscribe((resp: InfoPagina) => {
        this.cargada = true;
        this.iinfo = resp;
      });
  }

  private cargarEquipo() {
    this.http
      .get("https://angula-html-9836a.firebaseio.com/equipo.json")
      .subscribe((resp: any[]) => {
        this.equipo = resp;
      });
  }
}
