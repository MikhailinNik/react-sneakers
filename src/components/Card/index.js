import styles from './Card.module.scss'
import React from 'react'
import ContentLoader from 'react-content-loader'
import AppContext from '../../context'

function Card({
	title,
	imageUrl,
	price,
	onFavorite,
	onPlus,
	id,
	favorited = false,
	loading = false,
}) {
	const { isItemAdded } = React.useContext(AppContext)

	const [isFavorite, setIsFavorite] = React.useState(favorited)

	const onClickPlus = () => {
		onPlus({ title, imageUrl, price, id })
	}

	const onClickFavorite = () => {
		onFavorite({ title, imageUrl, price, id })
		setIsFavorite(!isFavorite)
	}

	return (
		<div className={styles.card}>
			{loading ? (
				<ContentLoader
					speed={2}
					width={210}
					height={260}
					viewBox='0 0 210 260'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'
				>
					<rect x='0' y='0' rx='10' ry='10' width='150' height='91' />
					<rect x='0' y='140' rx='10' ry='10' width='93' height='15' />
					<rect x='0' y='122' rx='10' ry='10' width='150' height='15' />
					<rect x='0' y='170' rx='10' ry='10' width='80' height='24' />
					<rect x='120' y='170' rx='10' ry='10' width='32' height='32' />
				</ContentLoader>
			) : (
				<>
					<img
						className={styles.favorite}
						src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'}
						alt='Unliked'
						onClick={onClickFavorite}
					/>
					<img width={133} height={112} src={imageUrl} alt='Sneakers' />
					<p>{title}</p>
					<div className='d-flex justify-between align-center'>
						<div className='d-flex flex-column'>
							<span>Цена:</span>
							<b>{price} .руб</b>
						</div>
						<img
							className={styles.plus}
							src={isItemAdded(id) ? '/img/checked.svg' : '/img/plus.svg'}
							alt='Plus'
							onClick={onClickPlus}
						/>
					</div>
				</>
			)}
		</div>
	)
}

export default Card
