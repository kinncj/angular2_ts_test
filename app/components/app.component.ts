import { Component }       from '@angular/core';
import { ItemListService } from './../services/item-list';
import { ItemDetail }      from './item-detail.component';
import { AddItem }         from './add-item.component';
import { Item }            from '../dto/item';

@Component({
    selector: 'my-app',
    template: `
        <h1>TODO LIST</h1>
        <add-item></add-item>
        <h2>TODO</h2>
        <ul class="items">
            <li *ngFor="let u of todoItemList" [class.selected]="u === item">
            <span class="badge" (click)="onSelect(u)">{{u.name}}</span><span class="done" (click)="onToggle(u)">X</span>
        </ul>
        <h2>DONE LIST</h2>
        <ul class="items">
            <li *ngFor="let u of doneItemList" [class.selected]="u === item">
            <span class="badge" (click)="onSelect(u)">{{u.name}}</span><span class="done" (click)="onToggle(u)">X</span>
        </ul>
        <item-detail [item]="item"></item-detail>
        `
})
export class AppComponent
{
    constructor(itemListService: ItemListService) {
        this.itemListService = itemListService;
        this.doneItemList    = [];
        this.todoItemList    = [];

        itemListService.getItemList().forEach(function(item: Item){
            if (item.done) {
                this.doneItemList.push(item);

                return;
            }
            
            this.todoItemList.push(item);
        }.bind(this));

        this.itemListService.listen((list) => this.listUpdate(list));
    }

    onSelect(item: Item): void {
        this.item = item;
    }

    onToggle(item: Item): void {
        item.done = !item.done;
        this.itemListService.saveItem(item);
    }

    listUpdate(list: Map<string, Item>): void {
        this.doneItemList = [];
        this.todoItemList = [];

        list.forEach((item: Item, key: string, map: Map<string,Item>) => {
            if (item.done) {
                this.doneItemList.push(item);

                return;
            }
            
            this.todoItemList.push(item);
        });
    }

    todoItemList:    Item[];
    doneItemList:    Item[];
    itemListService: ItemListService;
    item:            Item;
}