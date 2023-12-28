import React from 'react'
import CardExemple from '../components/CardExemple'
import img from "../images/test.jpg"
import "../css/stylePageExemple.css" 
/* 
ATTENTION : Ce css contient tt le style fait pour cette 
page mais il n'est pas le seul qui va influer.
Puisqu'à la fin le site est une SPA, toutes les classes css de tt les fichiers
sont chargées. Donc si dans un autre fichier css j'ai dit que tt les h2 étaient rouges
alors mêmes dans les pages qui n'importent pas ce fichier, les h1 seront rouges.
faites bien attention à donner des noms uniques à vos classes

"Mais alors, pourquoi on fait plusieurs fichiers css au lieu d'un seul gros qui contient tt les styleset qui serait importé partout ?"
Psq ça ferait un fichier de 1 000 000 de lignes / c'est plus lisibles comme ça / ça change rien à la fin donc 
autant se faciliter la vie.
*/

const PageExemple = () => {
  return (
    <div className='cardsCont'>
        <CardExemple title="Lucas Leveque" subTitle="Développeur aggéri" img={img} text="Il est l'homme le plus beau du monde, et puis son chat est trop mims aussi ... Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
        <CardExemple title="Laura Leroy" subTitle="Réincarnation de Satan" img={img} text="La haine qu'elle voue envers les humains est sans limites. Elle ferait tout pour éradiquer la vie sur Terre ... Enfin c'est ce qu'on m'a dit." />
        <CardExemple title="Jonathan Isambourg" subTitle="Méga chad absolu" img={img} text="Pas beaucoup d'informations sont connus sur ce mystérieux personnage. Tout ce qu'on peut dire, c'est qu'il atteindra le rang de Giga chad sous peu." />
    </div>
  )
}

export default PageExemple
