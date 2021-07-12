import React,{useContext,useEffect,useState} from 'react'; 
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton =(props) => {
    const [btnIsHIghLighted,setBtnIsHIghLighted] = useState(false);

    const cartCtx = useContext(CartContext);

    const {items}=cartCtx;
    const numberOfCartItems=items.reduce((curNumber,item) => {
        return curNumber+item.amount;
    }, 0);

    const btnClasses=`${classes.button} ${btnIsHIghLighted ? classes.bump : ''}`;
   
    useEffect(() => {
        if(items.length === 0)
        {
            return;
        }
        setBtnIsHIghLighted(true);

       const timer = setTimeout(() => {
            setBtnIsHIghLighted(false);
        },300);
        return () => {
            clearTimeout(timer);
        };
    },[items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span >Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );
};
export default HeaderCartButton;