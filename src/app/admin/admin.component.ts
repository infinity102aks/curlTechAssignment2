import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  private $upapprovedClientsSub: Subscription;
  private $approveClientSub: Subscription;
  private $logoutSub: Subscription;
  private interval = null;
  clients = [];

  constructor(private service: AdminService) {}

  ngOnInit(): void {
    this.getAllClients();
    this.interval = setInterval(() => {
      this.getAllClients();
    }, 10000);
  }

  approve(client) {
    this.clients = [];
    this.$approveClientSub = this.service
      .approveClient(client._id)
      .subscribe((response) => {
        this.getAllClients();
      });
  }

  getAllClients() {
    this.$upapprovedClientsSub = this.service
      .getAllClients()
      .subscribe((response) => {
        this.clients = response;
      });
  }

  remove(client) {
    this.$logoutSub = this.service
      .deleteClient(client._id)
      .subscribe((response) => {
        this.getAllClients();
        localStorage.removeItem('client');
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$upapprovedClientsSub?.unsubscribe();
    this.$approveClientSub?.unsubscribe();
    this.$logoutSub?.unsubscribe();
    clearInterval(this.interval);
  }
}
