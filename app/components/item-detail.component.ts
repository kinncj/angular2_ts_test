import { Component, Input } from '@angular/core';
import { Item }             from './../dto/item';
import { ItemListService }  from './../services/item-list';

@Component({
  selector: 'item-detail',
  template: `
    <div *ngIf="item">
        <h2>{{item.name}} details!</h2>
        <div><label>done: </label>{{item.done ? 'yes' : 'no'}}</div>
        <div>
            <label>name: </label>
            <input (keyup)="onChange($event)" placeholder="name" value="{{item.name}}"/>
        </div>
    </div>
  `
})

export class ItemDetail
{
  constructor(itemListService: ItemListService) {
    this.itemListService = itemListService;
  }
  @Input()
  item: Item;
  
  onChange(event) {
    this.item.name = event.target.value;

    this.itemListService.saveItem(this.item);
  }

  itemListService: ItemListService;
}