import { ReportService } from './report.service';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-report-establishment',
  templateUrl: './report-establishment.component.html',
  styleUrls: ['./report-establishment.component.css']
})

//export class DatepickerOverviewExample {}
export class ReportEstablishmentComponent implements OnInit {

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
  }

  createReport(): void {
    //this.reportService.create(this.).subscribe(() => {
      this.reportService.showMessage('Relatório Gerado em C:/PharmaSoft/Report/rpEstab_15112020!')      
    //})
  }  


}
