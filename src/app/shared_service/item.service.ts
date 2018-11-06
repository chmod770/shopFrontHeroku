import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";

import { map } from 'rxjs/operators';
import {Item} from "../item";
import {catchError} from "rxjs/internal/operators";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl:string = "https://boiling-beyond-17763.herokuapp.com/api/items";
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});// here we put our header
  private item = new Item();
  constructor( private _http:Http){}

  getItems(){
    //return value from http query get in json which is written in options by header
    return this._http.get(this.baseUrl+'/all',this.options)
      .pipe(map((response:Response)=>response.json()),catchError(this.errorHandler));
    //this snake is to map all object to json
  }

  getItemsPage(pageNumber:number){
    return this._http.get(this.baseUrl+'/all/'+pageNumber,this.options)
      .pipe(map((response:Response)=>response.json()),catchError(this.errorHandler));
  }

  getPromotedItems(){
    //return value from http query get in json which is written in options by header
    return this._http.get(this.baseUrl+'/promotedItems/3',this.options)
      .pipe(map((response:Response)=>response.json()),catchError(this.errorHandler));
    //this snake is to map all object to json
  }

  getItemWithId(id:number){
    return this._http.get(this.baseUrl+'/item/'+id,this.options)
      .pipe(map((response:Response)=>response.json()),catchError(this.errorHandler));
  }

  getItemsWithCategoryId(id:number){
    return this._http.get(this.baseUrl+'/itemsWithCategoryId/'+id,this.options)
      .pipe(map((response:Response)=>response.json()),catchError(this.errorHandler));
  }

  errorHandler(error:Response){
    return Observable.throw(error||"SERVER ERROR");
  }

  getter(){
    return this.item;
  }

  settter(value: Item) {
    this.item = value;
  }
}
