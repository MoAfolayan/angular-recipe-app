import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

import { AuthModule } from '@auth0/auth0-angular';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RecipesComponent } from './recipe/components/recipes/recipes.component';
import { RecipeDetailsComponent } from './recipe/components/recipe-details/recipe-details.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import * as config from './auth_config.json';

const { domain, clientId, authorizationParams: { audience }, apiUri, errorPath } = config as {
    domain: string;
    clientId: string;
    authorizationParams: {
        audience: string;
    },
    apiUri: string;
    errorPath: string;
};

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RecipesComponent,
        RecipeDetailsComponent,
        ConfirmDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatCardModule,
        MatToolbarModule,
        MatListModule,
        MatCheckboxModule,
        MatDialogModule,
        AuthModule.forRoot({
            domain: domain,
            clientId: clientId,
            authorizationParams: {
                ...{ audience },
                redirect_uri: window.location.origin,
            },

            // The AuthHttpInterceptor configuration
            httpInterceptor: {
                allowedList: [

                    {
                        uri: 'https://localhost:5001/api/*',
                    },

                    // Match anything starting with /api/accounts, but also specify the audience and scope the attached
                    // access token must have
                    {
                        uri: '/api/accounts/*',
                    },

                    // Matching on HTTP method
                    {
                        uri: '/api/orders',
                        httpMethod: 'post',
                    },

                    // Using an absolute URI
                    {
                        uri: 'https://your-domain.auth0.com/api/v2/users',
                    }
                ]
            }
        })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
