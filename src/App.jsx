import React from 'react'
import axios from 'axios'
import Drawer from './components/Drawer'
import Header from './components/Header'
import Card from './components/Card'

function App() {
	const [items, setItems] = React.useState([])
	const [cartItems, setCartItems] = React.useState([])
	const [searchValue, setSearchValue] = React.useState('')
	const [isCartOpened, setIsCartOpened] = React.useState(false)

	React.useEffect(() => {
		axios
			.get('https://62bf53d70bc9b125616bd1bf.mockapi.io/items')
			.then(res => setItems(res.data))
	}, [])

	const onAddToCart = obj => {
		setCartItems(prev => [...prev, obj])
	}

	const onChangeValue = event => {
		setSearchValue(event.target.value)
	}

	return (
		<div className='wrapper clear'>
			{isCartOpened ? (
				<Drawer items={cartItems} onClose={() => setIsCartOpened(false)} />
			) : null}
			<Header onClickCart={() => setIsCartOpened(true)} />
			<div className='content p-40'>
				<div className='d-flex align-center justify-between mb-40'>
					<h1>
						{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}
					</h1>
					<div className='search-block d-flex'>
						<img src='/img/search.svg' alt='Search' />
						<input
							onChange={onChangeValue}
							placeholder='Поиск ...'
							value={searchValue}
						/>
						{searchValue && (
							<img
								className='clear cu-p'
								src='/img/close.svg'
								alt='Clear'
								onClick={() => setSearchValue('')}
							/>
						)}
					</div>
				</div>

				<div className='d-flex flex-wrap'>
					{items
						.filter(item =>
							item.title.toLowerCase().includes(searchValue.toLowerCase())
						)
						.map(item => (
							<Card
								key={item.id}
								title={item.title}
								price={item.price}
								imageUrl={item.imageUrl}
								onFavorite={''}
								onPlus={obj => onAddToCart(obj)}
							/>
						))}
				</div>
			</div>
		</div>
	)
}

export default App
