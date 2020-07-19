import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable()
export class RoleGuardService implements CanActivate {
    constructor(public auth: UserService, public router: Router) { }
    canActivate(activatedRoute: ActivatedRouteSnapshot): boolean {
        if (!this.auth.isAuthenticated()) {
            console.log('here')
            this.router.navigate(['/login']);
            return false;
        }
        let bool = false
        let u = this.auth.getLoggedOn().role
        console.log(u)
        if (activatedRoute.data.role &&
            activatedRoute.data.role.indexOf(u) === -1) {
            this.router.navigate(['/login']);
            bool = false
        }
        else bool = true
        return bool
    }
}