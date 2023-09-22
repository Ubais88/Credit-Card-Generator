import React, { useState } from 'react'
import "./card.css"
import Fcard from "../assests/Rectangle 27.png"
import gradient from "../assests/Group 2.png"
import toast from 'react-hot-toast'

const Card = () => {

    const [initialData , setInitialData] = useState({
        fullname:"JANE APPLESEED",
        cardnumber:"0000 0000 0000 0000",
        expiryMonth:"00",
        expiryYear:"00",
        cvv:"000",
    })

    const [errors , setErrors] = useState(false);
    const [formData , setFormData] = useState({
        fullname:"",
        cardnumber:"",
        expiryMonth:"",
        expiryYear:"",
        cvv:"",
    })

    const handleOnChange = (e) => {
        const {name , value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
          });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setInitialData({
            fullname:"JANE APPLESEED",
            cardnumber:"0000 0000 0000 0000",
            expiryMonth:"00",
            expiryYear:"00",
            cvv:"000",
        })
        // Perform validation
        let formErrors = {};
        setErrors("")
        console.log(formData);
        if(!formData.fullname){
            formErrors.fullname = "Cardholder name required"
        }
        if(!formData.cardnumber || formData.cardnumber.length < 16 || formData.cardnumber.length > 16){
            formErrors.cardnumber = "Valid Card number required"
        }
        if(!formData.expiryMonth || formData.expiryMonth > 12 || formData.expiryMonth <= 0){
            formErrors.expiryMonth = "Invalid Month"
        }
        if(!formData.expiryYear || formData.expiryYear < new Date().getFullYear().toString().slice(-2)){
            formErrors.expiryYear = "Invalid Year"
        }

        if(formData.expiryYear == new Date().getFullYear().toString().slice(-2) && formData.expiryMonth < new Date().getMonth()){
            formErrors.expiryMonth = "Invalid Month"
        }

        if(!formData.cvv){
            formErrors.cvv = "CVC must be Numeric"
        }
        if(formData.cvv && (formData.cvv.length > 3 || formData.cvv.length < 3)){
            formErrors.cvv = "CVC must be three digits"
        }

        // if any error found
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // if no error found
        setInitialData({...formData})
        toast.success("Details updated Sccessfully");
        setFormData({
            fullname:"",
            cardnumber:"",
            expiryMonth:"",
            expiryYear:"",
            cvv:"",
        })

    }

    function addSpacesToNumber(input) {
        // Remove any existing spaces and non-digit characters
        const digitsOnly = input.replace(/\D/g, '');
        
        // Add a space after every 4 digits using a regular expression
        const formattedNumber = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ');
      
        return formattedNumber;
      }
      
    function addSlace(month , year){
        const str = month +"/"+ year;
        return str;
    }


  return (
    <div className='main-container'>
        <div className='card-container'>
            <div className='gradient'>
                <img src={gradient}/>
            </div>

            <div className='frontcard'>
                <img src={Fcard} />
                <div className='circle-container'>
                    <div className='circle'></div>
                    <div className='border-circle'></div>
                </div>
                <div className='cardno-container'>
                    <p className='cardno'>
                        {
                            addSpacesToNumber(initialData.cardnumber)
                        }
                    </p>
                </div>

                <div className='nameanddob'>
                    <p className='name'>
                        {
                            initialData.fullname
                        }
                    </p>
                    <p className='expiry'>
                        {
                            addSlace(initialData.expiryMonth , initialData.expiryYear)
                        }
                    </p>
                </div>
            </div>

            <div className='backcard'>
                <div className='blackstrip'></div>
                <div className='graystrip'>
                    <p className='cvv'>
                        {
                            initialData.cvv
                        }
                    </p>
                </div>

                <div className='linescontainer'>
                    <div className='dottedline'>
                        <div className='longline'></div>
                        <div className='smdline'></div>
                        <div className='smdline'></div>
                        <div className='smallline'></div>
                    </div>

                    <div className='dottedline'>
                        <div className='smdline'></div>
                        <div className='mdline'></div>
                        <div className='mdline'></div>
                        <div className='smallline'></div>
                    </div>

                    <div className='dottedline'>
                        <div className='smallline'></div>
                        <div className='smdline'></div>
                        <div className='smdline'></div>
                        <div className='longline'></div>
                    </div>
                </div>

            </div>
        </div>


        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <div className='cardholder-name'>
                    <label htmlFor="">CARDHOLDER NAME</label>
                    <input 
                        type="text"
                        name='fullname'
                        value={formData.fullname}
                        onChange={handleOnChange}
                        className='input-box'
                        placeholder='e.g. Jane Appleseed' 
                    />
                    <span>{errors.fullname}</span>

                </div>

                <div className='card-number'>
                    <label htmlFor="">CARD NUMBER</label>
                    <input 
                        type="number"
                        name='cardnumber'
                        value={formData.cardnumber}
                        onChange={handleOnChange}
                        className='input-box '
                        id='card-number'
                        placeholder='e.g. 1234 5678 9123 0000'
                    />
                    <span>{errors.cardnumber}</span>
                </div>

                <div className='cvv-and-expiry'>
                    {/* expiry */}
                    <div className='expirybox'>
                        <label htmlFor="">EXP.DATE (MM/YY)</label>
                        <div className="expirydate">
                            <div className="special">
                                <input 
                                    type="number"
                                    name="expiryMonth"
                                    value={formData.expiryMonth}
                                    onChange={handleOnChange} 
                                    min="00" 
                                    max="99" 
                                    className='input-box'
                                    placeholder='MM'
                                />
                                <span>{errors.expiryMonth} </span>
                            </div>
                            
                            <div className="special">
                                <input 
                                    type="number"
                                    name="expiryYear"
                                    value={formData.expiryYear} 
                                    onChange={handleOnChange}
                                    min="0" 
                                    max="99"  
                                    className='input-box'
                                    placeholder='YY' 
                                />
                                <span>{errors.expiryYear}  </span>
                            </div>
                        </div>
                    </div>

                    {/* CVV */}
                    <div className='cvv'>
                        <label htmlFor="">CVC</label>
                        <input 
                            type="text"
                            name='cvv'
                            value={formData.cvv}
                            onChange={handleOnChange}
                            className='input-box'
                            placeholder='e.g. 123'
                        />
                        <span>{errors.cvv}</span>
                    </div>
                </div>

                <button className='btn' type='submit'>Confirm</button>
            </form>
        </div>



    </div>
  )
}

export default Card