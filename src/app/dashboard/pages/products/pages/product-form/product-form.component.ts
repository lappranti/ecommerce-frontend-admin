import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Notiflix from 'notiflix';
import { ApiService } from '../../../../../shared/services/services/api.service';

import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
  NgSelectConfig,
} from '@ng-select/ng-select';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit, AfterViewInit {
  apiUrl =
    'https://ecommerce-backend-backend-admin.onrender.com/admin/products';
  @Input() productId: string | undefined;

  status: string[] = ['ACTIVE', 'INACTIVE', 'DRAFT'];
  form!: FormGroup;
  posters: File[] = [];
  files: string[] = [];
  deletedImages: string[] = []; // Stocke les URLs des images supprimées

  product!: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private config: NgSelectConfig
  ) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    // set the bindValue to global config when you use the same
    // bindValue in most of the place.
    // You can also override bindValue for the specified template
    // by defining `bindValue` as property
    // Eg : <ng-select bindValue="some-new-value"></ng-select>
    this.config.bindValue = 'value';
  }

  ngAfterViewInit(): void {
    if (this.productId) {
      this.loadProduct();
    }
  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: ['Prod', [Validators.required]],
      description: ['Desc', [Validators.required]],
      category: ['Cat', [Validators.required]],
      price: ['1234', [Validators.required]],
      brand: ['Marque'],
      status: ['DRAFT'],
      availableQuantity: ['12', [Validators.required]],
    });
  }

  // Gestion de l'événement de changement de fichier
  handleFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);

      // Ajout des fichiers sélectionnés dans le tableau `poster`
      files.forEach((file) => {
        this.posters.push(file);
        this.files.push(URL.createObjectURL(file)); // Crée un aperçu pour l'affichage
      });
    }
  }

  // Supprimer un fichier spécifique
  // removeFile(file: string): void {
  //   const index = this.files.indexOf(file);
  //   if (index > -1) {
  //     this.files.splice(index, 1); // Retire l'aperçu
  //     this.posters.splice(index, 1); // Retire le fichier correspondant
  //   }
  // }
  removeFile(file: string): void {
    const index = this.files.indexOf(file);

    if (index > -1) {
      // Si le fichier est une URL (image existante), ajoute-le à `deletedImages`
      if (file.startsWith('http')) {
        this.deletedImages.push(file);
      } else {
        // Sinon, supprime l'image du tableau `posters`
        this.posters.splice(index - this.product.images.length, 1);
      }
      // Supprime le fichier des aperçus
      this.files.splice(index, 1);
    }
  }

  submit() {
    console.log(this.form.value);

    if (this.form.valid) {
      console.log(this.productId);

      if (this.productId) {
        this.update();
      } else {
        this.create();
      }
    }
  }

  // Création d'un nouveau produit
  create() {
    const formData = new FormData();

    // Ajout des champs du formulaire au FormData
    formData.append(
      'product',
      JSON.stringify({
        ...this.form.value,
      })
    );

    // Ajout des fichiers sélectionnés
    this.posters.forEach((file, index) => {
      formData.append(`images`, file);
    });

    // Envoi de la requête HTTP
    this.apiService.createProduct(formData).subscribe(
      (result: any) => {
        if (result.response) {
          Notiflix.Notify.success(result.message);
          this.router.navigate(['/dashboard/products']);
        } else if (result.errors) {
          Notiflix.Report.failure(result.message, '', 'OK');
        }
      },
      (err) => {
        Notiflix.Report.failure('Erreur lors de la création', '', 'OK');
      }
    );
  }

  // Modification d'un nouveau produit
  // update() {
  //   const formData = new FormData();

  //   // Ajout des champs du formulaire au FormData
  //   formData.append(
  //     'product',
  //     JSON.stringify({
  //       ...this.form.value,
  //     })
  //   );

  //   // Ajout des fichiers sélectionnés
  //   this.posters.forEach((file, index) => {
  //     formData.append(`images`, file);
  //   });

  //   // Envoi de la requête HTTP
  //   this.apiService.updateProduct(formData, this.productId!).subscribe(
  //     (result: any) => {
  //       if (result.response) {
  //         Notiflix.Notify.success(result.message);
  //         this.router.navigate(['/dashboard/products']);
  //       } else if (result.errors) {
  //         Notiflix.Report.failure(result.message, '', 'OK');
  //       }
  //     },
  //     (err) => {
  //       Notiflix.Report.failure('Erreur lors de la création', '', 'OK');
  //     }
  //   );
  // }

  update() {
    const formData = new FormData();

    // Ajout des champs du formulaire au FormData
    formData.append(
      'product',
      JSON.stringify({
        ...this.form.value,
      })
    );

    // Ajout des nouvelles images sélectionnées
    this.posters.forEach((file) => {
      formData.append('images', file);
    });

    // Ajout des images supprimées
    formData.append('deletedImages', JSON.stringify(this.deletedImages));

    // Envoi de la requête HTTP
    this.apiService.updateProduct(formData, this.productId!).subscribe(
      (result: any) => {
        if (result.response) {
          Notiflix.Notify.success(result.message);
          this.router.navigate(['/dashboard/products']);
        } else if (result.errors) {
          Notiflix.Report.failure(result.message, '', 'OK');
        }
      },
      (err) => {
        Notiflix.Report.failure('Erreur lors de la mise à jour', '', 'OK');
      }
    );
  }

  loadProduct() {
    if (this.productId) {
      this.apiService
        .getProductById(this.productId)
        .subscribe((result: any) => {
          if (result.response) {
            this.product = result.product;
            this.form.patchValue(this.product);

            this.product.images.forEach((image: any) => {
              this.files.push(image.url);
            });
          }
        });
    }
  }
}
