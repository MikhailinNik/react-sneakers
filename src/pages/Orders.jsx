import React from 'react'
import axios from 'axios'

import Card from '../components/Card'

function Orders() {
	const [orders, setOrders] = React.useState([false])
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		;(async () => {
			try {
				const { data } = await axios.get(
					'https://62bf53d70bc9b125616bd1bf.mockapi.io/orders'
				)

				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
				setIsLoading(false)
			} catch (error) {
				alert('Ошибка при запросе заказов')
			}
		})()
	}, [])

	return (
		<div className='content p-40'>
			<h1>Мои заказы</h1>

			<div className='d-flex flex-wrap'>
				{isLoading
					? Array.from(Array(7), (_, index) => (
							<Card key={index} loading={isLoading} />
					  ))
					: orders.map(item => (
							<Card key={item.id} loading={isLoading} {...item} />
					  ))}
			</div>
		</div>
	)
}

export default Orders
