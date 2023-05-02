import React,{useEffect, useState} from 'react'
import DatePicker from "react-datepicker";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Legend,
    Title,
    Tooltip,
  } from 'chart.js';
import {Bar, Pie} from 'react-chartjs-2'
import {Card, CardBody, CardHeader, Col, Input, Label, Row} from 'reactstrap'
import axios from 'axios'
function Dashboard() {
    const [startYear,setStartYear] = useState([])
    const [data,setData] = useState({})
    const [chartData,setChartData] = useState({})

    const getChartData = () =>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/dataset/get_data',
          };
          
          axios.request(config)
          .then((response) => {    
            setChartData({
                intensity:{
                    label : [...response.data['intensity'].map(item => item._id) ],
                    data:[...response.data['intensity'].map(item => item.sum)]
                },
                likelihood : {
                    label : [...response.data['likelihood'].map(item => item._id) ],
                    data:[...response.data['likelihood'].map(item => item.sum)]
                },
                relevance:{
                    label : [...response.data['relevance'].map(item => item._id) ],
                    data:[...response.data['relevance'].map(item => item.sum)],
                },
                region:{
                    label : [...response.data['region'].map(item => item._id) ],
                    data:[...response.data['region'].map(item => item.count)],
                    color:[...response.data['region'].map(item => (getRandomColor()))]
                },
                country:{
                    label : [...response.data['country'].map(item => item._id) ],
                    data:[...response.data['country'].map(item => item.count)],
                    color:[...response.data['country'].map(item => (getRandomColor()))]
                },
                i:response.data['i'],
                l:response.data['l'],
                r:response.data['r'],
            })
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const getAllStartYear = () =>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/dataset/get_all_start_years',
          };
          
          axios.request(config)
          .then((response) => {   
            setStartYear(response.data)
           }).catch((err) => {
            console.log(err);
           })
    }

    const filterData = () =>{
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/dataset/get_filter_data',
            data:{
                ...data
            }
          };
          
          axios.request(config)
          .then((response) => {   
            setChartData({
                ...chartData,
                intensity:{
                    label : [...response.data['intensity'].map(item => item._id) ],
                    data:[...response.data['intensity'].map(item => item.sum)]
                },
                likelihood : {
                    label : [...response.data['likelihood'].map(item => item._id) ],
                    data:[...response.data['likelihood'].map(item => item.sum)]
                },
                relevance:{
                    label : [...response.data['relevance'].map(item => item._id) ],
                    data:[...response.data['relevance'].map(item => item.sum)]
                },
            })
           }).catch((err) => {
            console.log(err);
           })
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        console.log(color);
        return color;
      }

    useEffect(() =>{
        getAllStartYear()
        getChartData()
    },[])

    useEffect(()=>{
        if(Object.keys(data).length === 0) return
        filterData()
    },[data])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        BarElement,
        LineElement,
        ArcElement,
        Legend,
        Title,
        Tooltip,
      );

    const onChangeHandler =  (e) =>{
        setData({
            ...data,
            [e.target.name] : parseInt(e.target.value)
        })
    }

    console.log(chartData);

  return (
    <div style={{marginTop:"-3rem"}}>
        <Row>
            <Col md='3'>
                <Card style={{background: 'linear-gradient(87deg, #5e72e4 0, #825ee4 100%)'}} >
                    <CardBody>
                        <Row>
                            <Col>
                                <h5 class="text-uppercase mb-2" style={{color:"white"}}> Intensity</h5>
                                <span class="font-weight-bold mb-0" style={{color:'white'}}>{chartData.i}</span>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col md='3'>
                <Card style={{background: 'linear-gradient(87deg, #11cdef 0, #1171ef 100%)'}} >
                    <CardBody>
                        <Row>
                            <Col>
                                <h5 class="text-uppercase mb-2" style={{color:"#fff"}}>Likelihood</h5>
                                <span class="font-weight-bold mb-0" style={{color:'white'}}>{chartData.l}</span>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col md='3'>
                <Card style={{background:'linear-gradient(87deg, #f5365c 0, #f56036 100%)'}} >
                    <CardBody>
                        <Row>
                            <Col>
                                <h5 class="text-uppercase mb-2" style={{color:"white"}}>Relevance</h5>
                                <span class="font-weight-bold mb-0" style={{color:'white'}}>{chartData.r}</span>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col md='3'>
                <Card style={{background:'linear-gradient(87deg, #172b4d 0, #1a174d 100%)'}} >
                    <CardBody>
                        <Row>
                            <Col>
                                <h5 class="text-uppercase mb-2" style={{color:"white"}}>Revenue</h5>
                                <span class="font-weight-bold mb-0" style={{color:'white'}}>{6}</span>
                            </Col>  
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        <Card className='mt-4'>
            <CardBody>
                <Row>
                    <Col md='3'>
                        <Label>Select Start Year</Label>
                        <Input
                            type='select'
                            name='start_year'
                            onChange={(e) => onChangeHandler(e)}
                        >
                            <option>Select Start Year</option>
                            {
                                startYear && startYear.map((year,index) => (
                                    year !== "" &&
                                    <option key={index} value={year}>{year}</option>
                                ))
                            }
                        </Input>
                    </Col>
                </Row>
                <Row className='mt-4 d-flex justify-content-center'>
                    <Col>
                        <h3>Intensity Graph</h3>
                        {
                            Object.keys(chartData).length !== 0 &&
                            <Bar
                                data={{
                                    labels: [...chartData?.intensity?.label],
                                    datasets: [
                                        {
                                            data: [...chartData?.intensity?.data],
                                            label:"Sector",
                                            backgroundColor:[getRandomColor()],
                                        },
                                    ],
                                }}
                        />
                    }

                    </Col>

                </Row>
                <Row className='mt-4 d-flex justify-content-center'>
                    <Col>
                        <h3>Likelihood Graph</h3>
                        {
                            Object.keys(chartData).length !== 0 &&
                            <Bar
                                data={{
                                    labels: [...chartData?.likelihood?.label],
                                    datasets: [
                                        {
                                            data: [...chartData?.likelihood?.data],
                                            label:"Sector",
                                            backgroundColor:[getRandomColor()],
                                        },
                                    ],
                                }}
                            />
                    }
                    </Col>
                </Row>
                <Row className='mt-4 d-flex justify-content-center'>
                    <Col>
                        <h3>Relevance Graph</h3>
                        {
                            Object.keys(chartData).length !== 0 &&
                            <Bar
                                data={{
                                    labels: [...chartData?.relevance?.label],
                                    datasets: [
                                        {
                                            data: [...chartData?.relevance?.data],
                                            label:"Sector",
                                            backgroundColor:[getRandomColor()],
                                        },
                                    ],
                                }}
                        />
                    }
                    </Col>
                </Row>
                <Row className='mt-4 d-flex justify-content-center'>
                    <Col>
                        <h3>Region Graph</h3>
                        {
                            Object.keys(chartData).length !== 0 &&
                            <Pie
                                data={{
                                    labels: [...chartData?.region?.label],
                                    datasets: [
                                        {
                                            data: [...chartData?.region?.data],
                                            backgroundColor:[...chartData?.region?.color
                                            ],
                                        },
                                    ],
                                }}
                        />
                    }
                    </Col>
                </Row>
                <Row className='mt-4 d-flex justify-content-center'>
                    <Col>
                        <h3>Country Graph</h3>
                        {
                            Object.keys(chartData).length !== 0 &&
                            <Pie
                                data={{
                                    labels: [...chartData?.country?.label],
                                    datasets: [
                                        {
                                            data: [...chartData?.country?.data],
                                            backgroundColor:[...chartData?.country?.color
                                            ],
                                        },
                                    ],
                                }}
                        />
                    }
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </div>
  )
}

export default Dashboard