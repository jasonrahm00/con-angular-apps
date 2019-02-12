import { Component, OnInit } from "@angular/core";

import { GetDataService } from "../../services/get-data.service";
import { Fund } from "../../classes/fund";

@Component({
  selector: "app-funding-breakdown",
  templateUrl: "./funding-breakdown.component.html",
  styleUrls: ["./funding-breakdown.component.css"]
})
export class FundingBreakdownComponent implements OnInit {

  fundingData: Fund;

  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    this.getDataService.fundingData.subscribe(data => this.fundingData = data);
  }

}
