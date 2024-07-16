import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl:string="http://localhost:3000"
  constructor(private http: HttpClient) {}
  
  //crud
  save(url:string,data:any){
    debugger
    return this.http.post<any>(this.baseUrl+url,data);
  }
  getList(url:string){
    return this.http.get<any>(this.baseUrl+url);
  }
}
