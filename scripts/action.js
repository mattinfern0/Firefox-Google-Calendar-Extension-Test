function getMaxDay(month){
    if (month === 2){
        return 28
    } else if ((month % 2) != 0){
        return 30
    } else {
        return 31
    }
}