import { Component }       from '@angular/core';
import { Item }            from './../dto/item';
import { ItemListService } from './../services/item-list';
import { Guid }            from './../services/guid';

@Component({
  selector: 'add-item',
  template: `
    <div>
        <h3>Add item</h3>
        <div>
            <label>name: </label>
            <input [(ngModel)]="item" placeholder="name"/>
            <button (click)="add()">Add</button>
        </div>
    </div>
  `
})

export class AddItem
{
  constructor(private itemListService: ItemListService) {
      this.itemListService = itemListService;
  }

  item: string;

  add(): void {
      var item = new Item;
      
      item.id   = Guid.newGuid();
      item.name = this.item;
      item.done = false;

    this.itemListService.addItem(item);
  }
}