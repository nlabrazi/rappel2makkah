import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  Article,
  CreateArticleDto,
  UpdateArticleDto,
} from "../interfaces/article.interface";
import { environment } from "../../../environments/environment";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class ArticleService {
  private apiUrl = "/api/articles";

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    if (isPlatformServer(this.platformId)) {
      console.log(
        `🔍 Mode SSR détecté, environment.production = ${environment.production}`,
      );

      if (environment.production) {
        this.apiUrl = "http://api:3000/api/articles"; // En Docker
      } else {
        this.apiUrl = "http://localhost:3000/api/articles"; // En local
      }
    } else {
      this.apiUrl = `${environment.apiUrl}/articles`; // Proxy en mode navigateur
    }

    console.log(`📡 API URL utilisée : ${this.apiUrl}`);

    console.log(`📡 API URL utilisée: ${this.apiUrl}`);

    if (isPlatformBrowser(this.platformId)) {
      console.log(
        `🌍 Mode CSR détecté, API URL utilisée dans le navigateur : ${this.apiUrl}`,
      );
    }
  }

  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  getOne(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  create(article: CreateArticleDto): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }

  update(id: number, article: UpdateArticleDto): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${id}`, article);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
