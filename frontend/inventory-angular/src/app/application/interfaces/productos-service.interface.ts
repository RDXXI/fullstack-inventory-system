import { Observable } from 'rxjs';
import { Producto } from '../../domain/models/producto.model';
import { PagedResult } from '../../domain/models/paged-result.model';

export interface IProductosService {
  listar(
    pageNumber?: number,
    pageSize?: number,
    nombre?: string,
    categoria?: string,
  ): Observable<PagedResult<Producto>>;
  obtenerPorId(id: number): Observable<Producto>;
  crear(producto: Partial<Producto>): Observable<Producto>;
  actualizar(id: number, producto: Partial<Producto>): Observable<void>;
  eliminar(id: number): Observable<void>;
}
