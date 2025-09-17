import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterMentor = function(){
    let [formData, setFormData]= useState({
        name:"",
        email:"",
        password:"",
        profilePic:"",
        phone:"",
        designation:"",
        organization:"",
        expertiseAreas:[],
        experienceYears:"",
        linkedIn:"",
        bio:"",
    })
    let navigate = useNavigate();
    let [expertiseInput,setExpertiseInput]= useState("");
    let [error,setError]= useState("");
    let handleSubmit= (e)=>{
        e.preventDefault();
        let form = new FormData();
        form.append("name", formData.name);
        form.append("email", formData.email);
        form.append("password", formData.password);
        form.append("phone", formData.phone);
        form.append("designation", formData.designation);
        form.append("organization", formData.organization);
        form.append("experienceYears", formData.experienceYears || "");
        form.append("linkedIn", formData.linkedIn);
        form.append("bio", formData.bio);
        form.append("expertiseAreas",JSON.stringify(formData.expertiseAreas));
        if (formData.profilePic) form.append("profilePic", formData.profilePic);

        axios.post("http://localhost:8000/app/mentor/register",form,{
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        }).then((res)=>{
            console.log("Register",res.data);  
            // setFormData({
            //     name:"",
            //     email:"",
            //     password:"",
            //     profilePic:null,
            //     phone:"",
            //     designation:"",
            //     organization:"",
            //     expertiseAreas:[],
            //     experienceYears:"",
            //     linkedIn:"",
            //     bio:"",
            // });
            navigate("/mentor/dashboard")
        }).catch((err)=>{
            setError(err.respose?.data|| "something went wrong")
            alert(err.respose?.data?.message);
        })
    }
    let handleChange= (e)=>{
        let {name,value,files}= e.target;
        if (files) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        }else{
            setFormData((prev)=>({
                ...prev,
                [name]:value
            }))
        }
    }
    let addExpertise=()=>{
        if(expertiseInput.trim()!=""){
            setFormData((prev)=>({
                ...prev,
                expertiseAreas: [...prev.expertiseAreas,expertiseInput.trim()]
            }))
            setExpertiseInput("");
        }
    }
    let removeExpertise=(index)=>{
        setFormData((prev)=>({
            ...prev,
            expertiseAreas: prev.expertiseAreas.filter((_,i)=>i!=index)
        }))
    }

    return (
        
        <form onSubmit={handleSubmit} className="userform">

            <h1 style={{display:"flex", justifyContent:"center", fontSize:"2rem", fontWeight:"700", textDecoration:"underline"}}>Mentor Registration</h1>

            <label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>Enter your name </label>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          
            <label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>Enter your email </label>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

            <label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>Enter password </label>
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            
            <label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>Profile pic </label>
            <input type="file" name="profilePic" accept="image/*" id="profile"required onChange={handleChange}/>

            <label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>Enter your phone no </label>
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />

            <label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>Designation</label>
<input type="text" name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} required />

<label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>Organization</label>
<input type="text" name="organization" placeholder="Organization" value={formData.organization} onChange={handleChange} required />
            
<div> 
    <label style={{color:"white", marginLeft:"7px", marginBottom:"10px"}}>Expertise Areas</label>
    <input type="text" value={expertiseInput} placeholder="Add expertise" onChange={(e) => setExpertiseInput(e.target.value)} />
    <button type="button" onClick={addExpertise} style={{width:"490px"}}>Add</button>
    <div>
        {formData.expertiseAreas.map((item, index) => (
            <span key={index}>
                {item} <button type="button" onClick={() => removeExpertise(index)}>x</button>
            </span>
        ))}
    </div>
</div>

<label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>Experience (Years)</label>
<input type="number" name="experienceYears" placeholder="Experience Years" value={formData.experienceYears} onChange={handleChange} />

<label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>LinkedIn Profile</label>
<input type="text" name="linkedIn" placeholder="LinkedIn URL" value={formData.linkedIn} onChange={handleChange} />

<label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>Short Bio</label>
<textarea name="bio" placeholder="Short bio" value={formData.bio} onChange={handleChange} style={{width:"490px"}}/>


             {error && <p>{error}</p>}   
            <button type="submit" style={{width:"490px"}}>Register Mentor</button>
        </form>
    );
}
