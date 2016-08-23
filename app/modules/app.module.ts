import { NgModule }        from '@angular/core';
import { FormsModule }     from '@angular/forms';
import { BrowserModule }   from '@angular/platform-browser';
import { ItemListService } from './../services/item-list';
import { AppComponent }    from './../components/app.component';
import { ItemDetail }      from './../components/item-detail.component';
import { AddItem }         from './../components/add-item.component';

@NgModule({
    imports:      [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        ItemDetail,
        AddItem
    ],
    bootstrap:    [ AppComponent ],
    providers: [ ItemListService ]
})
export class AppModule { }
