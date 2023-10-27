import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import * as config from '../app/auth_config.json';
import { routes } from './app.routes';

const { domain, clientId, authorizationParams: { audience }, apiUri, errorPath } = config as {
    domain: string;
    clientId: string;
    authorizationParams: {
        audience: string;
    },
    apiUri: string;
    errorPath: string;
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom(
            BrowserModule,
            MatButtonModule,
            MatIconModule,
            MatCardModule,
            MatToolbarModule,
            MatListModule,
            MatCheckboxModule,
            MatDialogModule,
            MatInputModule,
            MatFormFieldModule,
            FormsModule,
            AuthModule.forRoot({
                domain: domain,
                clientId: clientId,
                authorizationParams: {
                    ...{ audience },
                    redirect_uri: window.location.origin,
                },
                httpInterceptor: {
                    allowedList: [
                        {
                            uri: 'https://localhost:5001/api/*',
                        },
                    ]
                }
            })),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true
        },
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
};
