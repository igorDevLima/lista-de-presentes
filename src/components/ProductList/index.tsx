import React, {Fragment} from 'react';
import {Flex} from 'antd';
import type {Product} from '../../types/Product';
import {ProductCard} from "./components/ProductCard.tsx";

interface ProductListProps {
    products: Product[];
    loading?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({products, loading = false}) => {
    return <Fragment>
        <Flex gap={20} align={'flex-start'} justify={'center'} wrap={'wrap'}>
            {products.map((product) => (
                <ProductCard product={product} key={'product-card-' + product.uuid} loading={loading}
                             onReserve={function (uuid: Product['uuid'], people_name: string): void {
                                 throw new Error('Function not implemented.');
                             }}/>
            ))
            }
        </Flex>
    </Fragment>

};