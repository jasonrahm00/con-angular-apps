import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Document } from '../../document-logic/document';
import { DocumentService } from '../../document-logic/document.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  title = 'Forms and Documents';

  documents: Document[];

  constructor(
    private documentService: DocumentService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.getDocs();
  }

  getDocs(): void {
    this.documentService.getDocs().subscribe(data => {
      this.documents = data.sort(function(a, b) {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    });
  }

  docClicked(index) {
    this.documents[index].clicks++;
  }

}
