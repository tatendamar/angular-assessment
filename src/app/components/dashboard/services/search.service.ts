import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SearchResult } from './searchTypes.type';

@Injectable({
  providedIn: 'root'
})


export class SearchService {
  private readonly http = inject(HttpClient)

 constructor() { }

 search(query: string): Observable<SearchResult[]> {
  return this.http.get<SearchResult[]>(`http://localhost:3000/list?path=${query}`).
  pipe(

    map((response: SearchResult[]) => {
      if(!response){
        console.log(response)
        return response;
      }
      return response
    })
  )
 }

}
