import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../shared_service/item.service";
import {CategoryService} from "../../shared_service/category.service";
import {Item} from "../../item";
import {ActivatedRoute} from "@angular/router";//u have add this to get params from URL
import {noUndefined} from "@angular/compiler/src/util";
import {Category} from "../../category";
import {Page} from "../../page";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public items: Item[];
  public promotedItems: Item[];
  public categories: Category[];
  public  first: boolean;
  public  last: boolean;
  public  totalElements: number;
  public  totalPages: number;
  public  pageNumber: number;
  public  pageNumbers: number[];

  constructor(private _itemService: ItemService, private _categoryService:CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {

    if(noUndefined(this.route.snapshot.params.pageNumber) && this.route.snapshot.params.pageNumber != null)
      this.readPage(this.route.snapshot.params.pageNumber);
    else
      this.readPage(1);

    this.readPromotedItems();

    this._categoryService.getCategories().subscribe((categories)=>{
      console.log(categories);
      this.categories = categories;
    },(error)=>{
      console.log(error);
    });
  }

  readPage(pageNumber:number){
    if(noUndefined(this.route.snapshot.params.categoryId)&&this.route.snapshot.params.categoryId!=null){
      this.readItemsWithCategory();
    }else{
      this._itemService.getItemsPage(pageNumber).subscribe((page)=>{
        console.log(page);
        this.items = page.content;
        this.first =page.first;
        this.last=page.last;
        this.totalElements = page.totalElements;
        this.totalPages = page.totalPages;
        this.pageNumber = pageNumber;
        this.pageNumbers = new Array(this.totalPages);
      },(error)=>{
        console.log(error);
      });
    }
  }

  readItemsWithCategory(){
    this._itemService.getItemsWithCategoryId(this.route.snapshot.params.categoryId).subscribe((items)=>{
      this.items = items;
    },(error)=>{
      console.log(error);
    });
  }

  readPromotedItems(){
    this._itemService.getPromotedItems().subscribe((promotedItems)=>{
      this.promotedItems = promotedItems;
    },(error)=>{
      console.log(error);
    });
  }

}
