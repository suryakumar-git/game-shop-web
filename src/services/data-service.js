import NotificationService, {NOTIF_WISHLIST_CHANGED, NOTIF_CART_CHANGED} from './notification-service';

let ns = new NotificationService();

let instance = null;
var wishList = [];
var cart = [];

class DataService {
    constructor () {
        if(!instance) {
            instance = this;
        }
        return instance;
    }

    itemOnWishList = item => {
        for(var x = 0; x < wishList.length; x++) {
            if (wishList[x]._id === item._id) {
                return true;
            }
        }
        return false;
    }

    addWishListItem = item => {
        wishList.push(item);
        ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
    }

    removeWishListItem = item => {
        for (var x = 0; x < wishList.length; x++) {
            if(wishList[x]._id === item._id) {
                wishList.splice(x, 1);
                ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
                break;
            }

        }
    }

    addCartItem = item => {
        cart.push(item);
        ns.postNotification(NOTIF_CART_CHANGED, cart);

    }
    addQuantity = item => {
        cart.push(item);
        /*for ( var x=0; x < cart.length; x++) {
            if (cart[x]._id === item._id) {}
        }*/
        //console.log(cart[0]);
        ns.postNotification(NOTIF_CART_CHANGED, cart);
    }

    cartItemCount = () => {
        return cart.length;
    }

    itemOnCart = item => {
        for(var x = 0; x < cart.length; x++) {
            if (cart[x]._id === item._id) {
                return true;
            }
        }
        return false;
    }

    removeCartItem = item => {
        for (var x = 0; x < cart.length; x++) {
            if(cart[x]._id === item._id) {
                cart.splice(x, 1);
                ns.postNotification(NOTIF_CART_CHANGED, cart);
                break;
            }

        }
    }
}

export default DataService;