import { Injectable } from '@angular/core';

import { Observable } from "rxjs";

import { constants } from "./cms.constants";

@Injectable({
  providedIn:
    'root'
})
export class CmsService {

  constructor() { }

  async simulateCMS(component: string, object: string): Promise<object> {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => resolve(constants[component][object]), 2400);
      } catch (error) {
        reject(error);
      }
    });
  }

  get(page: string, object: string): Observable<any> {
    const cmsResponse = new Observable((observer) => {
      this.simulateCMS(page, object).then((response) => {
        observer.next(response);
      }
      ).catch((error) => {
        observer.error(error);
      }).finally(() => {
        observer.complete();
      })
    });
    return cmsResponse;
  }

}
