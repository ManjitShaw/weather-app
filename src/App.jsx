import './App.css'
import Weather from './components/Weather';

const App = () => {
  return (
    <div  className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-700 min-h-screen flex justify-center items-center">
      <Weather />
    </div>
  );
};

export default App;
