import React from 'react'
import AppContext from '../context'

function Info({ title, description, image }) {
	const { setIsCartOpened } = React.useContext(AppContext)
	return (
		<div className='empty-cart d-flex flex-column align-center'>
			<img width={120} src={image} alt='Cart' />
			<h3>{title}</h3>
			<p>{description}</p>
			<button onClick={() => setIsCartOpened(false)} className='greenButton'>
				Вернуться назад
				<img src='/img/arrow.svg' alt='Arrow' />
			</button>
		</div>
	)
}

export default Info
