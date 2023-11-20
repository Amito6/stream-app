import { Input } from "postcss";

const Page = () =>{
  const data = [
    {
      label : "Username",
      name : "username",
      type : "text"
    },
    {
      label : "Password",
      name : "password",
      type : "password"
    },
    ,
    {
      label : "DOB",
      name : "dob",
      type : "date"
    },
    {
      label : "Gender",
      name : "gender",
      el : "select",
      options : [
        {
          name : "Male",
          value : "male"
        },
        {
          name : "Female",
          value : "female"
        },
        
        {
          name : "Other",
          value : "other"
        }
      ]
    }
  ]; 

  const Input = ({input}) =>{
    return (
      <>
      <div className="mb-3">
        <label className="block mb-3 text-2xl">{input.label}</label>
        <input type ={input.type} name ={input.name} className="p-3 border" />
      </div>
      </>
    )
  }
  const Select = ({input}) =>{
    return (
      <>
      <div className="mb-3">
        <label className="block mb-3 text-2xl">{input.label}</label>
        <select className="p-3 border w-full">
          {
            input.options.map((option,index)=>{
              return <option value = {option.value}>{option.name}</option>
            })
          }
        </select>
      </div>
      </>
    )
  }
  
  const design = (
    <>
    <div className="flex items-center justify-center  bg-rose-500 min-h-screen">
      <div className="bg-white w-full sm:w-6/12 min-h-screen sm:min-h-0 text-blue-900 rounded-lg p-20">
        <h2 className="text-3xl pb-5">SignUp</h2>
        {
        data.map((input,index)=>{
          if(input.el === "select"){
            return <Select key={index} input={input} />
          }
          return <Input key ={index} input = {input} />
        })
      }
      <button className="bg-teal-600 text-white w-full p-2 m-2 box-border">Submit</button></div>
    </div>
    </>
  );
  return design;
}
export default Page ;