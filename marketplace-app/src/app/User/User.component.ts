import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from './User.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-User',
	templateUrl: './User.component.html',
	styleUrls: ['./User.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;



          userId = new FormControl("", Validators.required);



          firstName = new FormControl("", Validators.required);



          lastName = new FormControl("", Validators.required);




  constructor(private serviceUser:UserService, fb: FormBuilder) {
    this.myForm = fb.group({


          userId:this.userId,



          firstName:this.firstName,




          lastName:this.lastName,



    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceUser.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(participant=> {
        tempList.push(participant);
      });
      this.allParticipants= tempList;
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
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.zalak.marketplace.User",


          "userId":this.userId.value,



          "firstName":this.firstName.value,




          "lastName":this.lastName.value,




    };

    this.myForm.setValue({


          "userId":null,



          "firstName":null,



          "lastName":null,



    });

    return this.serviceUser.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({


          "userId":null,



          "firstName":null,



          "lastName":null,


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

/*
   updateParticipant(form: any): Promise<any> {
    this.participant= {
      $class: "org.zalak.marketplace.User",



            "userId":this.userId.value,





            "firstName":this.firstName.value,





            "lastName":this.lastName.value,



    };

    return this.serviceUser.updateParticipant(form.get("userId").value,this.participant)
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
  } */


  deleteParticipant(): Promise<any> {

    return this.serviceUser.deleteParticipant(this.currentId)
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

    return this.serviceUser.getParticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {


            "userId":null,



            "firstName":null,



            "lastName":null,


      };




        if(result.userId){

            formObject.userId = result.userId;

        }else{
          formObject.userId = null;
        }

        if(result.firstName){

            formObject.firstName= result.firstName;

        }else{
          formObject.firstName= null;
        }

        if(result.lastName){

            formObject.lastName= result.lastName;

        }else{
          formObject.lastName= null;
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


          "userId":null,



          "firstName":null,



          "lastName":null,



      });
  }

}
