import DataService from '../services/data-service';
import './product.condensed.css';

function ProductCondensed(props) {
    let ds = new DataService();

    const removeProduct = () => {
        if(props.parent === "cart") {
            ds.removeCartItem(props.product);
        } else {
            ds.removeWishListItem(props.product);
        }  
    }

    /*var qtyClass;

    if (props.parent === "cart") {
        qtyClass = "btn btn-secondary quantity";
    } else {
        qtyClass = "invisible";
    }*/

    return(
        <li className="list-group-item d-flex pc-condensed">
            <a onClick = {() => removeProduct()} className="btn btn-outline-danger">X</a>
            <p>{props.product.title} | <b>{props.product.price}</b></p>
            {/*<span className={qtyClass}>0</span>*/}
        </li>
    );
}

export default ProductCondensed;