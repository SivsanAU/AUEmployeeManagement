import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { env } from '../environment/env';
import { Emp } from '../_models/Emp';

const baseUrl = env.apiUrl + "/Employee";

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  constructor(private http: HttpClient) { }

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    }), responseType: 'text' as 'json'
  };

  getAll() {
    return this.http.get<Emp[]>(baseUrl);
  }

  getById(id: string) {
    return this.http.get<Emp>(`${baseUrl}/${id}`);
  }

  create(params: any) {
    debugger;
    var d=baseUrl;
    var d2=params;
    var d3=this.httpOptions;
    var d4=params.empId;

    return this.http.post(baseUrl, params, this.httpOptions);
  }

  update(params: any) {
    return this.http.put(`${baseUrl}`, params, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`${baseUrl}/${id}`,this.httpOptions);
  }
}