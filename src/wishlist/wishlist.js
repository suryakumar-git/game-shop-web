import './wishlist.css';
import ProductCondensed from '../product-condensed/product.condensed';
import React, { useState, useEffect } from 'react';
import DataService from '../services/data-service';
import NotificationService, { NOTIF_WISHLIST_CHANGED } from '../services/notification-service';

function WishList(props) {
    let ns = new NotificationService();

    const [wishList, setWishList] = useState([]);

    useEffect(() => {

        function onWishListChanged(newWishList) {
            setWishList(newWishList);

        };
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, onWishListChanged);

        return function cleanup() {
            ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
        };

    });

    const creatWishList = () => {
        const list = wishList.map((product) => 
            <ProductCondensed product={product} key={product._id} parent="wishlist" />
        );
        return (list);
    };
    

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Wish List</h4>
                <ul className="list-group">
                    {creatWishList()}
                </ul>
            </div>
        </div>
    );
}

export default WishList;