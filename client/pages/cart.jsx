import React from 'react';
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: null
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      fetch('/api/cart/token', {
        method: 'POST'
      })
        .then(r => r.json())
        .then(r => {
          const { token } = r;
          localStorage.setItem('token', token);
        })
        .catch(err => console.error(err))
      ;
    } else {
      fetch('/api/cart/token', {
        method: 'POST',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(r => r.json())
        .then(r => {
          const cart = [...r];
          this.setState({ cart });
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    const { cart } = this.state;
    if (!cart) return null;
    const subtotal = cart.reduce((prev, current) => {
      return Number(prev.price) + Number(current.price);
    });
    const games = cart.map(e => {
      return (
        <div className="cart-game column-full row" key={e.productid}>
          <div className="cart-game-img-container column-one-third">
            <img src={e.imageurl} alt="" className='cart-game-img' />
          </div>
          <div className='cart-game-text column-one-half'>
            <div className='cart-game-title'>{e.title}</div>
            <div className='quantity-container'>
              <span className='quantity-text'>QNTY</span>
              <div className='quantity-buttons'>
                <i className="fa-solid fa-plus" />
                <span className='quantity-value'>{e.quantity}</span>
                <i className="fa-solid fa-minus" />
              </div>
            </div>
          </div>
          <div className='cart-game-price column-one-sixth row'>${e.price}</div>
        </div>
      );
    });

    return (
      <div>
        <div className='cart-container'>
          <div className='cart-text-container'>
            <p className='cart-text'>CART</p>
          </div>
          <div className="cart-game-container">
            {games}
          </div>
          <div className='checkout-container'>
            <div className='subtotal-container row'>
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className='checkout-btn-container'>
              <a href="#checkout" className='checkout-btn'>CHECKOUT</a>
            </div>
          </div>
        </div>
        <a href="">
          <div className="black" />
        </a>
      </div>
    );
  }
}

export default Cart;