import { Injectable } from '@angular/core';
import * as itemList  from '../dto/itemList';
import { Item }       from '../dto/item';

@Injectable()
export class ItemListService
{
    listeners = [];

    getItemList(): Map<string, Item> {
        var list = JSON.parse(localStorage.getItem('todo_list'));

        if (list) {
            return new Map<string, Item>(list);
        }
        
        return itemList.list;
    }

    getItem(id): Item {
        var item = this.getItemList().get(id);

        if (!item) {
            throw new Error("Item does not exist");
        }

        return item;
    }

    saveItem(item: Item): Item {
        var list = this.getItemList();

        list.set(item.id, item);

        localStorage.setItem('todo_list', JSON.stringify(list));

        this.trigger(list);

        return item;
    }

    addItem(item: Item): Item {
        return this.saveItem(item);
    }

    deleteItem(item: Item): Map<string, Item> {
        this.getItem(item.id);

        var list = this.getItemList();

        list.delete(item.id);

        localStorage.setItem('todo_list', JSON.stringify(list));
        
        this.trigger(list);

        return list;
    }

    trigger(list: Map<string, Item>) {
        this.listeners.forEach(function(cb){
            console.log('cb', cb);
        });
    }

    listen(cb): void {
        this.listeners.push(cb);
    }
}