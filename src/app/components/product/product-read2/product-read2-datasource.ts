import { Product } from './../product.model';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';



// TODO: replace this with real data from your application
const EXAMPLE_DATA: Product[] = [
  {id: 1, sNomeProduto: 'PROTETOR SOLAR FACIAL EPISOL COLOR PELE CLARA FPS70', sDescricaoProduto: 'PROTETOR SOLAR FACIAL', iCodCategoria: 1, iCodFabricante: 1, iCodTipoProduto: 1, sCodAnvisa: '12345', fPrecoVenda: 81.90, fPrecoPromocional: 56.99, ibHabilitaPromocao: 0, ibNecessitaReceita: 0, sDescricaoBula: ''},
  {id: 2, sNomeProduto: 'GENACOL 400MG', sDescricaoProduto: 'COLÁGENO COMPOSTO POR AMINOÁCIDOS', iCodCategoria: 1, iCodFabricante: 1, iCodTipoProduto: 1, sCodAnvisa: 'COL1587456', fPrecoVenda: 145.90, fPrecoPromocional: 125.90, ibHabilitaPromocao: 0, ibNecessitaReceita: 0, sDescricaoBula: ''},
  {id: 3, sNomeProduto: 'ESTIMULADOR NEUROMUSCULAR TANYX', sDescricaoProduto: 'ADESIVO ELETRÔNICO', iCodCategoria: 1, iCodFabricante: 1, iCodTipoProduto: 1, sCodAnvisa: '', fPrecoVenda: 127.99, fPrecoPromocional: 112.99, ibHabilitaPromocao: 0, ibNecessitaReceita: 0, sDescricaoBula: ''},
  {id: 4, sNomeProduto: 'ESTOMAZIL SABOR GUARANÁ', sDescricaoProduto: 'TRATAMENTO DE ACIDEZ ESTOMACAL', iCodCategoria: 1, iCodFabricante: 1, iCodTipoProduto: 1, sCodAnvisa: '', fPrecoVenda: 2.64, fPrecoPromocional: 0.00, ibHabilitaPromocao: 0, ibNecessitaReceita: 0, sDescricaoBula: ''},
  {id: 5, sNomeProduto: 'NIQUITIN 21 MG', sDescricaoProduto: 'ADESIVO DE AUXILIO PARA PARAR DE FUMAR', iCodCategoria: 1, iCodFabricante: 1, iCodTipoProduto: 1, sCodAnvisa: '12345', fPrecoVenda: 86.07, fPrecoPromocional: 64.55, ibHabilitaPromocao: 0, ibNecessitaReceita: 0, sDescricaoBula: ''},
];

/**
 * Data source for the ProductRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductRead2DataSource extends DataSource<Product> {
  data: Product[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Product[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Product[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Product[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'sNomeProduto': return compare(a.id, b.sNomeProduto, isAsc);
        case 'iCodProduto': return compare(+a.id, +b.sNomeProduto, isAsc);
        case 'sDescricaoProduto': return compare(+a.id, +b.sDescricaoProduto, isAsc);
        case 'fPrecoVenda': return compare(+a.id, +b.fPrecoVenda, isAsc);
        case 'sCodAnvisa': return compare(+a.id, +b.sCodAnvisa, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
