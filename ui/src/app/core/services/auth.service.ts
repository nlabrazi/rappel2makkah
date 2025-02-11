import { Injectable, PLATFORM_ID, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { AuthResponse, User } from "../interfaces/auth.interface";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem("token");
      if (token) {
        const user = this.getUserFromToken(token);
        this.currentUserSubject.next(user);
      }
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>("/api/auth/login", { email, password })
      .pipe(
        tap((response: AuthResponse) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem("token", response.access_token);
            const user = this.getUserFromToken(response.access_token);
            this.currentUserSubject.next(user);
          }
        }),
      );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("token");
      this.currentUserSubject.next(null);
    }
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem("token");
    }
    return false;
  }

  isAdmin(): Observable<boolean> {
    return this.currentUser$.pipe(map((user) => user?.role === "admin"));
  }

  private getUserFromToken(token: string): User {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
