import {LavenderSpin, LoadingContainer, LoadingText} from "./styles.ts";


export const FlowerSpinner = () => (
    <LoadingContainer>
        <LavenderSpin size="large"/>
        <LoadingText>Carregando...</LoadingText>
    </LoadingContainer>
);