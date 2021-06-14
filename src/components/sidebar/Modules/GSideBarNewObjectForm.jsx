import React from 'react'
import {apiClassifier} from "../../../api/Classifier";
import {apiGeocoding} from "../../../api/Geocoding";

//     way: {
//     type: "Point",
//     coordinates: [
//         55.46947237053552,
//         54.79270569121833
//     ]
// },
//     title: "Байрам",
//     previewDescription: "Продуктовый магазин",
//     description: "Продуктовый магазин байрам",
//     categoryId: 2,
//     private: false,
//     address: "Уфа",
//     price: 0,
//     typeId: 1

const GSideBarNewObjectForm = props => {

    const [categories, setCategories] = React.useState([]);
    const [categoriesDOM, setCategoriesDOM] = React.useState([]);
    const [address, setAddress] = React.useState('');

    React.useMemo(
        () => {
            if (categories.length > 0) {
                let array = categories.map(el => { return (
                    <option key={el.idCategoryClassifier} value={el.idCategoryClassifier}>
                        {el.classifierName}
                    </option>
                )})
                setCategoriesDOM(array);
            }
        }, [categories]
    )

    React.useEffect(
        () => {
            apiClassifier.getCategoryClassifiers()
                .then (result => setCategories(result));
        }, []
    )

    React.useEffect(
        () => {
            apiGeocoding.reverseFromCoordsToAdress(props.lng, props.lat)
                .then (result => setAddress(result.display_name));
        }, [props.lng, props.lat]
    )

    return (
        <form>
            <label>
                <p>Название</p>
                <input className={'input'}/>
            </label>
            <label>
                <p>Превью</p>
                <input className={'input'}/>
            </label>
            <label>
                <p>Описание</p>
                <input className={'input'}/>
            </label>
            <label>
                <p>Адрес</p>
                <input className={'input'} value={address}/>
            </label>
            <label>
                <p>Категория</p>
                <select>
                    {categoriesDOM}
                </select>
            </label>
        </form>
    )
}

export default GSideBarNewObjectForm;