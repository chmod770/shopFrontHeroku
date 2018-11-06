import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {catchError} from "rxjs/internal/operators";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/index";
import {Category} from "../category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl:string = "https://boiling-beyond-17763.herokuapp.com/api/categories";
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});// here we put our header
  private category = new Category();
  constructor( private _http:Http){}

  getCategories(){
    //return value from http query get in json which is written in options by header
    return this._http.get(this.baseUrl+'/all',this.options)
      .pipe(map((response:Response)=>response.json()),catchError(this.errorHandler));
    //this snake is to map all object to json
  }

  errorHandler(error:Response){
    return Observable.throw(error||"SERVER ERROR");
  }

  getter(){
    return this.category;
  }

  settter(value: Category) {
    this.category = value;
  }
}
