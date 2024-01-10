import { 
    Formik,
    Form,
 } from "formik";
import"./Form.css"
import * as yup from "yup";
import { Button,Input,UploadInput,Select } from "..";

    const FormDesign = (
        {
        fields,
        grid=1,
        gap=4,
        disabled=false, 
        ...rest
    }
    ) => {
        const schema = {
            name : yup.string().required("This Field is Required!"),
            email : yup.string().required("This filed is Required").email("Please enter your email"),
            password : yup.string().required("This Field is Required !"),
            mobile : yup.string().required("This Field is Required !"),
            message : yup.string().required("This Field is Required !"),
            title : yup.string().required("This Field is Required !"),
            desc : yup.string().required("This Field is Required !"),
            duration : yup.string().required("This Field is Required !"),
            staring : yup.string().required("This Field is Required !"),
            thumbnail : yup.string().required("This Field is Required !"),
            movie : yup.string().required("This Field is Required !"),
            video : yup.string().required("This Field is Required !"),
            category : yup.string().required("This Field is Required !"),
            tags : yup.string().required("This Field is Required !"),
        }
    const defaultValues = {};
    const validation = {};

    const Fields = ({formik}) =>{
        const allFields = fields.map((item,index)=>{
            const {component,props} = item;
            switch(component)
            {
                case "input" : return <Input key={index} {...props} />
                case "upload" : return <UploadInput formik={formik} key={index} {...props} />
                case "select" : return <Select key={index} {...props} />
                default : return null;
            }
        });
        return allFields;
    }

    fields.map((item,index)=>{
        const {props} = item;
        const {name} = props;
        defaultValues[name] = "";
        validation[name] = schema[name]
        })


    const design = (
        <>
       <Formik
       {...rest}
       initialValues={defaultValues}
       validationSchema={yup.object(validation)}
       >
        {
            (formik)=>{
                return (
                    <>
                    <Form className={`grid gap-${gap}`}>
                        <div className={`grid grid-cols-${grid} gap-${gap}`}>
                            <Fields 
                            formik={formik}
                            />  
                        </div>
                        <Button type="submit" theme="error" disabled={disabled}>Submit</Button>
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