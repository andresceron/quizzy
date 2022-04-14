import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private config = {
    host: environment.serverUrl
  };

  constructor(
    private http: HttpClient
  ) { }

  private getRequestOptions(params?: any, customHeaders?: HttpHeaders, responseType = 'json' as any) {
    let defaultHeaders: HttpHeaders = new HttpHeaders();
    defaultHeaders = defaultHeaders.set('content-type', 'application/json');
    defaultHeaders = defaultHeaders.set('accept', 'application/json');

    return {
      headers: customHeaders || defaultHeaders,
      params: params ? this.convertJSONtoParams(params) : undefined,
      responseType: responseType
    }
  }

  convertJSONtoParams(json: any): HttpParams {
    let params: HttpParams = new HttpParams();

    for (const key in json) {

      if (json.hasOwnProperty(key) && (json[key] || json[key] === false || json[key] === 0)) {

        if (json[key].constructor === Array && !json[key].length) {
          continue;

        } else {
          params = params.append(key, String(json[key]));
        }
      }
    }

    return params;
  }

  public get<T>(url: string, params?: { [key: string]: any }, headers?: HttpHeaders, responseType?: string): Observable<T> {
    return this.http.get<T>(this.config.host + url, this.getRequestOptions(params, headers, responseType));
  }

  public post<T>(url: string, data: any, params?: { [key: string]: any }): Observable<T> {
    return this.http.post<T>(this.config.host + url, {data: data}, this.getRequestOptions(params));
  }

  public put<T>(url: string, data: any, params?: { [key: string]: any }, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(this.config.host + url, data, this.getRequestOptions(params, headers));
  }

  public delete<T>(url: string, params?: { [key: string]: any }): Observable<T> {
    return this.http.delete<T>(this.config.host + url, this.getRequestOptions(params));
  }

  public patch<T>(url: string, data: any, params?: { [key: string]: any }): Observable<T> {
    return this.http.patch<T>(this.config.host + url, {data: data}, this.getRequestOptions(params));
  }

  public upload<T>( url: string, data: any, options?: { [ key: string ]: any } ): Observable<T> {
    console.log( 'inside upload:: ', this.config.host + url, {data: data}, options);
    return this.http.post<T>(this.config.host + url, data, options);
  }

}
