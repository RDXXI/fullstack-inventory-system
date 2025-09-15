import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Producto } from '../../app/domain/models/producto.model';
import { environment } from '../../../src/environments/environment';
import { PagedResult } from '../../app/domain/models/paged-result.model';
import { IProductosService } from '../../app/application/interfaces/productos-service.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductosHttpService implements IProductosService {
  private base = `${environment.productosApiBase}/api/Productos`;

  constructor(private http: HttpClient) {}

  listar(
    pageNumber = 1,
    pageSize = 10,
    nombre?: string,
    categoria?: string,
  ): Observable<PagedResult<Producto>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (nombre) params = params.set('nombre', nombre);
    if (categoria) params = params.set('categoria', categoria);

    return this.http.get<Producto[]>(this.base, { params, observe: 'response' }).pipe(
      map((response) => {
        const items = response.body || [];
        const total = Number(response.headers.get('X-Total-Count')) || items.length;
        const totalPages = Math.ceil(total / pageSize);
        return {
          items,
          totalItems: total,
          pageNumber,
          pageSize,
          totalPages,
        } as PagedResult<Producto>;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  obtenerPorId(id: number): Observable<Producto> {
    return this.http
      .get<Producto>(`${this.base}/${id}`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  crear(producto: Partial<Producto>): Observable<Producto> {
    return this.http
      .post<Producto>(this.base, producto)
      .pipe(catchError((err) => this.handleError(err)));
  }

  actualizar(id: number, producto: Partial<Producto>): Observable<void> {
    return this.http
      .put<void>(`${this.base}/${id}`, producto)
      .pipe(catchError((err) => this.handleError(err)));
  }

  eliminar(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.base}/${id}`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(error: any) {
    console.error('Productos API error', error);
    return throwError(() => error);
  }
}
