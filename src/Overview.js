import React from "react";


export default function Overview(props) {


    const src =`${ props.baseImageURL + props.backdrop_path}`


    const style = {backgroundImage: `url(${src})`,   height:'400px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    opacity: .5
}




    return <div
   >


<div class="columns is-mobile " >
  <div class="column is-3" >
  <img alt="movie poster" src={ props.baseImageURL + props.poster_path} onError={e => e.target.style.display = 'none'}  />

  </div>

  <div style={style} >

  <div class="column  is-4 ">
  <p className='has-text-black'>
  {props.title} test
  </p>
  </div>
  <div class="column is-7">
  {props.overview}
  </div>

  </div>

</div>





    </div>;
  }


