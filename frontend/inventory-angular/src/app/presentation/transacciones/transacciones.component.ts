import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TransaccionesHttpService } from '../../../app/infrastructure/transacciones-http.service';
import { Transaccion } from '../../../app/domain/models/transaccion.model';
import { PagedResult } from '../../../app/domain/models/paged-result.model';

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
})
export class TransaccionesComponent implements OnInit {
  transacciones: Transaccion[] = [];
  filterForm: FormGroup;
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  loading = false;
  displayedColumns = ['productoId', 'tipo', 'cantidad', 'precioTotal', 'fecha'];

  constructor(
    private service: TransaccionesHttpService,
    private fb: FormBuilder,
  ) {
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

  load(): void {
    this.loading = true;
    const { tipo, productoId, fechaDesde, fechaHasta } = this.filterForm.value;

    this.service
      .listar(
        this.pageIndex + 1,
        this.pageSize,
        tipo,
        productoId ? Number(productoId) : undefined,
        fechaDesde ? new Date(fechaDesde).toISOString() : undefined,
        fechaHasta ? new Date(fechaHasta).toISOString() : undefined,
      )
      .subscribe({
        next: (res: PagedResult<Transaccion>) => {
          this.transacciones = res.items;
          this.total = res.totalItems;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  applyFilter(): void {
    this.pageIndex = 0;
    this.load();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.load();
  }
}
