export const GetOrderStateText = (orderState) => {

    switch (parseInt(orderState)) {
        case 0: return "Создано";
        case 1: return "В обработке";
        case 2: return "Упаковано";
        case 3: return "Доставляется";
        case 4: return "Доставлен";
        case 5: return "Отменён";
        case 6: return "Спор";
        default: return "NOT FOUND";
    }
}

export const GetOrderProductState = (orderState) => {

    switch (parseInt(orderState)) {

        case 0: return "Создано";
        case 1: return "Создано";
        case 2: return "В обработке";
        case 3: return "Упаковано";
        case 4: return "Доставляется";
        case 5: return "Доставляется";
        case 6: return "Доставляется";
        case 7: return "Отменён";
        case 8: return "Отменён";
        case 9: return "Доставлен";
        default: return "NOT FOUND";
    }
}