import {Divider, Layout, Space, Typography} from "antd";
import {ProductList} from "./components/ProductList";
import {Content, Header,} from "antd/es/layout/layout";
import {Image} from "./components/Image";
import {GlobalStyles} from "./styles/global.ts";
import {CustomThemeProvider} from "./providers/ThemeProvider.tsx";
import {AntProvider} from "./providers/Ant.tsx";
import {useFetch} from "./hooks/useFetch.ts";
import type {Product} from "./types/Product.ts";
import {useEffect} from "react";
import type {ReservationResponse} from "./types/ReservationResponse.ts";

function App() {
    const {data, isLoading, fetchData} = useFetch<Product[]>();
    const {fetchData: fetchReservationData} = useFetch<ReservationResponse>();

    const fetchProducts = async () => await fetchData('https://usrwtizwuzeavrdjdogz.supabase.co/functions/v1/get-product')

    const reserveProduct = async (product: string, people_name: string) => await fetchReservationData('https://usrwtizwuzeavrdjdogz.supabase.co/functions/v1/create-reservation' + '?product_uuid=' + product, {
        method: 'POST',
        body: JSON.stringify({people_name})
    })


    useEffect(() => {
        fetchProducts()
    }, [])

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

                    <Content style={{padding: '20px'}}>
                        <Space direction="vertical" style={{width: '100%', textAlign: 'center'}}>
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
                                < br/>
                                Reserve o presente abaixo, ou caso prefira ou não consiga, mande mensagem para um dos
                                noivos.
                            </Typography.Text>
                        </Space>
                        <Divider/>
                        <ProductList loading={isLoading} products={data}
                                     onReserve={reserveProduct} fetchProducts={fetchProducts}/>
                    </Content>
                </Layout>
            </CustomThemeProvider>
        </AntProvider>
    )
}

export default App
