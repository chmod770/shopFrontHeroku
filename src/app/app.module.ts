import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ItemService } from "./shared_service/item.service";
import { HttpModule } from "@angular/http";


import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import {RouterModule, Routes} from "@angular/router";
import {CategoryService} from "./shared_service/category.service";
import { ItempageComponent } from './components/itempage/itempage.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const appRoutes:Routes=[
  //here we ad routes/ where after ':' sign is type of component
  {path:'',
    component:HomepageComponent},
  {path:':pageNumber',
    component:HomepageComponent},
  {path:'item',
    component:HomepageComponent},
  {path:'items/itemsWithCategoryId/:categoryId',
    component:HomepageComponent},
  {path:'item/:itemId',
    component:ItempageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ItempageComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,//we have too add http module because in the opposite way will in trouble
    RouterModule.forRoot(appRoutes)//if we don't add this, our rout-outlet will be not foud
  ],
  providers: [ItemService,CategoryService],//adding service to application
  bootstrap: [AppComponent]
})
export class AppModule { }
