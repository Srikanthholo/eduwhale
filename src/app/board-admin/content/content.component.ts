import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PaginationService } from 'ngx-pagination';
import { SECTION } from 'src/app/models/section.model';
import { AuthService } from 'src/app/_services/auth.service';
import { ExamsService } from 'src/app/_services/exams.service';
import { ResultsService } from 'src/app/_services/results.service';
import { SectionService } from 'src/app/_services/sections.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';



 
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { OrderPipe } from 'ngx-order-pipe';
import * as XLSX  from 'xlsx';
import { ContentService } from 'src/app/_services/content.service';
import { CONTENT } from 'src/app/models/content.model';
 

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  
  section: CONTENT = {
    subject: '',
    description: '',
    
    
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
  sectionData!: CONTENT[];
  isedited! : boolean;


  constructor( private tokenStorage: TokenStorageService,
    private formbuilder: FormBuilder,
    private authService:AuthService, 
    private sectionservice: SectionService, 
    private contentservice: ContentService,
    private resultsservice: ResultsService,
     public paginate: PaginationService) { }

  ngOnInit(): void {

    this.retrieveSections();
  }



  
  createsection(): void {
     
    const data = {
      subject: this.section.subject,
      description: this.section.description,
    
    };

    this.contentservice.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });

 
 
      this.reloadPage();
       
     
  }


  deletestudent( sid : any): void {
    this.contentservice.delete(sid)
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
    this.retrieveSections();
  }
  onTableSizeChange( event: any){
    this.tableSize= event.target.value;
    this.page = 1;
    this.retrieveSections();
  }
      
 

  retrieveSections(): void {
    
    this.contentservice.getAll()
      .subscribe({
        next: (data) => {
          
          this.sectionData = data;
          this.totalRecords=this.sectionData.length;
       
      
        },
        error: (e) => console.error(e)
      });
  }


  getmydetails(id: string): void {
 
    this.contentservice.get(id)
      .subscribe({
        next: (data) => {
          this.section = data;
          this.isedited = true;

        },
        error: (e) => console.error(e)
      });
  }
  updateSubject(id: string)
  {
   
    const data = {
           
      subject : this.section.subject,
      description: this.section.description,
     
    
    }
 
    this.contentservice.update(id, data)
    .subscribe({
      next: (res) => {
        console.log(res);
        alert("user data updated succesfully");
      },
      error: (e) => console.error(e)
    });

      this.reloadPage();
   

  }
 
  clearsubjects(){

    this.isedited = false;
    this.section.subject = '';
    this.section.description = '';
  }
  


  reloadPage(): void {
    window.location.reload();
  }




}
