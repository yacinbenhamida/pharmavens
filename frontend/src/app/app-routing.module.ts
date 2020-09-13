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
import { ProductsComparatorComponent } from './products-comparator/products-comparator.component';
import { RoleGuardService } from './services/roleguard.service';
import { PlanningComponent } from './planning/planning.component';


const routes: Routes = [
  {path : 'dashboard' , component : DashboardComponent , canActivate : [RoleGuardService],data : {role : ['admin','superviseur']}},
  {path : 'saisie-commandes', component : CommandesComponent, canActivate : [RoleGuardService],data : {role : ['admin','delege']}},
  {path : 'historique-commandes', component : CommandesHistoriqueComponent, canActivate : [RoleGuardService],data : {role : ['admin','delege']}},
  {path : 'profile', component : ProfileComponent, canActivate : [AuthGuardService]},
  {path : 'users', component : AdminUsersComponent, canActivate : [RoleGuardService],data : {role : ['admin']}},
  {path : 'products', component : ProductsComponent, canActivate : [RoleGuardService],data : {role : ['admin']}},
  {path : 'packs', component : PacksComponent, canActivate : [RoleGuardService],data : {role : ['admin','delege']}},
  {path : 'pharmacie-clients', component : ClientPharmaciesComponent, canActivate : [RoleGuardService],data : {role : ['admin','delege']}},
  {path : 'grossiste-clients', component : ClientGrossistesComponent, canActivate :[RoleGuardService],data : {role : ['admin','delege']}},
  {path : 'veille-concurentielle', component : ProductsVeillecComponent, canActivate : [RoleGuardService],data : {role : ['admin','delege']}},
  {path : 'veille-concurentielle-admin', component : ProductsVeillecAdminComponent, canActivate :[RoleGuardService],data : {role : ['admin','delege']}},
  {path : 'taches', component : TasksComponent, canActivate : [AuthGuardService]},
  {path : 'discussion/:id', component : TaskDiscussionComponent, canActivate : [AuthGuardService]},
  {path : 'reunions', component : ReunionsComponent, canActivate : [RoleGuardService],data : {role : ['admin']}},
  {path : 'contacts', component : ContactsComponent, canActivate : [AuthGuardService]},
  {path : 'evaluations', component : EvaluationsComponent, canActivate : [RoleGuardService],data : {role : ['admin','superviseur']}},
  {path : 'rapports', component : RapportsComponent, canActivate : [RoleGuardService],data : {role : ['admin','superviseur']}},
  {path : 'comparateur', component : ProductsComparatorComponent, canActivate : [RoleGuardService],data : {role : ['admin']}},
  {path : 'planning' , component : PlanningComponent},
  {path : 'login' , component : LoginComponent},
  { path: '', component: DashboardComponent, canActivate : [RoleGuardService],data : {role : ['admin','superviseur']} },
  {path : '**', redirectTo : ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
