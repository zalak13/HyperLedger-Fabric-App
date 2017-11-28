import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ArticleService } from './Article.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Article',
	templateUrl: './Article.component.html',
	styleUrls: ['./Article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          articleId = new FormControl("", Validators.required);
        
  
      
          description = new FormControl("", Validators.required);
        
  
      
          price = new FormControl("", Validators.required);
        
  
      
          saleStatus = new FormControl("", Validators.required);
        
  
      
          seller = new FormControl("", Validators.required);
        
  


  constructor(private serviceArticle:ArticleService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          articleId:this.articleId,
        
    
        
          description:this.description,
        
    
        
          price:this.price,
        
    
        
          saleStatus:this.saleStatus,
        
    
        
          seller:this.seller
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceArticle.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.zalak.marketplace.Article",
      
        
          "articleId":this.articleId.value,
        
      
        
          "description":this.description.value,
        
      
        
          "price":this.price.value,
        
      
        
          "saleStatus":this.saleStatus.value,
        
      
        
          "seller":this.seller.value
        
      
    };

    this.myForm.setValue({
      
        
          "articleId":null,
        
      
        
          "description":null,
        
      
        
          "price":null,
        
      
        
          "saleStatus":null,
        
      
        
          "seller":null
        
      
    });

    return this.serviceArticle.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "articleId":null,
        
      
        
          "description":null,
        
      
        
          "price":null,
        
      
        
          "saleStatus":null,
        
      
        
          "seller":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.zalak.marketplace.Article",
      
        
          
        
    
        
          
            "description":this.description.value,
          
        
    
        
          
            "price":this.price.value,
          
        
    
        
          
            "saleStatus":this.saleStatus.value,
          
        
    
        
          
            "seller":this.seller.value
          
        
    
    };

    return this.serviceArticle.updateAsset(form.get("articleId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceArticle.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceArticle.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "articleId":null,
          
        
          
            "description":null,
          
        
          
            "price":null,
          
        
          
            "saleStatus":null,
          
        
          
            "seller":null 
          
        
      };



      
        if(result.articleId){
          
            formObject.articleId = result.articleId;
          
        }else{
          formObject.articleId = null;
        }
      
        if(result.description){
          
            formObject.description = result.description;
          
        }else{
          formObject.description = null;
        }
      
        if(result.price){
          
            formObject.price = result.price;
          
        }else{
          formObject.price = null;
        }
      
        if(result.saleStatus){
          
            formObject.saleStatus = result.saleStatus;
          
        }else{
          formObject.saleStatus = null;
        }
      
        if(result.seller){
          
            formObject.seller = result.seller;
          
        }else{
          formObject.seller = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "articleId":null,
        
      
        
          "description":null,
        
      
        
          "price":null,
        
      
        
          "saleStatus":null,
        
      
        
          "seller":null 
        
      
      });
  }

}
