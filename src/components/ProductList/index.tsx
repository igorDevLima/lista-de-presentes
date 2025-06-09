import React, {Fragment} from 'react';
import {Flex} from 'antd';
import type {Product} from '../../types/Product';
import {ProductCard} from "./components/ProductCard.tsx";
import type {ReservationResponse} from '../../types/ReservationResponse.ts';
import Title from "antd/lib/typography/Title";

export interface ProductListProps {
    products: Product[] | null;
    loading?: boolean;
    onReserve: (uuid: Product['uuid'], people_name: string) => Promise<ReservationResponse>;
    fetchProducts: () => Promise<Product[]>;
}

export const ProductList: React.FC<ProductListProps> = ({products, loading = false, onReserve, fetchProducts}) => {
    return <Fragment>
        <Flex gap={30} align={'flex-start'} justify={'center'} wrap={'wrap'}>
            {!products && !loading ? <Title>Sem dados</Title> : products?.map((product) => (
                <ProductCard product={product} key={'product-card-' + product.uuid} fetchProducts={fetchProducts}
                             loading={loading}
                             onReserve={onReserve}/>
            ))
            }
        </Flex>
    </Fragment>

};
