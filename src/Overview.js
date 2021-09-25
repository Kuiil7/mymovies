import React from "react";


const Overview= (props) => {
  return (<div >
<section class="Overview is-primary " >
  <div class="hero-body">
    <p class="title">
     {props.overview}
    </p>
    <p class="subtitle">
      Primary subtitle
    </p>
  </div>
</section>
</div>

  );
};
export default Overview;