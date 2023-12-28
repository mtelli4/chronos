import React from 'react'
import { CardCont, CardImg, CardSubTitle, CardText, CardTitle } from './cardExempleElements'

const CardExemple = ({ title, subTitle, img, text }) => {
  return (
    <CardCont>
        <CardTitle>{ title }</CardTitle>
        <CardSubTitle>{ subTitle }</CardSubTitle>
        <CardImg src={img} />
        <CardText>
            { text }
        </CardText>
    </CardCont>
  )
}

export default CardExemple
