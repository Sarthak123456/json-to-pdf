import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getData() {
    return this.http.get('https://drive.google.com/uc?export=download&id=1l2SzpFqwXdzmovtxXeGnaGoLwTTUV5aQ');
  }
}
