import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store/models/app-state.model';
import { AppActions } from './store/actions/app.actions';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly store = inject(Store<AppState>);

  ngOnInit(): void {
    this.store.dispatch(AppActions.initializeApp());
  }
}
