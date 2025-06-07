import React, {useState} from "react";
import {CardStyled} from "./styles.ts";
import {Button, Card, Col, Drawer, Form, Input} from 'antd';
import type {Product} from '../../../types/Product';
import {currencyFormat} from "../../../utils/currencyFormat.ts";
import {ImageWithSkeleton} from "../../ImageWithSkeleton";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

interface ProductCardProps {
    product: Product;
    loading?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({product, loading}) => {
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
        await form.validateFields().then(() => {
            console.log(`Nome da pessoa: ${name}`);
            onClose();
        })
    };

    return (
        <Col span={8} style={{maxWidth: '300px'}} key={'product-' + product.uuid}>
            <CardStyled
                loading={loading}
                style={{width: 240, cursor: 'initial'}}
                hoverable={!loading}
                cover={<ImageWithSkeleton alt={product.title} src={product.image_url}
                />}
                actions={[
                    <Button type="primary" onClick={showDrawer}>
                        Reservar
                    </Button>
                ]}
            >
                <Card.Meta title={product.title}
                           description={currencyFormat(product.price)
                           }
                />
            < /CardStyled>
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
                    <Form.Item label="Nome Completo" name="people_name" rules={[{required: true, message: 'Campo obrigatório'}]}>
                        <Input
                            placeholder="Ex.: Fulano da Silva"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onPressEnter={handleNameSubmit}
                        />
                    </Form.Item>
                </Form>

            </Drawer>
        < /Col>
    )
}