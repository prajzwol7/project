import React,{Component} from 'react'
import	Spinner from '../../../components/UI/Spinner/Spinner'
import css from './ContactData.css'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
class ContactData extends Component{
	state={
		orderForm:{
			name:{
				elementType:'input',
				elementConfig:{
					type:'text',
					placeholder:'Your Name'
				},
				value:'',
				validation:{
					required:true
				},
				valid:false,
				touched:false
			},
			street:{
				elementType:'input',
				elementConfig:{
					type:'text',
					placeholder:'Street'
				},
				value:'',
				validation:{
					required:true
				},
				valid:false,
				touched:false
			},
			Contact:{
				elementType:'input',
				elementConfig:{
					type:'text',
					placeholder:'Contact'
				},
				value:'',
				validation:{
					required:true,
					minLength:10,
					maxLength:10
				},
				valid:false,
				touched:false
			},
			country:{
				elementType:'input',
				elementConfig:{
					type:'text',
					placeholder:'Country'
				},
				value:'',
				validation:{
					required:true
				},
				valid:false,
				touched:false
			},
			
			email:{
				elementType:'input',
				elementConfig:{
					type:'text',
					placeholder:'Email'
				},
				value:'',
				validation:{
					required:true
				},
				valid:false,
				touched:false
			},
			delivery:{
				elementType:'select',
				elementConfig:{
					options:[
					{value:'fastest',displayValue:'Fastest'},
					{value:'cheapest',displayValue:'Cheapest'},]
				},
				value:'',
				validation:{},
				valid:true,
				touched:false
			},
		},
		loading:false,
		formIsValid:false
	}
	checkValidity=(value,rules)=>{
		let isValid=true
		if(rules.required){
			isValid=value.trim()!=='' && isValid;
		}
		if(rules.minLength){
			isValid=value.length >=rules.minLength && isValid;
		}
		if(rules.maxLength){
			isValid=value.length <=rules.maxLength && isValid;
		}
		return isValid;
	}
	orderHandler=(event)=>{
		event.preventDefault();

		this.setState({
			loading:true
		});
		const formData={};
		for(let formElementIdentifier in this.state.orderForm){
			formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
		}
		const order={
			ingredients:this.props.ingredients,
			price:this.props.price,
			orderData:formData
		}
		axios.post('/orders.json',order)
		.then(res=>{
			alert("success")
			this.setState({
				
				loading:false
			});
			this.props.history.push('/');
		})
		.catch(error=>{
			this.setState({
				
				loading:false
			});
		})

	}
	inputChangeHandler=(event,inputIdentifier)=>{
			const updatedOrderForm={...this.state.orderForm};
			const updatedFormElement={...updatedOrderForm[inputIdentifier]}
			updatedFormElement.value=event.target.value;
			updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
			updatedFormElement.touched=true;
			updatedOrderForm[inputIdentifier]=updatedFormElement;
			
			let formIsValid=true;
			for(let inputIdentifier in updatedOrderForm){
				formIsValid=updatedOrderForm[inputIdentifier].valid && formIsValid;
			}
			this.setState({
				orderForm:updatedOrderForm,
				formIsValid:formIsValid
			});
	
	}


	render(){
		const formElementsArray=[];
		for (let key in this.state.orderForm){
			formElementsArray.push({
				id:key,
				config:this.state.orderForm[key]
			});
		}
		let form=(<form onSubmit={this.orderHandler}>
				
				{formElementsArray.map(formElement=>(
					<Input 

							shouldValidate={formElement.config.validation}
							invalid={!formElement.config.valid}
							key={formElement.id}
							touched={formElement.config.touched}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							changed={(event)=>this.inputChangeHandler(event,formElement.id)}/>
					))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
			</form>);
		if(this.state.loading){
			form=<Spinner/>
		}
		return(
			<div className={css.ContactData}>
			<h3>Enter your contact detail</h3>
			{form}
			</div>
			);
	}
}
export default ContactData