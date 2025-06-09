import React, {useState} from "react";
import {
    AvailabilityText,
    CardContainer, PeopleQuantityTag,
    ProductFormItem, QuantityIndicator,
    ReserveButton, ResultStyled,
    StyledProductCard
} from "./styles.ts";
import {Button, Card, Col, Drawer, Form, Input, Result, Tooltip} from 'antd';
import type {Product} from '../../../types/Product';
import {currencyFormat} from "../../../utils/currencyFormat.ts";
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
${reserve.others.length > 0
                    ? `Este presente é um símbolo do amor que vocês, nossos amados padrinhos, têm por nós. Por favor, entre em contato com ${reserve.others.join(', ')} para combinarmos os detalhes. Se precisar de ajuda para entrar em contato com eles, é só nos avisar - ficaremos felizes em ajudar!`
                    : 'Muito obrigado por este gesto de carinho que guardaremos para sempre em nossos corações!'}\n
Com todo nosso amor,\nOs Noivos`;

                setResult({status: 'success', subTitle: subTitle, title: 'Reserva feita com sucesso!'});
            } catch (error) {
                setResult({status: 'error', subTitle: String(error), title: 'Não foi possível fazer sua reserva'})
            } finally {
                setIsLoading(false);
            }
        })
    };

    const isDisabled = product.available === 0;

    const showAvailability = product.people_quantity > 1;
    const isLowAvailability = showAvailability && product.available <= 1;

    return (
        <CardContainer>
            {showAvailability && (
                <PeopleQuantityTag>
                    {product.people_quantity} {product.people_quantity > 1 ? 'pessoas' : 'pessoa'}
                </PeopleQuantityTag>
            )}
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
                    description={<>
                        {currencyFormat(product.price / product.people_quantity)}
                        {showAvailability && (
                            <QuantityIndicator>
                                <span>Disponível: </span>
                                <AvailabilityText $isLow={isLowAvailability}>
                                    {product.available} pessoa{product.available !== 1 ? 's' : ''}
                                </AvailabilityText>
                            </QuantityIndicator>
                        )}
                    </>}
                />
            </StyledProductCard>
            <Drawer
                title="Confirmação de Reserva"
                placement={drawerPlacement}
                onClose={onClose}
                size={'large'}
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