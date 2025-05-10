import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string =
    'https://ecommerce-backend-backend-admin.onrender.com/admin/products';
  token: string | null = '';
  authorization = {
    Authorization: '',
  };
  constructor(private http: HttpClient, private authService: AuthService) {
    // this.getToken();
  }

  getAllProducts(page: number, limit: number, search: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(
      `${this.baseUrl}?page=${page}&limit=${limit}&search=${search}`,
      {
        headers,
      }
    );
  }

  getProductById(id: string) {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${this.baseUrl}/id/${id}`, {
      headers,
    });
  }

  createProduct(payload: FormData) {
    const headers = this.createAuthorizationHeader();
    return this.http.post(this.baseUrl, payload, {
      headers,
    });
  }

  updateProduct(payload: FormData, id: string) {
    const headers = this.createAuthorizationHeader();
    return this.http.put(`${this.baseUrl}/${id}`, payload, {
      headers,
    });
  }

  deleteProduct(id: string) {
    const headers = this.createAuthorizationHeader();
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers,
    });
  }

  private getToken() {
    this.token = this.authService.getToken();
    // console.log(this.token);
    return this.token;
  }

  private createAuthorizationHeader(): HttpHeaders {
    // Assurez-vous que le token est mis à jour
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
  }
}
