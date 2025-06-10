import React, {useState} from "react";
import {
    CardContainer,
    ProductFormItem,
    ReserveButton, ResultStyled,
    StyledProductCard
} from "./styles.ts";
import {Button, Card, Drawer, Form, Input} from 'antd';
import type {Product} from '../../../types/Product';
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {Image} from "../../Image";
import type {ProductListProps} from "../index.tsx";
import {FlowerSpinner} from "../../Spinner";

interface ProductCardProps extends Pick<ProductListProps, 'onReserve' | 'fetchProducts'> {
    product: Product;
    loading?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({product, loading, onReserve, fetchProducts}) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [result, setResult] = useState<{
        title: string,
        subTitle: string,
        status: 'success' | 'error'
    } | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const screens = useBreakpoint();

    const [form] = Form.useForm();

    const drawerPlacement = screens.xs ? 'bottom' : 'right';

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setResult(undefined)
    };


    const handleNameSubmit = async () => {
        await form.validateFields().then(async (value) => {
            try {
                setIsLoading(true);
                const reserve = await onReserve(product.uuid, value.people_name)

                await fetchProducts()

                const subTitle = `Querido(a) ${reserve.people_name}, nosso coração está cheio de gratidão por você!\n
Muito obrigado por este gesto de carinho que guardaremos para sempre em nossos corações!\n
Com todo nosso amor,\nOs Noivos`;

                setResult({status: 'success', subTitle: subTitle, title: 'Reserva feita com sucesso!'});
            } catch (error) {
                setResult({status: 'error', subTitle: String(error), title: 'Não foi possível fazer sua reserva'})
            } finally {
                setIsLoading(false);
            }
        })
    };

    const isDisabled = !product.available;

    return (
        <CardContainer>
            <StyledProductCard
                loading={loading}
                hoverable={!loading && !isDisabled}
                $isDisabled={isDisabled}
                cover={

                    <Image
                        loading={'lazy'}
                        alt={product.title}
                        src={product.image_url}
                        height={200}

                    />
                }
                actions={[
                    <ReserveButton
                        type="primary"
                        onClick={showDrawer}
                        disabled={loading || isDisabled}>
                        {isDisabled ? 'Indisponível' : 'Reservar'}
                    </ReserveButton>
                ]}
            >
                <Card.Meta
                    title={product.title}
                />
            </StyledProductCard>
            <Drawer
                title="Confirmação de Reserva"
                placement={drawerPlacement}
                onClose={onClose}
                size={result ? 'large' : 'default'}
                open={open}
                {...(!result && {
                    footer:
                        <div style={{textAlign: 'right'}}>
                            <Button onClick={onClose} style={{marginRight: 8}}>
                                Cancelar
                            </Button>
                            <Button onClick={handleNameSubmit} type="primary">
                                Confirmar
                            </Button>
                        </div>
                })}

            >
                {result ?
                    <ResultStyled
                        {...result}
                        extra={[
                            <Button onClick={onClose} key="buy">Voltar</Button>,
                        ]}
                    />
                    : isLoading
                        ? (
                            <FlowerSpinner/>
                        )
                        :
                        <Form
                            form={form}
                            name="layout-multiple-horizontal"
                            layout="vertical"
                            labelCol={{span: 4}}
                            wrapperCol={{span: 20}}
                        >
                            <ProductFormItem label="Nome Completo" name="people_name"
                                             rules={[{required: true, message: 'Campo obrigatório'}]}>
                                <Input
                                    placeholder="Ex.: Fulano da Silva"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onPressEnter={handleNameSubmit}
                                />
                            </ProductFormItem>
                        </Form>}


            </Drawer>
        </CardContainer>
    )
}