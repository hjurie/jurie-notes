import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Notes from '../../routes/notes';
import Add from '../../routes/add';
import Edit from '../../routes/edit';
import Note from '../../routes/note';


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path={'/'} component={Notes} />
        <Route exact={true} path={'/add'} component={Add} />
        <Route exact={true} path={'/note/:id'} component={Note} />
        <Route exact={true} path={'/edit/:id'} component={Edit} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
