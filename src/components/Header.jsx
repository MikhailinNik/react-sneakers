import React from 'react'
import { useCart } from '../hooks/useCart'
import { Link } from 'react-router-dom'

function Header(props) {
	const { totalPrice } = useCart()

	return (
		<header className='d-flex justify-between align-center p-40'>
			<Link to='/'>
				<div className='d-flex align-center'>
					<img width={40} height={40} src='/img/logo.png' alt='logo' />
					<div>
						<h3>REACT SNEAKERS</h3>
						<p>Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>
			<ul className='d-flex '>
				<li className='mr-30 cu-p' onClick={props.onClickCart}>
					<img width={18} height={13} src='/img/cart.svg' alt='cart' />
					<span>{totalPrice} руб.</span>
				</li>
				<li>
					<Link to='/favorite'>
						<img
							width={18}
							height={13}
							src='/img/favorite.svg'
							alt='favorite'
						/>
					</Link>
				</li>
				<li>
					<Link to='/orders'>
						<img width={18} height={13} src='/img/user.svg' alt='user' />
					</Link>
				</li>
			</ul>
		</header>
	)
}

export default Header
