/*import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import classes from './App.module.css'
/*Ximport './App.css'
import Registration from './Registration'

const query = {
    me: {
        resource: 'me',
    },
}
/*function App() {
    return (
        <div className="App">
            <Registration/>
        </div>
    );
}

const MyApp = () => {
    const { error, loading, data } = useDataQuery(query)

    if (error) {
        return <span>{i18n.t('ERROR')}</span>
    }

    if (loading) {
        return <span>{i18n.t('Loading...')}</span>
    }

    return (
        <div className={classes.container}>
            <h1>{i18n.t('Welcome to DHIS2!')}</h1>
            <h3>{i18n.t('PATIENT_REMINDER BY GROUP_17')}</h3>
        </div>
    )
}

export default MyApp

import React from "react";
/*import sidebar from "./components/sidebar/sidebar.";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from '@dhis2/app-runtime';
const config = {
  //  instance configuration here
  baseUrl: 'https://play.dhis2.org/40.2.0',
};
const query = {
  me: {
    resource: "me",
  },
};

const MyApp = () => (
  <BrowserRouter className="app">
     <DataProvider config={config}>
    {/* <DataQuery query={query}>
            {({ error, loading, data }) => {
                if (error) return <span>ERROR</span>
                if (loading) return <span>...</span>
                return (
                    <>
                        <h1>
                            {i18n.t('Hello {{name}}', { name: data.me.name })}
                        </h1>
                        <h3>{i18n.t('Welcome to DHIS2!')}</h3>
                    </>
                )
            }}
        </DataQuery> }
    {/* <Header /> }
    <div className="homeContainer">
      <Sidebar />
      <div className="contentWrapper">
        <Routes>
          <Route index element={<Welcome/> } />
          <Route path="/reminder" element={<Reminder/>} />
          <Route path="/patients" element={<Patients/>} />
          <Route path="/enroll-patients" element={<Enroll/>} />
          <Route path="/enroll-demo" element={<ReminderComponent/>} />
        </Routes>
      </div>
    </div>
    </DataProvider>
  </BrowserRouter>
);

export default MyApp;
*/
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Components/Registration/Registration";


const MyApp = () => (
  <BrowserRouter>
    <div className="homeContainer">
      <div className="contentWrapper">
        <Routes>
          <Route path="/" element={<div>Welcome</div>} />
          <Route path="/reminder" element={<div>Reminder</div>} />

          <div className="homeContainer">
      <sidebar />
      <div className="contentWrapper">
        <Routes>

          <Route path="" element={Registration} />
        </Routes>
      </div>
    </div>
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);

export default MyApp;
