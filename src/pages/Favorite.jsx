import React from 'react'
import AppContext from '../context'
import Card from '../components/Card'

function Favorite({ onAddToFavorite }) {
	const { favoriteItems } = React.useContext(AppContext)
	console.log(favoriteItems)
	return (
		<div className='content p-40'>
			<h1>Мои закладки</h1>

			<div className='d-flex flex-wrap'>
				{favoriteItems.map(item => (
					<Card
						key={item.id}
						{...item}
						favorited={true}
						onFavorite={obj => onAddToFavorite(obj)}
					/>
				))}
			</div>
		</div>
	)
}

export default Favorite
