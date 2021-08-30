import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { from } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { GetProvincesService } from 'src/app/core/services/get-provinces.service';
import { ProductService } from 'src/app/core/services/product.service';
import { TransportService } from 'src/app/core/services/transport.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  product: Product = new Product();
  provinces: any [] = [];
  filePath:String;
  img: string | ArrayBuffer =
  "https://parsefiles.back4app.com/vH5Y2pQQTnE8odu7xeMKMzviCtFuPHQAvQogW4GI/7b7b788e29df265cb59d20c2682aba24_product.jpg";
  photosrc: String;
  selectedProvince: null;
  file: File;
  user: string;
  transporte: any [] = [];
  editField: string;
  comboProducts: Product = new Product();
  productList: Array<any> = [
    { id: '', name: '', age: '', companyName: '', country: '', city: '' },
  
  ];

  awaitingPersonList: Array<any> = [
    { id: 6, name: 'George Vega', age: 28, companyName: 'Classical', country: 'Russia', city: 'Moscow' },
   
  ];

  name = 'Paste it';
  val:any;
   displayedColumns: string[] ;
  dataSource: any[] = [];

  data(event:ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    let row_data = pastedText.split('\n');
    this.displayedColumns = [ "Nombre", "UM", "Cantidad" ];
    //delete row_data[0];
    // Create table dataSource
    let data:any=[];
    row_data.forEach(row_data=>{
        let row:any={};
      this.displayedColumns.forEach((a, index)=>{row[a]= row_data.split('\t')[index]});
      data.push(row);
    })
    this.dataSource = data;
    console.log(this.dataSource);
    }
  
  constructor(private service: ProductService,
              private provinceService: GetProvincesService,
              private router: Router,
              private transportService: TransportService,
              public auth: AuthService,    
                @Inject(DOCUMENT) public document: Document) { 
                this.selectedProvince = null;
              }

  ngOnInit(): void {
    this.provinces = this.provinceService.getProvincesAdd();  
    this.auth.user$.subscribe(user =>{
      this.user = user.nickname;
    })
    this.transportService.getTransport().then(res =>{
      this.transporte = res;           
    });
  }

  

  photo(event: any) {
    this.filePath = event.files;
    
    console.log("Path");
    console.log(this.filePath);
    this.file = event[0];

      const reader = new FileReader();
      

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = event => {
        this.img = reader.result;
        
      };
    
}

  saveProduct(form: NgForm){
    if(form.valid){
      this.service.addProduct(this.product, this.img.toString(), this.dataSource, this.user);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto añadido',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/']);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Complete todos los campos obligatorios!',        
      })
    } 
    
  }

  //---Editable Table -- //
 

    updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.productList[id][property] = editField;
    }

    remove(id: any) {
      this.awaitingPersonList.push(this.productList[id]);
      this.productList.splice(id, 1);
    }

    add() {     
        const person = this.awaitingPersonList[0];
        this.productList.push(this.productList);
        console.log(this.productList);
        
        this.awaitingPersonList.splice(0, 1);      
    }

    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }

}
