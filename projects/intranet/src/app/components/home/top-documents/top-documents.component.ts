import { Component, OnInit } from "@angular/core";

import { Document } from '../../../document-logic/document';
import { DocumentService } from '../../../document-logic/document.service';

@Component({
  selector: "app-top-documents",
  templateUrl: "./top-documents.component.html",
  styleUrls: ["./top-documents.component.css"]
})
export class TopDocumentsComponent implements OnInit {

  topDocuments: Document[];

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.getTopDocuments();
  }

  getTopDocuments(): void {
    this.documentService.getDocs().subscribe(data => {
      let sorted = data.sort(function(a, b) {
        return b.clicks - a.clicks;
      });
      this.topDocuments = sorted.slice(0,10);
    });
  }

  docClicked(index) {
    this.topDocuments[index].clicks++;
  }

}
