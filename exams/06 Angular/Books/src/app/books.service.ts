import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
 
  constructor() { }

   searchActivated = new Subject<{isSearching:boolean,value:string}>();


   async getBooks(value:string,startIndex:number){
   const url = `https://www.googleapis.com/books/v1/volumes?key=AIzaSyDKKb0AjOM-UpM45JXEucq3StNYSGeLom4&q=${value}&startIndex=${startIndex}`;
   const response = await fetch(url);
   const data = await response.json();
   if(data["items"]){
     const arr = [];
     for(let i =0;i<data["items"].length;i++){
       arr.push({
        title:data["items"][i]["volumeInfo"].title,
        authors:data["items"][i]["volumeInfo"].authors,
        previewLink:data["items"][i]["volumeInfo"].previewLink,
        publisher:data["items"][i]["volumeInfo"].publisher,
        publishedDate:data["items"][i]["volumeInfo"].publishedDate,
        description:data["items"][i]["volumeInfo"].description,
        smallThumbnail:data["items"][i]["volumeInfo"]["imageLinks"].smallThumbnail,
        bookDetails:false
       })
     }
     
     return arr;
   }
   return []; 
  }



  concatArr(oldArr,newArr){
    
      
    for(let i=0;i<newArr.length;i++){
      oldArr.push(newArr[i]);
    }
    return oldArr;
   }



   getBooksDetails(index,arr){

     arr[index].bookDetails = true;;
     return arr;
   }
}




