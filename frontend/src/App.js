import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <p className="msgWelcome">
          Find the best <a href="/recipes" className='link'>recipes</a> and share yours!
          <br/>
        </p>
      </header>
    </div>
  );
}

export default App;
