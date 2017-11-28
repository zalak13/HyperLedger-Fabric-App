import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { ArticleComponent } from './Article/Article.component';
import { UserComponent } from './User/User.component';

const routes: Routes = [
//    {path: 'Transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},

		{ path: 'Article', component: ArticleComponent},
		{ path: 'User', component: UserComponent},

		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
