import Card from '../components/Card'

function Favorite({ items, onAddToFavorite }) {
	return (
		<div className='content p-40'>
			<h1>Мои закладки</h1>

			<div className='d-flex flex-wrap'>
				{items.map(item => (
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
