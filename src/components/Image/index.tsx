import {Image as AntdImage, type ImageProps as AntImageProps} from "antd";
import type {FC} from "react";

interface ImageProps extends AntImageProps {
}

export const Image: FC<ImageProps> = ({preview = false, ...rest}) => {
    return <AntdImage preview={preview} {...rest}/>
}