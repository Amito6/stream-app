import SweetAlert from "react-bootstrap-sweetalert";

const Dialog = () => {
    const design = (
        <>
            <SweetAlert 
            title="Demo" 
            show={false} 
            showConfirm={false}
            ></SweetAlert>
        </>
    );
    return design;
}
export default Dialog;