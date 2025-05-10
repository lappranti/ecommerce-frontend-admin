import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../../../shared/services/services/api.service';
import Notiflix from 'notiflix';
import { debounceTime, merge, startWith, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'position',
    'image',
    'name',
    'categories',
    'price',
    'stock',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  product: any;
  total: number = 0;
  page: number = 1;
  limit: number = 10;
  searchControl = new FormControl();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // this.getAllProducts();
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.getAllProducts();
  // }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    merge(
      this.paginator.page, // Quand le paginator change,
      this.searchControl.valueChanges.pipe(debounceTime(300))
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.loadItems();
        })
      )
      .subscribe((data: any) => {
        this.setupData(data);
      });
  }

  loadItems() {
    // return this.fetchSousThemes.fetch(
    //   {
    //     queryFilter: {
    //       limit: this.paginator?.pageSize || 10,
    //       page: this.paginator?.pageIndex + 1 || 0,
    //       search: this.searchControl.value,
    //     },
    //   },
    //   { fetchPolicy: 'no-cache' }
    // );
    return this.apiService.getAllProducts(
      this.paginator?.pageIndex + 1 || this.page,
      this.paginator?.pageSize || this.limit,
      this.searchControl.value || ''
    );
  }

  setupData(data: any) {
    this.dataSource = new MatTableDataSource(data.products);
    this.page = data.pagination.page;
    this.limit = data.pagination.limit;
    this.total = data.pagination.total;
  }

  onPageCange() {}

  openDialogDelete(id: string): void {
    Notiflix.Confirm.show(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer ce produit ?',
      'Yes',
      'No',
      () => {
        this.apiService.deleteProduct(id).subscribe(
          (result) => {
            if (result) {
              Notiflix.Notify.success('Le produit a été suprimé avec succés');
              this.loadItems().subscribe((result) => {
                this.setupData(result);
              });
            }
          },
          (err) => {
            Notiflix.Report.failure('Erreur lors de la supréssion', err, 'OK');
          }
        );
      }
    );
  }
}
