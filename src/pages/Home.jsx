import Card from '../components/Card/index'

function Home({
	searchValue,
	onChangeValue,
	setSearchValue,
	items,
	onAddToCart,
	onAddToFavorite,
}) {
	return (
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
							onFavorite={obj => onAddToFavorite(obj)}
							onPlus={obj => onAddToCart(obj)}
							{...item}
						/>
					))}
			</div>
		</div>
	)
}

export default Home
