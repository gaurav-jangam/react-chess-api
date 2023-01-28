import React from 'react'
import {
  motion,
  AnimatePresence,
} from "framer-motion"
import Button from 'react-bootstrap/Button';
import { useSelector } from "react-redux";
import { useState } from "react";

function Profile() {
  const state = useSelector((state) => state);
  const [isShown, setIsShown] = useState(true)
  const onClick = () =>(
    setIsShown(!isShown)
  )
  let extractDate = (date) => {
    return {
      month: parseInt(date.toLocaleString('default', { month: 'numeric' })),
      year: parseInt(date.toLocaleString('default', { year: 'numeric' })),
      monthYear: date
        .toLocaleDateString('default', { month: 'short', year: 'numeric' })
        .replace(' ', '-')
      }
    }
    let fixChessDate = (ms) => new Date(+(ms.toString() + "000"))

  return (
    <div className="title mb-5">

    <div className="header text-white fw-bold w-100" >
    <motion.div
   initial={{ opacity: 0, scale: 0.9 }}
   animate={{ opacity: 1, scale: 1 }}
   transition={{ type: "spring", duration: 2 }}
 >
    { state.todo2.data ? 
       <img
                          className="rounded-circle mx-2"
                          alt=""
                          style={{ width: '3%' }}
                          src= { state.todo2.data.avatar }
                        />
                         : null }
 Profile 
 </motion.div>

   </div>
               {state.todo2.data && state.todo.data ? 
               <>
                 <Button variant="light fs-5 mt-3" onClick={onClick}> {isShown?"Show":"Hide"}</Button>
    <AnimatePresence>
  
        {isShown && (
          <motion.div
          key="box"
          initial={{ opacity:0, scale:0.8 }}
          animate={{ opacity:1, scale:1 }}
          exit={{ opacity:0, scale: 0.8, transition: {
            duration:0.2
          }}}
          transition={{ duration: 0.2,  ease: "linear" }}
          className="box"
          >
<div class=" mt-3 container d-flex justify-content-center">
    <div class="card p-3 py-4">
        <div class="text-center"> 
		<img src={state.todo2.data.avatar} width="100" class="rounded-circle" />
            <h3 class="mt-2">{state.todo2.data.name}</h3>
			<span class="mt-1 clearfix">Status: <span className='fw-bold'>
        {state.todo2.data.status}
        </span>
        </span>
			
			<div class="row mt-3 mb-3">
			
			  <div class="col-md-4">
				<h6>Chess Blitz</h6>
				<span class="num">{state.todo.data.chess_blitz.last.rating}</span>
			  </div>
			  <div class="col-md-4">
			  <h6>Chess Bullet</h6>
				<span class="num">{state.todo.data.chess_bullet.last.rating}</span>
			  </div>
			  <div class="col-md-4">
			  <h6>Puzzle Rush</h6>
				<span class="num">{ state.todo.data.puzzle_rush.best.score }</span>
			  </div>
			
			</div>
			
			<hr class="line" />
			
			<div class="row text-center mt-3 mb-3" style={{ justifyContent: 'center' }}>
			
			  <div class="col-md-4 text-center">
				<h6>Chess Blitz</h6>
				<span class="num">{extractDate(fixChessDate(state.todo2.data.joined)).monthYear }</span>
			  </div>
        
			  <div class="col-md-4">
			  <h6>Chess Bullet</h6>
				<span class="num">{extractDate(fixChessDate(state.todo2.data.last_online)).monthYear }</span>
			  </div>
			
			</div>
			  
			 <div class="profile mt-5">
			 
			 <button class="profile_button px-5">
        <a className='text-white' href={state.todo2.data.url} style={{ textDecoration:'none' }} target="_blank" >
        View profile

        </a>
        </button>

		</div>
			   
        </div>
    </div>
</div>
</motion.div>
        )}
        </AnimatePresence>
                     </>
:
<div className="bg-light rounded shadow fs-2 mt-5 p-3">
Please Enter Your Username In Search Box Field
</div>
}
   </div>
  )
}

export default Profile
