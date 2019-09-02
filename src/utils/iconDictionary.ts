import {cash, barcode, basket, beer, book, bus, cafe, car, film, nutrition, pizza, shirt, train, trophy, wine, iceCream, airplane, restaurant} from 'ionicons/icons';

const icons: any = {
    "Cafe": cafe,
    "Cash": cash,
    "Train": train,
    "Beer": beer,
    "Barcode": barcode,
    "Basket": basket,
    "Book": book,
    "Bus": bus,
    "Car": car,
    "Film": film,
    "Ice Cream": iceCream,
    "Nutrition": nutrition,
    "Pizza": pizza,
    "Plane": airplane,
    "Resturant": restaurant,
    "Clothes": shirt,
    "Trophy": trophy,
    "Wine": wine
}

export function getIcon(name: string) {
    return icons[name]
}

export function getIconList() {
    return Object.keys(icons)
}