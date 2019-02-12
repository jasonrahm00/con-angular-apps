import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Document } from './document';
import { DOCS } from './document-list';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor() { }

  getDocs(): Observable<Document[]> {
    return of(DOCS);
  }
  
}
