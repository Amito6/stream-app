import { 
    Formik,
    Form,
 } from "formik";
 import"./Form.css"
 import * as yup from "yup";
import { Button } from "..";

    const FormDesign = ({children,...rest}) => {
        const schema = yup.object({
            fullname : yup.string().required("This Field is Required!"),
            email : yup.string().required("This filed is Required").email("Please enter your email"),
            password : yup.string().required("this Field is Required !"),
            mobile : yup.string().required("this Field is Required !"),
            message : yup.string().required("this Field is Required !")
        })
    const defaultValues = {
        fullname : "",
        email : "",
        password : "",
        mobile : "",
        message : ""
    }
    const design = (
        <>
       <Formik 
       initialValues={defaultValues}
       validationSchema={schema}
       {...rest}
       >
        {
            (formik)=>{
                return (
                    <>
                        <Form>
                        {children}
                        <Button theme="error">Submit</Button>
                        </Form>
                    </>
                )
            }
        }
           
       </Formik>
        </>
    );
    return design;
}

export default FormDesign;