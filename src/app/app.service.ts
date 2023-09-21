import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/index';

/**
 * Class representing application service.
 *
 * @class AppService.
 */
@Injectable()
export class AppService {
  private serviceUrl = '/api/summary';
  private dataPostTestUrl = '/api/postTest';

  constructor(private http: HttpClient) {
  }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  /**
   * Makes a http get request to retrieve the welcome message from the backend service.
   */
  public getWelcomeMessage() {
    return this.http.get(this.serviceUrl).pipe(
      map(response => response)
    );
  }

  /**
   * Makes a http post request to send some data to backend & get response.
   */
  public sendData(): Observable<any> {
    return this.http.post(this.dataPostTestUrl, {});
  }
  public getIdPublicacion():Observable<any[]>{
    let body: HttpParams = new HttpParams();
    const url = 'http://localhost:9000/generarID';
    return this.http.post<any[]>(url, '',  {headers: this.httpOptions.headers});
  }
  public getChatGPT(body:any):Observable<any[]>{

    const url = 'http://localhost:9000/generarRespuesta';
    return this.http.post<any[]>(url, body,  {headers: this.httpOptions.headers});
  }
  public guardarDatos(data:any, body:any):Observable<any[]>{
    let body1=body;
    body1.id_pub=data;
    const url = 'http://localhost:9000/guardarDatos';
    return this.http.post<any[]>(url, body1,  {headers: this.httpOptions.headers} );
  }
}
