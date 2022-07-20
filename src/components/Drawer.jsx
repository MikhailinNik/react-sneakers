import React from 'react'
import axios from 'axios'

import { useCart } from '../hooks/useCart'
import Info from './Info'

function Drawer({ onClose, onRemove, items = [] }) {
	const { cartItems, setCartItems, totalPrice } = useCart()
	const [isOrderComplete, setIsOrderComplete] = React.useState(false)
	const [orderId, setOrderId] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(false)

	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			const { data } = await axios.post(
				'https://62bf53d70bc9b125616bd1bf.mockapi.io/orders',
				{ items: cartItems }
			)

			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i]

				await axios.delete(
					'https://62bf53d70bc9b125616bd1bf.mockapi.io/cart/' + item.id
				)
			}

			setOrderId(data.id)
			setIsOrderComplete(true)
			setCartItems([])
		} catch (error) {
			alert('К сожалению, ваш заказ не оформился :(')
			console.error(error)
		}
		setIsLoading(false)
	}
	return (
		<div className='overlay'>
			<div className='drawer'>
				<h2 className='d-flex justify-between mb-30'>
					Корзина
					<img
						className='removeBtn cu-p'
						src='/img/close.svg'
						alt='Close'
						onClick={onClose}
					/>
				</h2>

				{items.length > 0 ? (
					<div className='d-flex flex-column flex'>
						<div className='items'>
							{items.map(obj => (
								<div
									key={obj.id}
									className='cartItem d-flex align-center mb-20'
								>
									<div
										style={{ backgroundImage: `url(${obj.imageUrl})` }}
										className='cartItemImg'
									></div>
									<div className='mr-20 flex'>
										<p className='mb-5'>{obj.title}</p>
										<b>{obj.price} руб.</b>
									</div>
									<img
										onClick={() => onRemove(obj.id)}
										className='removeBtn'
										// переименовать в remove
										src='/img/close.svg'
										alt='Remove'
									/>
								</div>
							))}
						</div>

						<div className='cartTotalBlock'>
							<ul>
								<li>
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice} руб.</b>
								</li>
								<li>
									<span>Налог 5%:</span>
									<div></div>
									<b>{(totalPrice * 5) / 100} руб.</b>
								</li>
							</ul>
							<button
								disabled={isLoading}
								className='greenButton'
								onClick={onClickOrder}
							>
								Оформить заказ
								<img src='/img/arrow.svg' alt='Arrow' />
							</button>
						</div>
					</div>
				) : (
					<Info
						title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
						description={
							isOrderComplete
								? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
								: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
						}
						image={isOrderComplete ? '/img/order-success.jpg' : '/img/cart.jpg'}
					/>
				)}
			</div>
		</div>
	)
}

export default Drawer
