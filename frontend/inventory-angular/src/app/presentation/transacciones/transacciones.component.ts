import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { TransaccionesHttpService } from '../../../app/infrastructure/transacciones-http.service';
import { Transaccion } from '../../../app/domain/models/transaccion.model';
import { PagedResult } from '../../../app/domain/models/paged-result.model';
import { CustomPaginator } from '../../shared/custom-paginator-intl';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useFactory: CustomPaginator }],
})
export class TransaccionesComponent {
  transacciones: Transaccion[] = [];
  filterForm: FormGroup;
  loading = false;
  pageNumber = 1;
  pageSize = 10;
  totalItems = 0;
  displayedColumns = ['productoId', 'tipo', 'cantidad', 'precioTotal', 'fecha'];

  constructor(private service: TransaccionesHttpService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      tipo: [''],
      productoId: [''],
      fechaDesde: [''],
      fechaHasta: [''],
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    const { tipo, productoId, fechaDesde, fechaHasta } = this.filterForm.value;

    this.service
      .listar(
        this.pageNumber,
        this.pageSize,
        tipo,
        productoId ? Number(productoId) : undefined,
        fechaDesde ? new Date(fechaDesde).toISOString() : undefined,
        fechaHasta ? new Date(fechaHasta).toISOString() : undefined
      )
      .subscribe({
        next: (res: PagedResult<Transaccion>) => {
          this.transacciones = res.items;
          this.totalItems = res.totalItems;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading transacciones:', err);
          this.loading = false;
        },
      });
  }

  onPageChange(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
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
