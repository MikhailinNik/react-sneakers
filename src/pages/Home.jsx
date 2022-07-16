import Card from '../components/Card/index'

function Home({
	searchValue,
	onChangeValue,
	setSearchValue,
	items,
	onAddToCart,
	onAddToFavorite,
	cartItems,
	isLoading,
}) {
	const renderingItems = () => {
		const loadingCards = () =>
			Array.from(Array(7), (_, index) => (
				<Card key={index} loading={isLoading} />
			))

		const filteredItems = items.filter(item =>
			item.title.toLowerCase().includes(searchValue.toLowerCase())
		)

		return isLoading
			? loadingCards()
			: filteredItems.map(item => (
					<Card
						key={item.id}
						onFavorite={obj => onAddToFavorite(obj)}
						onPlus={obj => onAddToCart(obj)}
						{...item}
						added={cartItems.some(obj => +obj.id === +item.id)}
						loading={isLoading}
					/>
			  ))
	}

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

			<div className='d-flex flex-wrap'>{renderingItems()}</div>
		</div>
	)
}

export default Home
