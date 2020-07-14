import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SaisieFichesComponent } from './saisie-fiches/saisie-fiches.component';
import { HistoriqueFichesComponent } from './historique-fiches/historique-fiches.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/authguard.service';
import { ProductsComponent } from './products/products.component';
import { PacksComponent } from './packs/packs.component';
import { ClientPharmaciesComponent } from './client-pharmacies/client-pharmacies.component';
import { ClientGrossistesComponent } from './client-grossistes/client-grossistes.component';
import { CommandesComponent } from './commandes/commandes.component';
import { CommandesHistoriqueComponent } from './commandes-historique/commandes-historique.component';
import { ProductsVeillecComponent } from './products-veillec/products-veillec.component';
import { ProductsVeillecAdminComponent } from './products-veillec-admin/products-veillec-admin.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDiscussionComponent } from './task-discussion/task-discussion.component';
import { ReunionsComponent } from './reunions/reunions.component';
import { ContactsComponent } from './contacts/contacts.component';
import { EvaluationsComponent } from './evaluations/evaluations.component';
import { RapportsComponent } from './rapports/rapports.component';


const routes: Routes = [
  {path : 'dashboard' , component : DashboardComponent , canActivate : [AuthGuardService]},
  {path : 'saisie-commandes', component : CommandesComponent, canActivate : [AuthGuardService]},
  {path : 'historique-commandes', component : CommandesHistoriqueComponent, canActivate : [AuthGuardService]},
  {path : 'profile', component : ProfileComponent, canActivate : [AuthGuardService]},
  {path : 'users', component : AdminUsersComponent, canActivate : [AuthGuardService]},
  {path : 'products', component : ProductsComponent, canActivate : [AuthGuardService]},
  {path : 'packs', component : PacksComponent, canActivate : [AuthGuardService]},
  {path : 'pharmacie-clients', component : ClientPharmaciesComponent, canActivate : [AuthGuardService]},
  {path : 'grossiste-clients', component : ClientGrossistesComponent, canActivate : [AuthGuardService]},
  {path : 'veille-concurentielle', component : ProductsVeillecComponent, canActivate : [AuthGuardService]},
  {path : 'veille-concurentielle-admin', component : ProductsVeillecAdminComponent, canActivate : [AuthGuardService]},
  {path : 'taches', component : TasksComponent, canActivate : [AuthGuardService]},
  {path : 'discussion/:id', component : TaskDiscussionComponent, canActivate : [AuthGuardService]},
  {path : 'reunions', component : ReunionsComponent, canActivate : [AuthGuardService]},
  {path : 'contacts', component : ContactsComponent, canActivate : [AuthGuardService]},
  {path : 'evaluations', component : EvaluationsComponent, canActivate : [AuthGuardService]},
  {path : 'rapports', component : RapportsComponent, canActivate : [AuthGuardService]},
  {path : 'login' , component : LoginComponent},
  { path: '', component: DashboardComponent, canActivate : [AuthGuardService] },
  {path : '**', redirectTo : ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
