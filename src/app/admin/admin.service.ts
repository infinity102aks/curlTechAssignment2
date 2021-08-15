import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseApiService } from '../api/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private baseApi: BaseApiService) {}

  public getAllClients() {
    return this.baseApi.get(`${environment.baseUrl}/clients`);
  }

  public approveClient(id) {
    return this.baseApi.get(`${environment.baseUrl}/approve/${id}`);
  }

  public deleteClient(id) {
    return this.baseApi.delete(`${environment.baseUrl}/clients/${id}`);
  }
}
