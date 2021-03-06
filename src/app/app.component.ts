import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { OktaAuthService } from '@okta/okta-angular';
import { BooksService } from './books/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Online Books';
  searchForm: FormGroup;
  isAuthenticated: boolean;

 constructor(private formBuilder: FormBuilder,
            private router: Router,
            public oktaAuth: OktaAuthService) {
  this.oktaAuth.$authenticationState.subscribe(
    (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
  );
}

  ngOnInit() {
    this.oktaAuth.isAuthenticated().then((auth) => {this.isAuthenticated = auth});
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
    });
  }

  onSearch() {
    if (!this.searchForm.valid) return;
    this.router.navigate(['search'], { queryParams: {query: this.searchForm.get('search').value}});
  }
}