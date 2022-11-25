import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Checa estas increibles funciones!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-10.jpg'
              text='Genere contraseñas seguras'
              label='Seguridad'
              
            />
            <CardItem
              src='images/img-11.jpg'
              text='Se encriptan todas sus contraseñas'
              label='Encriptado'
              
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-12.jpg'
              text='Fácil de usar'
              label='Intuitivo'
              
            />
            <CardItem
              src='images/img-13.jpg'
              text='Autocompleta por usted'
              label='Rápido'
              
            />
            <CardItem
              src='images/img-14.jpg'
              text='Prueve nuestra nueva app'
              label='Portatil'
              
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
