import './product.css';
import React, { useState, useEffect } from 'react';
import DataService from '../services/data-service';
import NotificationService, { NOTIF_WISHLIST_CHANGED, NOTIF_CART_CHANGED } from '../services/notification-service';

function Product(props) {
    let ds = new DataService();
    let ns = new NotificationService();

    const [isOnWishList, setIsOnWishList] = useState(false);
    const [isOnCart, setIsOnCart] = useState(false);

    useEffect(() => {

        function onWishListChanged(newWishList) {
            setIsOnWishList(ds.itemOnWishList(props.product));

        };

        function onCartChanged() {
            setIsOnCart(ds.itemOnCart(props.product));
        }
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, onWishListChanged);
        ns.addObserver(NOTIF_CART_CHANGED, this, onCartChanged);

        return function cleanup() {
            ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
            ns.removeObserver(this, NOTIF_CART_CHANGED);
        };

    });

    const onButtonClicked = () => {
        if (isOnWishList) {
            ds.removeWishListItem(props.product);
        } else {
            ds.addWishListItem(props.product);
        }
    }

    const onAddtoCart = () => {
        if (!isOnCart) {
            ds.addCartItem(props.product);
        } else {
            ds.addQuantity(props.product);
        }
    }

    var btnClass;

    if (isOnWishList) {
        btnClass = "btn btn-danger";
    } else {
        btnClass = "btn btn-primary";
    }

    return (
        <div className="card product">
            <img className="card-img-top" src={props.product.imgUrl} alt="Product" ></img>
            <div className="card-body">
                <h6 className="card-title">{props.product.title}</h6>
                <p className="card-text">Price: ${props.product.price}</p>
                <div>
                    <a href="#" onClick={() => onAddtoCart()} className="btn btn-outline-secondary">Add to Cart <i class="bi bi-cart"></i></a>
                    <a href="#" onClick={() => onButtonClicked()} className={btnClass}><i class="bi bi-heart-fill"></i></a>
                </div>
            </div>
        </div>
    );
}

export default Product;