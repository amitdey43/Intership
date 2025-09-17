import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterHR = function() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        companyName: "",
        companyWebsite: "",
        designation: "",
        department: "",
        industryType: "",
        officeLocation: "",
    });
    let navigate= useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send JSON directly
        axios.post("http://localhost:8000/app/hr/register", formData, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        })
        .then((res) => {
            console.log("HR Registered:", res.data);
            console.log(res.data.token);
            
            // Reset form on success
            setFormData({
                name: "",
                email: "",
                password: "",
                companyName: "",
                companyWebsite: "",
                designation: "",
                department: "",
                industryType: "",
                officeLocation: "",
            });
            setError(""); // Clear previous errors
            navigate("/hr/dashboard")
        })
        .catch((err) => {
            const msg = err.response?.data?.message || err.response?.data || "Something went wrong";
            setError(msg);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="userform">
            <h1 style={{display:"flex", justifyContent:"center", fontSize:"2rem", fontWeight:"700", textDecoration:"underline"}}>HR Registration</h1>
            <label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>Full Name</label>
<input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />

<label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>Email</label>
<input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

<label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>Password</label>
<input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

<label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>Company Name</label>
<input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required />

<label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>Company Website</label>
<input type="text" name="companyWebsite" placeholder="Company Website" value={formData.companyWebsite} onChange={handleChange} />

<label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>Designation</label>
<input type="text" name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} required />

<label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>Department</label>
<input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />

<label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>Industry Type</label>
<input type="text" name="industryType" placeholder="Industry Type" value={formData.industryType} onChange={handleChange} required />

<label style={{color:"white", marginLeft:"7px", marginBottom:"-5px"}}>Office Location</label>
<input type="text" name="officeLocation" placeholder="Office Location" value={formData.officeLocation} onChange={handleChange} required />


            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" style={{width:"490px"}}>Register HR</button>
        </form>
    );
};
