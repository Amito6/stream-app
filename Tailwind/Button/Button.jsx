const sample ={
    
    "o-primary" : "border border-teal-600 text-teal-600 px-4 py-2 shadow-lg rounded-sm",
    "o-secondary" : "border border-blue-600 text-blue-600 px-4 py-2 shadow-lg rounded-sm",
    "o-info" : "border border-cyan-600 text-cyan-600 px-4 py-2 shadow-lg rounded-sm",
    "o-error" : "border border-red-600 text-red-600 px-4 py-2 shadow-lg rounded-sm",
    "o-warning" : "border border-orange-600 text-orange-600 px-4 py-2 shadow-lg rounded-sm",
    "o-success" : "border border-green-600 text-green-600 px-4 py-2 shadow-lg rounded-sm",

    "disabled" : "bg-gray-200 text-white px-4 py-2 shadow-lg rounded-sm",
    "primary" : "bg-teal-600 text-white px-4 py-2 shadow-lg rounded-sm",
    "secondary" : "bg-blue-600 text-white px-4 py-2 shadow-lg rounded-sm",
    "info" : "bg-cyan-600 text-white px-4 py-2 shadow-lg rounded-sm",
    "error" : "bg-red-600 text-white px-4 py-2 shadow-lg rounded-sm",
    "warning" : "bg-orange-600 text-white px-4 py-2 shadow-lg rounded-sm",
    "success" : "bg-green-600 text-white px-4 py-2 shadow-lg rounded-sm",

    "t-primary" : "text-black px-4 py-2 rounded-sm",
    "t-secondary" : "text-black px-4 py-2 rounded-sm",
    "t-info" : "text-black px-4 py-2 rounded-sm",
    "t-error" : "text-black px-4 py-2 rounded-sm",
    "t-warning" : "text-black px-4 py-2 rounded-sm",
    "t-success" : "text-black px-4 py-2 rounded-sm"
}

const Button = ({
    children,
    theme="primary",
    className="",
    ...rest

}) =>{
    const design =(
        <>
        <button 
        {...rest}
        className={sample[theme]+ " " +className}>{children}</button>
        </>
    );
    return design;
}

export default Button;