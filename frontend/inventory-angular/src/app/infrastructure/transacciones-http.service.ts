import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Transaccion } from '../../app/domain/models/transaccion.model';
import { environment } from '../../../src/environments/environment';
import { PagedResult } from '../../app/domain/models/paged-result.model';
import { ITransaccionesService } from '../../app/application/interfaces/transacciones-service.interface';

@Injectable({
  providedIn: 'root',
})
export class TransaccionesHttpService implements ITransaccionesService {
  private base = `${environment.transaccionesApiBase}/api/Transacciones`;

  constructor(private http: HttpClient) {}

  listar(
    pageNumber = 1,
    pageSize = 10,
    tipo?: string,
    productoId?: number,
    fechaDesde?: string,
    fechaHasta?: string
  ): Observable<PagedResult<Transaccion>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (tipo) params = params.set('tipo', tipo);
    if (productoId) params = params.set('productoId', String(productoId));
    if (fechaDesde) params = params.set('fechaDesde', fechaDesde);
    if (fechaHasta) params = params.set('fechaHasta', fechaHasta);

    return this.http.get<any>(this.base, { params }).pipe(
      map((response) => {
        const items = response.items || [];
        const total = response.totalItems || 0;
        return {
          items: items,
          totalItems: total,
          pageNumber,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        } as PagedResult<Transaccion>;
      }),
      catchError((err) => this.handleError(err))
    );
  }

  obtenerPorId(id: number): Observable<Transaccion> {
    return this.http
      .get<Transaccion>(`${this.base}/${id}`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  crear(data: any): Observable<Transaccion> {
    return this.http.post<Transaccion>(this.base, data);
  }

  actualizar(id: number, data: any): Observable<Transaccion> {
    return this.http.put<Transaccion>(`${this.base}/${id}`, data);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
  private handleError(error: any) {
    console.error('Transacciones API error', error);
    return throwError(() => error);
  }
}
