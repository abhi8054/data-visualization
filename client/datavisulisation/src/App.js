import './App.css';
import { Container} from 'reactstrap'
import Dashboard from './pages/Dashboard/Dashboard';
function App() {
  return (
    <div className='layout'>
      <div className='top__layout'></div>
      <div className='content__holder'>
        <Container fluid>
          <Dashboard />
        </Container>
      </div>
    </div>
  );
}

export default App;
