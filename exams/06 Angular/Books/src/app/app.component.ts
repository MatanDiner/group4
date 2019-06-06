import { Component,OnInit,OnDestroy } from '@angular/core';
import {BooksService} from './books.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'Books';
  activatedSubs:Subscription;
  isSearching:boolean;
  searchValue:string;
  
  constructor(private booksService:BooksService){
   this.isSearching = false;
   this.searchValue = null;
  }


  ngOnInit(){

   this.activatedSubs = this.booksService.searchActivated.subscribe(searchData=>{
     const {isSearching,value} = searchData;
     this.isSearching = isSearching;
     this.searchValue = value;
   })

  }

  ngOnDestroy(){
    this.activatedSubs.unsubscribe();
  }


}
