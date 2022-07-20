import React from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import Drawer from './components/Drawer'
import Header from './components/Header'
import Home from './pages/Home'
import Favorite from './pages/Favorite'
import Orders from './pages/Orders'
import AppContext from './context'

function App() {
	const [items, setItems] = React.useState([])
	const [cartItems, setCartItems] = React.useState([])
	const [favoriteItems, setFavoriteItems] = React.useState([])
	const [searchValue, setSearchValue] = React.useState('')
	const [isCartOpened, setIsCartOpened] = React.useState(false)
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		async function fetchData() {
			setIsLoading(true)
			const cartResponse = await axios.get(
				'https://62bf53d70bc9b125616bd1bf.mockapi.io/cart'
			)
			const favoriteResponse = await axios.get(
				'https://62bf53d70bc9b125616bd1bf.mockapi.io/favorites'
			)
			const itemsResponse = await axios.get(
				'https://62bf53d70bc9b125616bd1bf.mockapi.io/items'
			)

			setIsLoading(false)

			setItems(itemsResponse.data)
			setCartItems(cartResponse.data)
			setFavoriteItems(favoriteResponse.data)
		}

		fetchData()
	}, [])

	const onAddToCart = async obj => {
		try {
			if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
				axios.delete(
					`https://62bf53d70bc9b125616bd1bf.mockapi.io/cart/${obj.id}`
				)
				setCartItems(prev =>
					prev.filter(item => Number(item.id) !== Number(obj.id))
				)
			} else {
				axios.post('https://62bf53d70bc9b125616bd1bf.mockapi.io/cart', obj)
				setCartItems(prev => [...prev, obj])
			}
		} catch (error) {
			alert('Не удалось добавить в корзину')
		}
	}

	const onAddToFavorite = async obj => {
		try {
			if (favoriteItems.find(favObj => +favObj.id === +obj.id)) {
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
		setCartItems(prev => prev.filter(item => +item.id !== +id))
	}

	const onChangeValue = event => {
		setSearchValue(event.target.value)
	}

	const isItemAdded = id => {
		return cartItems.some(obj => Number(obj.id) === Number(id))
	}
	return (
		<AppContext.Provider
			value={{
				items,
				cartItems,
				favoriteItems,
				isItemAdded,
				onAddToFavorite,
				onAddToCart,
				setIsCartOpened,
				setCartItems,
				setIsLoading,
			}}
		>
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
						cartItems={cartItems}
						onAddToCart={onAddToCart}
						onAddToFavorite={onAddToFavorite}
						isLoading={isLoading}
					/>
				</Route>

				<Route exact path='/favorite'>
					<Favorite onAddToFavorite={onAddToFavorite} />
				</Route>

				<Route exact path='/orders'>
					<Orders onAddToFavorite={onAddToFavorite} />
				</Route>
			</div>
		</AppContext.Provider>
	)
}

export default App
