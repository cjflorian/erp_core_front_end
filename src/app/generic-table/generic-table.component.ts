import { Component,  ElementRef,  Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { UpdateDataService } from '../services/update-data.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent<T> implements OnInit {
  @Input() data: any[] = [];
  keys: string[] = [];
  formSearch: FormGroup; 
  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;

  
  constructor(private updateDataService: UpdateDataService) { 
    this.formSearch = new FormGroup({
      search: new FormControl('')
    });
  }

  generatePdf() {
    

    const documentDefinition: TDocumentDefinitions = {
      content: [
        { text: 'Report', style: 'header' },
        { text: this.data[0].module, style: 'subheader' },
        this.getTableData()
      ],
      styles: {
        header: {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 2] as [number, number, number, number]
        },
        subheader: {
          fontSize: 10,
          bold: true,
          margin: [1, 1, 1, 1] as [number, number, number, number]
        },
        table: {
          margin: [1, 1, 1, 1] as [number, number, number, number]
        }
      },
      pageSize: 'LEGAL',
      pageOrientation: 'landscape',
      pageMargins: [ 40, 60, 40, 60 ]
    };

    pdfMake.createPdf(documentDefinition).open();
  }

  getTableData() {
    const tableData = [];
    const headers = this.keys.map(key => ({ text: key, style: 'tableHeader' }));
    tableData.push(headers);
    this.data.forEach(item => {
      const row: any[] = [];
      this.keys.forEach(key => {
          row.push(item[key]);
      });
      tableData.push(row);
    });

    return {
      table: {
        headerRows: 1,
        //widths: Array(this.keys.length).fill('*'),
        width: 'auto',
        body: tableData, 
      }
    };
  }


  ngOnInit() {
    //updates form another component
    this.updateDataService.data$.subscribe(data => {
      this.data = data;
    // Get the keys of the first item in the array to generate the table columns
    this.keys = this.data.length > 0 ? Object.keys(this.data[0]) : [];
    });
  }

  onClickUpdate(data: any) {  
    this.updateDataService.editData(data);
    this.updateDataService.dataEdit$.subscribe(data => {
      //console.log('dataEdit', data);
    });
  }

  onClickDelete(data: any) {  
    this.updateDataService.deleteData(data);
    this.updateDataService.dataDelete$.subscribe(data => {
    });
  }
  searchData(search: any) {  
    console.log(search.target.value);
    if(search.target.value !== ''){
      this.data = this.data.filter(item => {
        for (const key in item) {
          if (item[key].toString().includes(search.target.value)) {
            return true;
          }
        }
        return false;
      });
    }
  }
}
