import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  private defalutHeader: HttpHeaders;

  constructor(private http: HttpClient) {
    this.defalutHeader = new HttpHeaders({
      Authorization: `Basic ${localStorage.getItem('user-token')}`,
    });
  }

  get(url: string) {
    const response: Observable<any> = this.http.get(url, {
      headers: this.defalutHeader,
    });
    return response;
  }

  delete(url: string) {
    const response: Observable<any> = this.http.delete(url, {
      headers: this.defalutHeader,
    });
    return response;
  }

  post(url: string, payload: any): Observable<any> {
    const response: Observable<any> = this.http.post(url, payload, {
      headers: this.defalutHeader,
    });
    return response;
  }
}
