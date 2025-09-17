import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './presentation/productos/productos.component';
import { TransaccionesComponent } from './presentation/transacciones/transacciones.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductosComponent, TransaccionesComponent],
  template: `
    <div class="app-container">
      <app-productos></app-productos>
      <app-transacciones></app-transacciones>
    </div>
  `,
  styleUrls: ['./app.scss'],
})
export class AppComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Sistema de Gestión');
  }
}
