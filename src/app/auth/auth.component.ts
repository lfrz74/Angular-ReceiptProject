import { 
    Component, 
    ComponentFactoryResolver, 
    OnDestroy, 
    ViewChild 
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { AuthResponseData, AuthService } from "./auth.service";
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
    private closeSub: Subscription;

    constructor(private authService: AuthService,
                private router: Router,
                private componentFactoryResolver: ComponentFactoryResolver) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return; //Extra validation in case of hacking manually
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>

        this.isLoading = true;
        
        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorRes => {
                console.log(errorRes);
                this.error = errorRes;
                this.showErrorAlert(errorRes);
                this.isLoading = false;
            }
        );

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    ngOnDestroy() {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }

    private showErrorAlert(message: string) {
        //Parece que invoca como con reflection, pero esta echo 3 atados v
        //en efecto eso mismo es, chove
        const alertCmpFactory = 
            this.componentFactoryResolver.resolveComponentFactory(
                AlertComponent
            );
        
        const hostViewContainerRef = this.alertHost.viewContainerRef
        hostViewContainerRef.clear();

        const componentRef = 
            hostViewContainerRef.createComponent(alertCmpFactory);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}