import { 
    Navbar,
    Footer,
    IconButton
} from "../../Tailwind";
import Logo from "../Logo/Logo";

const Template =({children}) => {

    //consts
    const menus ={
        brand : <Logo />,
        link : [
            {
                label : "Home",
                href : "/"
            },
            {
                label : "Movies",
                href : "/movies"
            },
            {
                label : "Blog",
                href : "/blog"
            },
            {
                label : "Videos",
                href : "/videos"
            }
        ]
    }

    const toolbars = [
        {
            label : <IconButton 
            theme="error"
            size="sm"
            className="bg-inherit"
            >search</IconButton>
            
        },
        {
            label : <IconButton 
            theme="error"
            size="sm"
            >person</IconButton>
            
        }
    ]

    //markup


    const design = (
        <>
        <Navbar 
        menu = {menus} 
        theme="dark"
        toolbar={toolbars}
        variant="three"
        />
        <div>
        {children}
        </div>
        <Footer />
        </>
    );
    return design;
}

export default Template