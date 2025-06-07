export function currencyFormat(valor: string | number) {
    const value = Number(valor);

    if (isNaN(value)) {
        return "Valor inválido";
    }

    return value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
}