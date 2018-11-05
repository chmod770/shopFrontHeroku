import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Item} from "../../item";
import {ItemService} from "../../shared_service/item.service";
import {Category} from "../../category";
import {CategoryService} from "../../shared_service/category.service";

@Component({
  selector: 'app-itempage',
  templateUrl: './itempage.component.html',
  styleUrls: ['./itempage.component.css']
})
export class ItempageComponent implements OnInit {

  itemId:number;
  item:Item=new Item();
  public categories:Category[];
  constructor(private route: ActivatedRoute,private _itemService:ItemService,private _categoryService:CategoryService) { }

  ngOnInit() {
    this.itemId=this.route.snapshot.params.itemId;

    this._itemService.getItemWithId(this.itemId).subscribe((item)=>{
      console.log(item);
      this.item = item;
    },(error)=>{
      console.log(error);
    });

    this._categoryService.getCategories().subscribe((categories)=>{
      console.log(categories);
      this.categories = categories;
    },(error)=>{
      console.log(error);
    });
  }
}
