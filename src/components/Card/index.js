import styles from './Card.module.scss'
import React from 'react'

function Card({
	title,
	imageUrl,
	price,
	onFavorite,
	onPlus,
	id,
	favorited = false,
}) {
	const [isAdded, setIsAdded] = React.useState(false)
	const [isFavorite, setIsFavorite] = React.useState(favorited)

	const onClickPlus = () => {
		onPlus({ title, imageUrl, price, id })
		setIsAdded(!isAdded)
	}

	const onClickFavorite = () => {
		onFavorite({ title, imageUrl, price, id })
		setIsFavorite(!isFavorite)
	}

	return (
		<div className={styles.card}>
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
					src={isAdded ? '/img/checked.svg' : '/img/plus.svg'}
					alt='Plus'
					onClick={onClickPlus}
				/>
			</div>
		</div>
	)
}

export default Card
