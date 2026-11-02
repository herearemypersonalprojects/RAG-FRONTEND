import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService {
  private readonly _accessToken = signal<string | null>(null);

  readonly isAuthenticated = () => this._accessToken() !== null;

  getAccessToken(): string | null {
    return this._accessToken();
  }

  setAccessTokenFromLogin(token: string): void {
    this._accessToken.set(token);
  }

  clear(): void {
    this._accessToken.set(null);
  }
}
