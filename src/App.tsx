import { useState } from 'react'
import './App.css'
import {Layout, Header, Title, Content} from "antd";

function App() {

  return (
      <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
              <Title level={2} style={{ textAlign: 'center' }}>
                  Lista de Produtos
              </Title>
          </Header>
          <Content style={{ padding: '20px' }}>
              <ProductList products={products} />
          </Content>
      </Layout>
  )
}

export default App
