import { Routes } from '@angular/router';

import { ClockComponent } from './clock';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      component: ClockComponent },
  { path: '**',    component: NoContentComponent },
];
