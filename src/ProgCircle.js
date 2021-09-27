import React from "react";
import {  buildStyles,  CircularProgressbarWithChildren } from 'react-circular-progressbar';




const ProgCircle= (props) => {
  return (<div className="has-text-centered column " >



  <CircularProgressbarWithChildren
  value={props.vote_average}

styles={buildStyles({
  // Rotation of path and trail, in number of turns (0-1)
  rotation: 0.25,

  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
  strokeLinecap: 'butt',

  // Text size
  textSize: '16px',

  // How long animation takes to go from one percentage to another, in seconds
  pathTransitionDuration: 0.5,

  // Can specify path transition in more detail, or remove it entirely
  // pathTransition: 'none',

  // Colors
  //pathColor: rgba(62, 152, 199, ${props.vote_average/ 1}),
  //textColor: '#00d1b2',
  trailColor: '#00d1b2',
  backgroundColor: '#3e98c7',
})}
>
{/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */
}

<div className="is-size-6 mb-5 ">
  <strong>{props.vote_average * 10}%</strong>

</div>
</CircularProgressbarWithChildren>
  </div>










  );
};
export default ProgCircle;