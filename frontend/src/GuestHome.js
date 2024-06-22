import React from 'react';
import {Link} from 'react-router-dom';
import vet1 from './assets/vet1.jpg';
import vet2 from './assets/vet2.jpg';


function GuestHome(){
  return(
    <div>
      <div className='header-container'>
         <h1>Samina Vet</h1>
         <Link to={'/login'} className="btn btn-success">Login</Link>
         <Link to={'/signup'} className="btn btn-success">Signup</Link>
      </div>
      <div className='image-main-container'>
        <img src={vet1} className='image-container'/>
      
        <img src={vet2} className='image-container'/>
      </div>
  
      <div className="about-us-container">
        <p className="about-us-text">At Samina Vet, we are more than just a veterinary clinic – 
                    we are a dedicated team of pet lovers committed to providing exceptional 
                    veterinary care. Located in the heart of Bosnia and Herzegovina, our clinic 
                    has been serving the community for over 15 years, earning the trust 
                    and loyalty of countless pet owners.

                    Our mission is simple: to enhance the lives of pets and their families by 
                    delivering the highest standard of medical care in a warm, welcoming, and 
                    compassionate environment. We believe that pets are family members, and they 
                    deserve to be treated with the utmost respect, kindness, and professional expertise.


        </p>

      </div>
    </div>
  )
}

export default GuestHome;