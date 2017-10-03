import { Routes } from '@angular/router';

import { MainComponent } from './main/main.component';

export const AppRoutes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' }
];
