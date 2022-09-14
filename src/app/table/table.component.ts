import { Component, OnInit, ViewChild, NgZone, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup,Validators,FormControl} from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';
import { MainServiceService } from '../Services/main-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  invoiceForm: any = FormGroup
  isSelectAll: boolean = false;
  title = 'dataTableDemo';
 
  dtOptions: DataTables.Settings = {};
  posts: any;
  valueField:any;
  category:any;
  version:any;
  valueCheck:any;

  chipsList:any = []
  
  ruledata: Array<any> = [
    {
       "ruleid":2,
       "rule":"BR1",
       "ruleDescription":"Name Should contain Alphabets Characters only",
       "valueField":"Name",
       "valueCheck":"Not Null, Alphabetic",
       "category":"customer",
       "version":"1",
       "isSelected":false
    },
    {
       "ruleid":3,
       "rule":"BR2",
       "ruleDescription":"Email Should contain @ and . special character",
       "valueField":"Email",
       "valueCheck":"@ & .",
       "category":"customer",
       "version":"1",
       "isSelected":false
    },
    {
       "ruleid":4,
       "rule":"BR3",
       "ruleDescription":"Mobile Number Should Conatin 10 digits",
       "valueField":"Mobile",
       "valueCheck":"Phone Number length = 10",
       "category":"customer",
       "version":"1",
       "isSelected":false
    },
    {
       "ruleid":5,
       "rule":"Length",
       "ruleDescription":"Name Should contain AlphNumeric Characters only",
       "valueField":"Zip Code",
       "valueCheck":"Zip Code length = 6",
       "category":"customer",
       "version":"1",
       "isSelected":false
    }
 ];

  public attribute = [
    {
       "id":1,
       "columnname":"Name",
       "mappedRule":[{
         "ruleid":5,
         "rule":"Length"
      }],
       "chipsList":[{
         "ruleid":5,
         "rule":"Length"
      }]
    },
    {
       "id":2,
       "columnname":"Mobile",
       "mappedRule":[
        {
           "ruleid":5,
           "rule":"Length"
        },
        {
           "ruleid":4,
           "rule":"Distnce Values"
        },
        {
           "ruleid":3,
           "rule":"Max Value"
        },
        {
           "ruleid":2,
           "rule":"Unique Count"
        },
        {
           "ruleid":1,
           "rule":"Size"
        },
        {
           "ruleid":6,
           "rule":"Nullable"
        },
        {
           "ruleid":7,
           "rule":"Infinite"
        },
        {
           "ruleid":8,
           "rule":"UW Year"
        },
        {
           "ruleid":9,
           "rule":"Policy No"
        },
        {
           "ruleid":10,
           "rule":"Holder"
        }
     ],
     "chipsList":[]
    },
    {
       "id":3,
       "columnname":"Address",
       "mappedRule":[],
       "chipsList":[]
    },
    {
       "id":4,
       "columnname":"Pin",
       "mappedRule":[],
       "chipsList":[]
    },
    {
       "id":5,
       "columnname":"Telephone",
       "mappedRule":[],
       "chipsList":[]
    }
 ]

 
 newAttribute: any = {};
 isDisplayRow:boolean=false;
   addNewRow() {
     this.isDisplayRow = true
     
   //   this.ruledata.unshift(this.newAttribute)
     this.newAttribute = {};
   //   this.isDisplayRow == false
     console.log("this.isDisplayRow", this.isDisplayRow);
     
   }
 
  constructor(private fb:FormBuilder,private http: HttpClient, private mainService:MainServiceService) {
 
  }
  
  ngOnInit(): void {
   this.invoiceForm = this.fb.group({
      newAttribute: [''],
      
   });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    for (let index = 0; index < this.attribute.length; index++) {
      const element = this.attribute[index];
      
      for (let j = 0; j < element.mappedRule.length; j++) {
         const newElement = element.mappedRule[j];
         if (this.chipsList.length <= 4) {
            this.chipsList.push(newElement)
            console.log("newElement", newElement);
         }
      }
      this.attribute[index].chipsList = this.chipsList
      this.chipsList = []
      
    }
    console.log("this.chipsList", this.chipsList);
    console.log("this.attribute", this.attribute)
    
  }

  
  // public assignRules(id:any){

  // }
  selectedData:any;
  addFieldValue(post:any) {
    console.log("post", post)
    this.selectedData = post;
    this.mainService.tooggleModal('information_modal','show');
    console.log(this.checkedList,"this.checkedList");
    
  }
  displayChipsList(post:any){   
   this.selectedData = post;
   console.log("this.selectedData", this.selectedData);
   
   this.mainService.tooggleModal('Chips_modal','show');

  }
  closeModel(){
   this.mainService.tooggleModal('information_modal','hide');
   this.mainService.tooggleModal('Chips_modal','hide');
}
  
  // checklist:any;
  checkedList:any=[];
  masterSelected:boolean = false;

  checkUncheckAll() {
    for (var i = 0; i < this.ruledata.length; i++) {
      this.ruledata[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  
  // Check All Checkbox Checked
  isAllSelected() {
    this.masterSelected = this.ruledata.every(function(field:any) {
      field.isSelected == true;
    })
      
    this.getCheckedItemList();
    
  }

  // Get List of Checked Items
  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.ruledata.length; i++) {
      if(this.ruledata[i].isSelected)
      this.checkedList.push(this.ruledata[i]);
    }
    console.log("this.checkedList", this.checkedList);
    
    
  }

  assignList(){

   console.log("this.attribute", this.attribute);
   for (var i in this.attribute) {
      if (this.attribute[i].id == this.selectedData.id) {
         this.attribute[i].mappedRule = this.checkedList;
         break; //Stop this loop, we found it!
      }
    }
    this.mainService.tooggleModal('information_modal','hide');
  }




}
