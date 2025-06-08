import React, {useState} from "react";
import {ProductFormItem, ReserveButton, StyledProductCard} from "./styles.ts";
import {Button, Card, Col, Drawer, Form, Input} from 'antd';
import type {Product} from '../../../types/Product';
import {currencyFormat} from "../../../utils/currencyFormat.ts";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {Image} from "../../Image";

interface ProductCardProps {
    product: Product;
    loading?: boolean;
    onReserve: (uuid: Product['uuid'], people_name: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({product, loading, onReserve}) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const screens = useBreakpoint();

    const [form] = Form.useForm();

    const drawerPlacement = screens.xs ? 'bottom' : 'right';

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleNameSubmit = async () => {
        await form.validateFields().then((value) => {
            onReserve(product.uuid, value.people_name)
            onClose();
        })
    };

    const isDisabled = product.available === 0;

    return (
        <Col span={8} style={{maxWidth: '300px'}} key={'product-' + product.uuid}>
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
                    description={currencyFormat(product.price)}
                />
            </StyledProductCard>
            <Drawer
                title="Confirmação de Reserva"
                placement={drawerPlacement}
                onClose={onClose}
                open={open}
                footer={
                    <div style={{textAlign: 'right'}}>
                        <Button onClick={onClose} style={{marginRight: 8}}>
                            Cancelar
                        </Button>
                        <Button onClick={handleNameSubmit} type="primary">
                            Confirmar
                        </Button>
                    </div>
                }
            >
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
                </Form>

            </Drawer>
        < /Col>
    )
}