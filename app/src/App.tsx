import React from 'react';
import './App.css';
// import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { gql, ApolloLink } from 'apollo-boost';
import { Mutation, MutationResult } from 'react-apollo';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: ApolloLink.from([
    createUploadLink({
      uri: 'http://localhost:3003'
    })
  ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache'
    }
  }
})

const qry = gql`
mutation singleUpload($file: Upload!){
  singleUpload(file: $file){
    filename,
    mimetype,
    encoding
  }
}
`

class App extends React.Component{
  render(){
    return(
      <ApolloProvider client={client}>
        <Mutation mutation={qry}>
          {
            (uploadFile: any, { loading }: MutationResult) => (
              <input type="file" required 
                onChange={({target}: any) => {
                  if(target.validity.valid){
                    console.log(target.files[0])
                    uploadFile({ variables: { file: target.files[0] } });
                  }
                }}
              />
            )
          }
        </Mutation>
      </ApolloProvider>
    )
  }
}

export default App;
