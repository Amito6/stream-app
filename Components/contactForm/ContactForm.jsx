import { 
    FormDesign,
    Input
} from "../../Tailwind";

const ContactForm = () =>{
    const design =(
        <>
            <FormDesign>
                <div className="flex mb-3 flex-col gap-3">
                <Input name="fullname" placeholder="Name" />
                <Input name="email" placeholder="Email" type="email"/>
                <Input name="mobile" placeholder="Mobile" type="number"/>
                <Input name="password" placeholder="Password" type="password" />
                <Input name="message" placeholder="Message" textarea />
                </div>
            </FormDesign>
        </>
    );
    return design;

}
export default ContactForm;