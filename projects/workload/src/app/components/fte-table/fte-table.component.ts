import { Component, OnInit } from "@angular/core";

import { GetDataService } from "../../services/get-data.service";

@Component({
  selector: "app-fte-table",
  templateUrl: "./fte-table.component.html",
  styleUrls: ["./fte-table.component.css"]
})
export class FteTableComponent implements OnInit {

  fteData: any = [];

  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    this.getDataService.fte.subscribe(data => this.fteData = data);
  }

}
