import React from 'react';
import {Route} from 'react-router-dom';

export const AppRoute = ({component: Component, layout: Layout, ...rest, showScroll: showScroll}) => {
  if (Layout === undefined || Component === undefined) {
    return (
        <Route
            {...rest}
            render={props => (
                <div
                    style={{
                      fontFamily: 'sans-serif',
                      color: 'rgb(206, 17, 38)',
                      margin: '0 auto',
                      maxHeight: '50%',
                      overflow: 'auto',
                      width: '100%',
                      height: '100%',
                      boxSizing: 'border-box',
                      textAlign: 'left',
                      center: 'middle'
                    }}>
                  <h1 style={{fontSize: '2em'}}>AppRoute not properly build</h1>
                  <br/>
                  <div style={{backgroundColor: 'rgba(206, 17, 38, 0.05)'}}>
                    <p> Props at AppRoute</p>
                    <br/>
                    <pre>{JSON.stringify(props, null, 2)}</pre>
                  </div>
                </div>
            )}
        />
    );
  }

  return (
      <Route
          {...rest}
          render={props => (
              <Layout showScroll={showScroll}>
                <Component {...props}/>
              </Layout>
          )}
      />
  );
};
