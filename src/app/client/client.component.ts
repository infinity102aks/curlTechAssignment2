import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClientService } from './client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  client = null;
  registered = false;
  loading = false;
  interval = null;
  clientForm = this.fb.group({
    id: [null, Validators.required],
    name: [null, Validators.required],
    company: [null, Validators.required],
  });

  private $allClielntsSub: Subscription;
  private $addClientSub: Subscription;
  private $fetchApprovalSub: Subscription;
  private $logoutSub: Subscription;
  constructor(private service: ClientService, private fb: FormBuilder) {}

  ngOnInit(): void {
    let data = localStorage.getItem('client');
    this.client = JSON.parse(data);
    if (this.client) {
      this.registered = true;
      this.fetchApproval();
      this.interval = setInterval(() => {
        this.fetchApproval();
      }, 5000);
    }
  }

  fetchApproval() {
    if (this.client)
      this.$fetchApprovalSub = this.service
        .fetchApproval(this.client._id)
        .subscribe((response) => {
          this.client = response;
          localStorage.setItem('client', JSON.stringify(response));
        });
    else {
      this.registered = false;
      this.client = null;

      clearInterval(this.interval);
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$allClielntsSub?.unsubscribe();
    this.$addClientSub?.unsubscribe();
    this.$fetchApprovalSub?.unsubscribe();
    this.$logoutSub?.unsubscribe();
    clearInterval();
  }

  register() {
    this.loading = true;
    this.clientForm.patchValue({
      id: new Date().toISOString(),
    });
    this.clientForm.updateValueAndValidity();
    if (this.clientForm.valid) {
      this.$addClientSub = this.service
        .addClient(this.clientForm.value)
        .subscribe(
          (response) => {
            if (response) {
              this.registered = true;
              this.loading = false;
              localStorage.setItem('client', JSON.stringify(response));
              this.client = response;
              this.interval = this.fetchApproval();
              setInterval(() => {
                this.fetchApproval();
              }, 5000);
            }
          },
          (err) => {
            this.loading = false;
          }
        );
    } else this.clientForm.markAllAsTouched();
  }

  logout() {
    this.loading = true;
    this.$logoutSub = this.service
      .deleteClient(this.client._id)
      .subscribe((response) => {
        localStorage.removeItem('client');
        this.client = null;
        this.registered = false;
        this.loading = false;
        clearInterval(this.interval);
      });
  }
}
