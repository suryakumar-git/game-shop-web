import Modal from 'react-bootstrap/Modal';
import ProductCondensed from '../product-condensed/product.condensed';
import React, { useState, useEffect } from 'react';
import DataService from '../services/data-service';
import NotificationService, { NOTIF_CART_CHANGED } from '../services/notification-service';

function ShoppingBag(props) {

    let ns = new NotificationService();

    const [cart, setCart] = useState([]);

    useEffect(() => {

        function onCartChanged(newCart) {
            setCart(newCart);
        }

        ns.addObserver(NOTIF_CART_CHANGED, this, onCartChanged);

        return function cleanup() {
            ns.removeObserver(this, NOTIF_CART_CHANGED);
        };
    });

    const createCart = () => {
        const list = cart.map((product) => 
            <ProductCondensed product={product} key={product._id} parent="cart"/>
        );
        return (list);
    };


    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"> Shopping Bag </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {createCart()}
            </Modal.Body>
        </Modal>
    );

}

export default ShoppingBag;