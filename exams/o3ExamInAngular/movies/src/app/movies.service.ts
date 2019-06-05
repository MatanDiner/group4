import { Injectable } from '@angular/core';
import {Subject} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor() { }

   isSearching =  new Subject<{isSearching:boolean,value:string}>();
  // searchMoviesActive =  new Subject<{isSearching:string,}>();


   async getMovies(value,page){
     const url = `http://www.omdbapi.com/?apikey=d777cf78&s=[${value}]&type=movie&page=[${page}]`;
     const response = await fetch(url);
     const data = await response.json();
     return data["Search"]?data["Search"]:[];
   }
}
