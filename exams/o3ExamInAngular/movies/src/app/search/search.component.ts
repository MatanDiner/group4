import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {MoviesService} from '../movies.service'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {
  message:string;
  constructor(private moviesService:MoviesService) { 
    this.message = "";
  }

  async onSubmit(event,search){

    event.preventDefault();
    const value = search.value;
    const isSearching:boolean = this.searchValidation(value);
    this.moviesService.isSearching.next({isSearching,value});
    this.message = !isSearching?"the search term has to be at least 3 characters long!":"";
   /* if(isSearching){
      this.message = "";
     // this.moviesService.searchMoviesActive.next(value);
    }
    else{
      this.message = "the search term has to be at least 3 characters long!";
    }
    */
    
  } 


  searchValidation(value){
    return value.length >= 3 ;
  }

 

}
