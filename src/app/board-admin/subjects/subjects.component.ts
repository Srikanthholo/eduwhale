import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PaginationService } from 'ngx-pagination';
 
import { AuthService } from 'src/app/_services/auth.service';
import { ExamsService } from 'src/app/_services/exams.service';
import { ResultsService } from 'src/app/_services/results.service';
 
import { TokenStorageService } from 'src/app/_services/token-storage.service';

import { ngxCsv } from 'ngx-csv/ngx-csv';
import { OrderPipe } from 'ngx-order-pipe';
import * as XLSX  from 'xlsx';
import { SUBJECT } from 'src/app/models/subjects.model';
import { SubjectService } from 'src/app/_services/subject.service';
 
 

 
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
 

  
  currentsubject: SUBJECT = {
    subject: '',
    hodid: '',
    
    
  };
  submitted = false;
  searchterm = "";
  page: number = 1;
  count: number = 0;  
  tableSize: number= 10;
  tableSizes: any = [10, 15, 20, 50, 100];
  title = 'download';
  filename = 'report.xlsx';
  totalRecords: any;
  sectionData!: SUBJECT[];


  constructor( private tokenStorage: TokenStorageService,
    private formbuilder: FormBuilder,
    private authService:AuthService, 
    private sbjservice: SubjectService,
   
     public paginate: PaginationService) { }

  ngOnInit(): void {

    this.retrieveSubjects();
  }



  
  createsubject(): void {
     debugger
    const data = {
      subject: this.currentsubject.subject,
      hodid: this.currentsubject.hodid,
   
    };
    console.log(data);

    this.sbjservice.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert(res);
          this.submitted = true;
        },
        error: (e) =>{

          console.error(e);

          alert(e.message);
        }
      });

  
       
     
  }


  deletestudent( sid : any): void {
    this.sbjservice.delete(sid)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert(res.message);
          this.reloadPage();
        },
        error: (e) =>{

          console.error(e);
          alert(e.message);
        }
         
      });
}




  exportExcel(): void{

    let element = document.getElementById('download');

    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(ws, [["Created "+new Date().toISOString()]], {origin:-1});

    XLSX.utils.book_append_sheet(wb,ws,'Sheet1')
    XLSX.writeFile(wb,this.filename)

   }

   onTableDataChange( event: any){
   
    this.page = event;
    this.retrieveSubjects();
  }
  onTableSizeChange( event: any){
    this.tableSize= event.target.value;
    this.page = 1;
    this.retrieveSubjects();
  }
      
 

  retrieveSubjects(): void {
    
    this.sbjservice.getAll()
      .subscribe({
        next: (data) => {
          
          this.sectionData = data;
          this.totalRecords=this.sectionData.length;
       
      
        },
        error: (e) => console.error(e)
      });
  }
 
  reloadPage(): void {
    window.location.reload();
  }




}
