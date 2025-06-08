// src/theme/theme.ts
import {colors} from "./colors.ts";

export const theme = {
    // Cores base
    colors,

    // Configurações específicas do Ant Design
    antd: {
        // Sobrescrevendo o tema padrão do Ant Design
        token: {
            colorPrimary: colors.lavender["500"],       // Cor primária (lavanda 500)
            colorInfo: '#1890ff',          // Cor para informações
            colorSuccess: '#52c41a',       // Cor para sucesso
            colorWarning: '#faad14',       // Cor para avisos
            colorError: '#ff4d4f',         // Cor para erros
            colorLink: '#722ed1',          // Cor para links
            colorTextBase: colors.gray['800'],      // Cor base para texto
            colorBgBase: '#ffffff',        // Cor base de fundo
            borderRadius: 6,               // Arredondamento de bordas
            colorTextHeading:'#9254de',
            colorTextDescription:colors.gray['800']
        },

        // Componentes específicos
        components: {
            Button: {
                colorPrimary: '#722ed1',
                colorPrimaryHover: '#9254de',
                colorPrimaryActive: '#531dab',
            },
            Card: {
                borderRadiusLG: 12,
            },
            Form: {
                labelColor: colors.gray['800'],
            },
        },
    },
};

// Tipagem para TypeScript
export type ThemeType = typeof theme;

// Exportando o padrão para styled-components
export default theme;