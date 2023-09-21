import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouteExampleComponent } from './route-example/route-example.component';

import { AppService } from './app.service';
import { AppHttpInterceptorService } from './http-interceptor.service';
import { PrincipalComponent } from './components/principal/principal.component';
import { HeaderComponent } from './components/header/header.component';
import { PostComponent } from './components/post/post.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent
  },
  {
    path: 'contenido',
    component: RouteExampleComponent
  },
  {
    path: 'publicar',
    component: PostComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RouteExampleComponent,
    PrincipalComponent,
    HeaderComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'Csrf-Token',
      headerName: 'Csrf-Token',
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [
    AppService,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptorService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
