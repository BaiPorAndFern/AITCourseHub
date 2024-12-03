import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessComponent } from './success/success.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
{
path: 'auth',
loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule)
},
{
  path: 'chats',
  loadChildren:() => import('./chat/chat.module').then(m => m.ChatModule),
  canActivate: [AuthGuard]
},
{
  path: 'success',
  component: SuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
