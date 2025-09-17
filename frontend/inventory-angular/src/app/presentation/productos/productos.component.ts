import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductosHttpService } from '../../../app/infrastructure/productos-http.service';
import { Producto } from '../../../app/domain/models/producto.model';
import { PagedResult } from '../../../app/domain/models/paged-result.model';
import { CustomPaginator } from '../../shared/custom-paginator-intl';

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
    MatButtonModule,
  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useFactory: CustomPaginator }],
})
export class ProductosComponent {
  productos: Producto[] = [];
  loading = false;
  pageNumber = 1;
  pageSize = 10;
  totalItems = 0;
  filterForm: FormGroup;
  showForm = false;
  editando = false;
  productoForm: FormGroup;
  productoEditandoId: number | null = null;

  constructor(private productosService: ProductosHttpService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({ nombre: [''], categoria: [''] });

    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      imagenUrl: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    });
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
      error: () => (this.loading = false),
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

  abrirFormulario() {
    this.showForm = true;
    this.editando = false;
    this.productoEditandoId = null;
    this.productoForm.reset({
      nombre: '',
      descripcion: '',
      categoria: '',
      imagenUrl: '',
      precio: 0,
      stock: 0,
    });
  }

  cerrarFormulario() {
    this.showForm = false;
  }

  editarProducto(p: Producto) {
    this.showForm = true;
    this.editando = true;
    this.productoEditandoId = p.id!;
    this.productoForm.patchValue(p);
  }

  guardarProducto() {
    if (this.productoForm.invalid) return;

    const producto = this.productoForm.value as Producto;

    if (this.editando && this.productoEditandoId) {
      this.productosService.actualizar(this.productoEditandoId, producto).subscribe(() => {
        this.cerrarFormulario();
        this.load();
      });
    } else {
      this.productosService.crear(producto).subscribe(() => {
        this.cerrarFormulario();
        this.load();
      });
    }
  }
}
