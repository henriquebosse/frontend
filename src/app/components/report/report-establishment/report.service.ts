import { ReportEstablishmentComponent } from './report-establishment.component';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  baseUrl = 'http://localhost:3001/report'

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  create(reportEstablishmentComponent: ReportEstablishmentComponent): Observable<ReportEstablishmentComponent> {
    return this.http.post<ReportEstablishmentComponent>(this.baseUrl, reportEstablishmentComponent).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  errorHandler(e: any): Observable<any> {
    console.log(e)
    this.showMessage('Salvo Com Sucesso!', true)
    return EMPTY
  }


}
