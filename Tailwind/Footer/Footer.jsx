import Logo from "../../Components/Logo/Logo";
import Image from "next/image";
import ContactForm from "../../Components/contactForm/contactform";
import { IconButton } from "..";

const Footer = () =>{
    const design = (
        <>
            <div className="
            bg-slate-900 
            p-16 flex 
            justify-between 
            flex-col sm:flex-row gap-10 sm:gap-0
            ">
                <div className="mx-auto">
                    <Logo />
                    <p className="text-gray-300 my-5">
                        Lorem ipsum dolor sit amet<br />
                         consectetur adipisicing elit.
                    </p>
                    <div className="flex items-center gap-3">
                        <button className="bg-slate-800 py-2 px-5 rounded-md">
                            <Image 
                            src="/google-play.png" 
                            height={48}
                            width={150}
                            />
                        </button>
                        <button>
                            <Image 
                            src="/app-store.png" 
                            height={60}
                            width={190}
                            />
                        </button>
                    </div>
                </div>

                <div className="mx-auto">
                    <h1>Follow us</h1>
                   <div className="flex gap-3 my-4">
                    <IconButton theme="error">home</IconButton>
                    <IconButton theme="secondary">home</IconButton>
                    <IconButton theme="warning">warning</IconButton>
                    <IconButton theme="success">home</IconButton>
                    <IconButton theme="info">home</IconButton>
                   </div>
                </div>

                <div className="mx-auto w-full sm:w-3/12">
                    <h1 className="text-xl text-gray-300">Contact</h1>
                    <div className="my-5">
                    <ContactForm />
                    </div>
                   
                </div>

            </div>
        </>
    );
    return design;
}
export default Footer;