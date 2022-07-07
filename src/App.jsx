import React from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import Drawer from './components/Drawer'
import Header from './components/Header'
import Home from './pages/Home'
import Favorite from './pages/Favorite'

function App() {
	const [items, setItems] = React.useState([])
	const [cartItems, setCartItems] = React.useState([])
	const [favoriteItems, setFavoriteItems] = React.useState([])
	const [searchValue, setSearchValue] = React.useState('')
	const [isCartOpened, setIsCartOpened] = React.useState(false)

	React.useEffect(() => {
		axios
			.get('https://62bf53d70bc9b125616bd1bf.mockapi.io/items')
			.then(res => setItems(res.data))
		axios
			.get('https://62bf53d70bc9b125616bd1bf.mockapi.io/cart')
			.then(res => setCartItems(res.data))
		axios
			.get('https://62bf53d70bc9b125616bd1bf.mockapi.io/favorites')
			.then(res => setFavoriteItems(res.data))
	}, [])

	const onAddToCart = async obj => {
		try {
			const { data } = await axios.post(
				'https://62bf53d70bc9b125616bd1bf.mockapi.io/cart',
				obj
			)
			setCartItems(prev => [...prev, data])
		} catch (error) {
			alert('Не удалось добавить в корзину')
		}
	}

	const onAddToFavorite = async obj => {
		try {
			if (favoriteItems.find(favObj => favObj.id === obj.id)) {
				axios.delete(
					`https://62bf53d70bc9b125616bd1bf.mockapi.io/favorites/${obj.id}`
				)
			} else {
				const { data } = await axios.post(
					'https://62bf53d70bc9b125616bd1bf.mockapi.io/favorites',
					obj
				)
				setFavoriteItems(prev => [...prev, data])
			}
		} catch (error) {
			alert('Не удалось добавить в избранное')
		}
	}

	const onRemoveItem = id => {
		axios.delete(`https://62bf53d70bc9b125616bd1bf.mockapi.io/cart/${id}`)
		setCartItems(prev => prev.filter(item => item.id !== id))
	}

	const onChangeValue = event => {
		setSearchValue(event.target.value)
	}

	return (
		<div className='wrapper clear'>
			{isCartOpened ? (
				<Drawer
					items={cartItems}
					onClose={() => setIsCartOpened(false)}
					onRemove={onRemoveItem}
				/>
			) : null}

			<Header onClickCart={() => setIsCartOpened(true)} />

			<Route exact path='/'>
				<Home
					searchValue={searchValue}
					onChangeValue={onChangeValue}
					setSearchValue={setSearchValue}
					items={items}
					onAddToCart={onAddToCart}
					onAddToFavorite={onAddToFavorite}
				/>
			</Route>

			<Route exact path='/favorite'>
				<Favorite items={favoriteItems} onAddToFavorite={onAddToFavorite} />
			</Route>
		</div>
	)
}

export default App
