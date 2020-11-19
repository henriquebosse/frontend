export interface Product {
    // id?: number
    // name: string
    // price?: number
    id: number;
    sNomeProduto: string;
    sDescricaoProduto: String;
    iCodCategoria?: number;
    iCodFabricante?: number;
    iCodTipoProduto?: number;
    sCodAnvisa?: string;
    fPrecoVenda: number;
    fPrecoPromocional?: number;
    ibHabilitaPromocao?: number;
    ibNecessitaReceita?: number;
    sDescricaoBula?: string;    
}