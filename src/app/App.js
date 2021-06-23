import './App.css';
import HttpService from '../services/http-service';
import Product from '../product/product';
import React, { useState, useEffect } from 'react';
import WishList from '../wishlist/wishlist';
import DataService from '../services/data-service';
import NotificationService, { NOTIF_WISHLIST_CHANGED, NOTIF_CART_CHANGED } from '../services/notification-service';
import ShoppingBag from '../bag/bag';
import Header from '../header/header';

const http = new HttpService();

function App() {
  let ds = new DataService();
  let ns = new NotificationService();

  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    loadData();

    function onCartChanged() {
      setCount(ds.cartItemCount());

  };
  ns.addObserver(NOTIF_CART_CHANGED, this, onCartChanged);

  return function cleanup() {
      ns.removeObserver(this, NOTIF_CART_CHANGED);
  };

  });

  const loadData = () => {
    http.getProducts().then(data => {
      //console.log(data);
      setProducts(data);
    }, err => {

    });
  }

  const productList = () => {
    const list = products.map((product) =>
      <div className="col-sm-4" key={product._id}>
        <Product product={product} />
      </div>
    );
    return (list);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <a href="#" onClick={() => setModalShow(true)} className="btn btn-outline-secondary"><i class="bi bi-bag"></i><span class="badge badge-success">{count}</span></a>
        <ShoppingBag show={modalShow} onHide={() => setModalShow(false)} />
      </header>
      <div className="container-fluid App-main">
        <div className="row">
          <div className="col-sm-8">
            <div className="row">
              {productList()}
            </div>
          </div>
          <div className="col-sm-4">
            <WishList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
