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
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/authguard.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
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
    CommandeProduitItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
