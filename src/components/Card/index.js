import styles from './Card.module.scss'
console.log(styles)

function Card(props) {
	return (
		<div className={styles.card}>
			<img className={styles.favorite} src='/img/liked.svg' alt='Liked' />
			<img width={133} height={112} src={props.imageUrl} alt='Sneakers' />
			<p>{props.title}</p>
			<div className='d-flex justify-between align-center'>
				<div className='d-flex flex-column'>
					<span>Цена:</span>
					<b>{props.price} .руб</b>
				</div>
				<button className='button-plus' onClick={props.onClick}>
					<img width={11} height={11} src='/img/plus.svg' alt='Plus' />
				</button>
			</div>
		</div>
	)
}

export default Card
