
import {
  motion,
  AnimatePresence,
} from "framer-motion"
import { useState } from "react";
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useSelector } from "react-redux";
import Loading from "../components/Sidebar/Loading";

function Dashboard() {
  const state = useSelector((state) => state);
  const [isShown, setIsShown] = useState(true)
  const onClick = () =>(
    setIsShown(!isShown)
  )
  let extractDate = (date) => {
  return {
    month: parseInt(date.toLocaleString('default', { month: 'numeric' })),
    year: parseInt(date.toLocaleString('default', { year: 'numeric' })),
    day: parseInt(date.toLocaleString('default', { day: 'numeric' })),
    monthYear: date
      .toLocaleString('default', { month: 'short', year: 'numeric', day: 'numeric' })
      .replace(' ', '-')
    }
  }
  let fixChessDate = (ms) => new Date(+(ms.toString() + "000"))
  let count = 1;
  const getResult = (white_result, black_result) => {
    let result = {}
    if (white_result === "win") {
      result.score = "1-0"
      result.description = "White wins"
    } else if (black_result === "win") {
      result.score = "0-1"
      result.description = "Black wins"
    } else {
      result.score = "1/2-1/2"
      result.description = "Draw"
    }
    return result
  }
  
    
  
  return (
    <div className="title">
      <div className="header text-white fw-bold w-100" >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 2 }}
          >
          { state.todo2.data ? 
            <img
            className="rounded-circle mx-2"
              alt={state.todo2.data.name}
              style={{ width: '3%' }}
              src= { state.todo2.data.avatar }
            />
            : 
            null
          }
            Dashboard
        </motion.div>
      </div>
      {state.todo3.isLoading 
      ?
      <Loading />
      :
      state.todo3.data
      ?      
      <>
        <Button variant="light fs-5 mt-3" onClick={ onClick }>
          { isShown ? "Show" : "Hide" }
        </Button>
        <AnimatePresence>
          { isShown && (
            <motion.div
              key="box"
              initial={{ opacity:0, scale:0.8 }}
              animate={{ opacity:1, scale:1 }}
              exit={{ opacity:0, scale: 0.8, transition: {
                duration:0.2
                }
              }}
              transition={{ duration: 0.2,  ease: "linear" }}
              className="box"
              >
                <div className="csontainer mt-3">
                  <div className="shadow-4 rounded-3 overflow-hidden">
                    <Table className="table align-middle mb-0 bg-white "  >
                      <thead className="table-head text-white ">
                        <tr>
                          <th scope="col">Sr No.</th>
                          <th scope="col">Date</th>
                          <th scope="col">Time</th>
                          <th scope="col">White with Points</th>
                          <th scope="col">Black with Points</th>
                          <th scope="col"> result</th>
                        </tr>
                      </thead>
                    <tbody className="bg-white">
                      {state.todo3.data 
                      ?
                      state.todo3.data.games.map(( country, key ) =>
                        <tr key={ key }>
                          <td className='table-data text-center p-4'>{ count++ }</td>
                          <td className='table-data'>
                            { country ? extractDate( fixChessDate( country.end_time ) ).monthYear : null}</td>
                          <td className='table-data'>
                            <Badge bg="primary rounded-pill">
                              <span>
                                { country.time_control }
                              </span>
                            </Badge>
                          </td>
                          <td className='table-data'> 
                            <div className="wb-points">
                              <span className="me-2">
                                { country.white.username }
                              </span>
                              { country.white.rating > country.black.rating 
                                ? 
                                ( <Badge bg="success">
                                  { country.white.rating }
                                </Badge>)
                                :
                                (<Badge bg="danger">
                                  { country.white.rating }
                                </Badge>)
                              }
                            </div>
                          </td>
                          <td className='table-data'>
                            <div className="wb-points p-2">
                              <span className="me-2">
                                { country.black.username }
                              </span>
                              { country.black.rating > country.white.rating 
                                ?
                                ( <Badge bg="success">
                                  { country.black.rating }
                                </Badge>)
                                :
                                ( <Badge bg="danger">
                                  { country.black.rating }
                                </Badge>)
                              }
                            </div>
                          </td> 
                          <td className='table-data'>
                            <Badge bg="warning">
                              { getResult( country.white.result, country.black.result ).score }
                          </Badge>
                          </td>
                        </tr>)
                        :
                        null
                      }
                    </tbody>
                  </Table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
      :
      <>
        <div className="bg-light rounded shadow fs-2 mt-5 p-3">
          Please Enter Your Username In Search Box Field
        </div>
      </>  
    }
  </div>
  )
}

export default Dashboard