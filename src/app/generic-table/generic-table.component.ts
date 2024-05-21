import { Component,  Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { UpdateDataService } from '../services/update-data.service';


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

  constructor(private updateDataService: UpdateDataService) { 
    this.formSearch = new FormGroup({
      search: new FormControl('')
    });
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
