// This is for defining the type of Method Which is mentioned in the receipt 
// for  proceessing payment so that it can be  passed to prompt so that it will analize
//  easily like which kind of method is used to make payment

export enum PaymentMethodEnum {
    CARD = "CARD",
    BANK_TRANSFER = "BANK_TRANSFER",
    MOBILE_PAYMENT = "MOBILE_PAYMENT",
    AUTO_DEBIT = "AUTO_DEBIT",
    CASH = "CASH",
    OTHER = "OTHER",
}

