import { Icon } from "../../Tailwind";

const Logo = ({...rest}) => {
    const design =(
        <>
            <div className="flex items-center gap-3">
                <Icon {...rest}>play_circle</Icon>
                <h1 className="text-2xl font-bold text-red-500">Stream app</h1>
            </div>
        </>
    );
    return design;
}

export default Logo;