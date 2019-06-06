import { Component, OnInit } from '@angular/core';
import {BooksService} from '../books.service'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  message:string;
  constructor(private booksService:BooksService) {
    this.message = "";
   }

  ngOnInit() {
  }


  onSubmit(event,search){

    event.preventDefault();
    const value:string = search.value;
    const isSearching:boolean = this.searchValidation(value);
    this.message = !isSearching?" the search term has to be at least 3 characters long":"";
    this.booksService.searchActivated.next({isSearching,value});
  }


  searchValidation(value){
    return value.length >=3;
  }



}
