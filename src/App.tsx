import {Divider, Layout, Space,Typography} from "antd";
import {ProductList} from "./components/ProductList";
import {Content, Header,} from "antd/es/layout/layout";
import {Image} from "./components/Image";
import {GlobalStyles} from "./styles/global.ts";
import {CustomThemeProvider} from "./providers/ThemeProvider.tsx";
import {AntProvider} from "./providers/Ant.tsx";

function App() {

    return (
        <AntProvider>
            <CustomThemeProvider>
                <GlobalStyles/>
                <Layout>
                    <Header style={{
                        background: '#fff',
                        padding: '0 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}>
                        {/* Espaço reservado para a logo */}
                        <div style={{width: '160px',}}>
                            {/* Substitua por sua logo */}
                            <Image src={'/logo.png'} alt="logo do site Pâmela e Igor"/>

                        </div>


                    </Header>

                    <Content style={{padding: '20px'}} >
                        <Space direction="vertical" style={{width: '100%',textAlign: 'center'}}>
                            <Typography.Title level={3} style={{margin: 0}}>
                                Queridos padrinhos
                            </Typography.Title>
                            <Typography.Text style={{
                                margin: 0,
                                fontWeight: 'normal',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                Esta lista é apenas uma sugestão. Ficaremos igualmente felizes
                                com qualquer outro presente que venham a nos oferecer!
                            </Typography.Text>
                        </Space>
                        <Divider/>
                        <ProductList loading={false} products={[{
                            uuid: 'test',
                            title: 'Teste',
                            price: 250,
                            people_quantity: 1,
                            available: 1,
                            description: undefined,
                            image_url: 'https://usrwtizwuzeavrdjdogz.supabase.co/storage/v1/object/public/casamento//grill.webp'
                        }, {
                            uuid: 'test2',
                            title: 'Teste',
                            price: 5000,
                            people_quantity: 2,
                            available: 1,
                            description: undefined,
                            image_url: 'https://usrwtizwuzeavrdjdogz.supabase.co/storage/v1/object/public/casamento//grill.webp'
                        }, {
                            uuid: 'test3',
                            title: 'Teste',
                            price: 250,
                            people_quantity: 1,
                            available: 0,
                            description: undefined,
                            image_url: 'https://usrwtizwuzeavrdjdogz.supabase.co/storage/v1/object/public/casamento//grill.webp'
                        }, {
                            uuid: 'test4',
                            title: 'Teste',
                            price: 250,
                            people_quantity: 5,
                            available: 1,
                            description: undefined,
                            image_url: 'https://usrwtizwuzeavrdjdogz.supabase.co/storage/v1/object/public/casamento//grill.webp'
                        }]}/>
                    </Content>
                </Layout>
            </CustomThemeProvider>
        </AntProvider>
    )
}

export default App
