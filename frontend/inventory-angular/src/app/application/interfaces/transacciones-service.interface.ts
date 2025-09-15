import { Observable } from 'rxjs';
import { Transaccion } from '../../domain/models/transaccion.model';
import { PagedResult } from '../../domain/models/paged-result.model';

export interface ITransaccionesService {
  listar(
    pageNumber?: number,
    pageSize?: number,
    tipo?: string,
    productoId?: number,
    fechaDesde?: string,
    fechaHasta?: string,
  ): Observable<PagedResult<Transaccion>>;
  obtenerPorId(id: number): Observable<Transaccion>;
  crear(transaccion: Partial<Transaccion>): Observable<Transaccion>;
}
