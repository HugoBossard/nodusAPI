import React from 'react';
import { Card, Container } from "react-bootstrap";
import AreaChartComponent from './AreaChartComponent';
import BarChartComponent from './BarChartComponent';
import ChartComponent from './ChartComponent';

function CardPage() {
    // durée en minutes eclairage nuit, connaitre temp moyenne derniere 24h,  
  
    return(
        <>
        <Container className="mt-3 pb-3">
            <Card className='shadow-lg  bg-white rounded'>
                <Card.Body>
                    <Card.Title className='d-flex justify-content-center'>
                        <h2>Présentation de la data Visualisation</h2>
                    </Card.Title>
                    <br></br>
                    <br></br>
                    <Card.Text>
                    <div className='d-flex justify-content-center pb-5'>
                        <div style={{width: 80+"%"}}>
                            <ChartComponent />
                        </div>
                    </div>
                    <hr></hr>
                    <br></br>
                    <div className='d-flex justify-content-center pb-5'>
                        <div style={{width: 80+"%"}}>
                            <BarChartComponent/>
                        </div>
                    </div>
                    <hr></hr>
                    <br></br>
                    <div className='d-flex justify-content-center pb-5'>
                        <div style={{width: 80+"%"}}>
                            <AreaChartComponent/>
                        </div>
                    </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
      </>
    )
}
  
  export default CardPage;

  