import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GraphQlService } from './services/graphql/graph-ql.service';
import { QueryService } from './services/query/query.service';
import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { ComponentsModule } from './components/components.module';
import { ToastService } from './services/toast/toast.service';
import { AlertService } from './services/alert/alert.service';
import { LoaderService } from './services/loader/loader.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PipeModule } from './pipes/pipe.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        ComponentsModule,
        PipeModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        IonicStorageModule.forRoot({
            name: 'cimef',
            driverOrder: ['websql', 'indexeddb']
        })
    ],
    providers: [
        GraphQlService,
        QueryService,
        StorageService,
        AuthService,
        ToastService,
        AlertService,
        LoaderService,
        StatusBar,
        SplashScreen,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
