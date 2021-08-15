import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseApiService } from '../api/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private baseApi: BaseApiService) {}
  public getAllClients() {
    return this.baseApi.get(`${environment.baseUrl}/clients`);
  }

  public fetchApproval(id) {
    return this.baseApi.get(`${environment.baseUrl}/clients/${id}`);
  }

  public addClient(payload) {
    return this.baseApi.post(`${environment.baseUrl}/clients`, payload);
  }

  public deleteClient(id) {
    return this.baseApi.delete(`${environment.baseUrl}/clients/${id}`);
  }
}
