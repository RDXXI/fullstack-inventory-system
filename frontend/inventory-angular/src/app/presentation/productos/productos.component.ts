import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductosHttpService } from '../../../app/infrastructure/productos-http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Producto } from '../../../app/domain/models/producto.model';
import { PagedResult } from '../../../app/domain/models/paged-result.model';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent {
  productos: Producto[] = [];
  loading = false;
  pageNumber = 1;
  pageSize = 10;
  totalItems = 0;
  filterForm: FormGroup;

  constructor(
    private productosService: ProductosHttpService,
    private fb: FormBuilder,
  ) {
    this.filterForm = this.fb.group({ nombre: [''], categoria: [''] });
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    const { nombre, categoria } = this.filterForm.value;
    this.productosService.listar(this.pageNumber, this.pageSize, nombre, categoria).subscribe({
      next: (res: PagedResult<Producto>) => {
        this.productos = res.items;
        this.totalItems = res.totalItems;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onPageChange(e: any) {
    this.pageNumber = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.load();
  }

  onFilter() {
    this.pageNumber = 1;
    this.load();
  }
  clearFilter() {
    this.filterForm.reset();
    this.onFilter();
  }
}
