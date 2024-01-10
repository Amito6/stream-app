import { 
    Navbar,
    Footer,
    IconButton
} from "../../Tailwind";
import Logo from "../Logo/Logo";
import { useSession } from "next-auth/react";



const Template =({children}) => {
    const {data,status} = useSession();
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

    const beforeLogin = [
        {
            label : "register",
            href : "/register",
            icon : "person"
        },
        {
            label : "login",
            href : "/login",
            icon : "login"
        }
    ]
    const afterLogin = [
        {
            label : data && data.user.name,
            href : "/profile",
            icon : "person"
        },
        {
            label : "Logout",
            href : "/api/auth/signout",
            icon : "login",
            logout : true
        }
    ]

    const toolbars = [
        {
            label : <IconButton 
            onClick={()=>alert()}
            theme="primary"
            size="sm"
            className="bg-inherit"
            >search</IconButton>
            
        },
        {
            label : <IconButton 
            dropdown 
            dropdownMenu={
                status === "authenticated"
                ? afterLogin 
                : beforeLogin
            }
            theme="error"
            size="sm"
            >
                {
                    status === "authenticated"
                    ? <img src={data.user.image ? data.user.image :"https://images.vexels.com/media/users/3/145908/raw/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg" } 
                    className="rounded-full" 
                    alt="dummy"></img>
                    : "person"
                }
            </IconButton>
            
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