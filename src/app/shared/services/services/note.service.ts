import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrlNote: string =
    'https://note-taking-web-app-backend-txde.onrender.com/api/notes';
  token: string | null = '';
  authorization = {
    Authorization: '',
  };
  constructor(private http: HttpClient, private authService: AuthService) {
    // this.getToken();
  }

  getTags() {
    const headers = this.createAuthorizationHeader();
    return this.http.get<string[]>(`${this.apiUrlNote}/tags`, { headers });
  }

  getNotes() {
    const headers = this.createAuthorizationHeader();
    return this.http.get<Note[]>(this.apiUrlNote, { headers });
  }

  getToken() {
    this.token = this.authService.getToken();
    this.authorization.Authorization = this.token as string;
  }

  private createAuthorizationHeader(): HttpHeaders {
    this.getToken(); // Assurez-vous que le token est mis à jour
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }
}

interface Note {
  _id: string;
  title: string;
  description: string;
  isArchived: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
