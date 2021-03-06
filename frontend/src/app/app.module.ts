import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SaisieFichesComponent } from './saisie-fiches/saisie-fiches.component';
import { HistoriqueFichesComponent } from './historique-fiches/historique-fiches.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { TopbarComponent } from './topbar/topbar.component';
import {DataTablesModule} from 'angular-datatables';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './services/authguard.service';
import { FooterComponent } from './footer/footer.component';
import { SmallModalComponent } from './small-modal/small-modal.component';
import { AdminUsersEditComponent } from './admin-users-edit/admin-users-edit.component';
import { ProductsComponent } from './products/products.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { PacksComponent } from './packs/packs.component';
import { ClientPharmaciesComponent } from './client-pharmacies/client-pharmacies.component';
import { ClientGrossistesComponent } from './client-grossistes/client-grossistes.component';
import { CommandesComponent } from './commandes/commandes.component';
import { CommandesHistoriqueComponent } from './commandes-historique/commandes-historique.component';
import { CommandeProduitItemComponent } from './commande-produit-item/commande-produit-item.component';
import { ProductsVeillecComponent } from './products-veillec/products-veillec.component';
import { ProductsVeillecAdminComponent } from './products-veillec-admin/products-veillec-admin.component';
import { registerLocaleData, CommonModule } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TasksComponent } from './tasks/tasks.component';
import { TaskElementComponent } from './task-element/task-element.component';
import { TaskDiscussionComponent } from './task-discussion/task-discussion.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { ReunionsComponent } from './reunions/reunions.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ContactsComponent } from './contacts/contacts.component';
import { EvaluationsComponent } from './evaluations/evaluations.component'; 
import { ChartsModule } from 'ng2-charts';
import { RapportsComponent } from './rapports/rapports.component';
import { RapportFormComponent } from './rapport-form/rapport-form.component';
import { ProductsComparatorComponent } from './products-comparator/products-comparator.component';
import { RoleGuardService } from './services/roleguard.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanningComponent } from './planning/planning.component';
import { LOCALE_ID } from '@angular/core';
import { PlanningPopupComponent } from './planning-popup/planning-popup.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OpportunitesComponent } from './opportunites/opportunites.component';

declare var $ : any;

registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    SaisieFichesComponent,
    HistoriqueFichesComponent,
    ProfileComponent,
    AdminUsersComponent,
    TopbarComponent,
    LoginComponent,
    FooterComponent,
    SmallModalComponent,
    AdminUsersEditComponent,
    ProductsComponent,
    ProductItemComponent,
    PacksComponent,
    ClientPharmaciesComponent,
    ClientGrossistesComponent,
    CommandesComponent,
    CommandesHistoriqueComponent,
    CommandeProduitItemComponent,
    ProductsVeillecComponent,
    ProductsVeillecAdminComponent,
    TasksComponent,
    TaskElementComponent,
    TaskDiscussionComponent,
    ReunionsComponent,
    ContactsComponent,
    EvaluationsComponent,
    RapportsComponent,
    RapportFormComponent,
    ProductsComparatorComponent,
    PlanningComponent,
    PlanningPopupComponent,
    OpportunitesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    LoadingBarHttpClientModule,
    NgxPaginationModule,
    ChartsModule,
    NgbModalModule,
    CommonModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [AuthGuardService,RoleGuardService,  { provide: LOCALE_ID, useValue: "fr-FR" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
