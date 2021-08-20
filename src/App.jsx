import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App = () => {
  const hi = 'hi';

  return (
    <div>
      <div>hello world</div>
      {hi}
    </div>
  );
};

export default App;
