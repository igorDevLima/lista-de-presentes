import {ConfigProvider} from "antd";
import theme from "../styles/theme.ts";

export const AntProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return <ConfigProvider
        theme={{
            token: theme.antd.token,
            components: theme.antd.components,
        }}
    >{children}</ConfigProvider>
}