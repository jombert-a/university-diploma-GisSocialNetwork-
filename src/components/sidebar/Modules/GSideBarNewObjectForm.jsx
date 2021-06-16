import React from 'react'
import Select from 'react-select'
import {apiClassifier} from "../../../api/Classifier";
import {apiGeocoding} from "../../../api/Geocoding";
import {apiObjects} from "../../../api/Objects";

const GSideBarNewObjectForm = props => {

    const [categories, setCategories] = React.useState([]);
    const [categoriesDOM, setCategoriesDOM] = React.useState([]);

    const [object, setObject] = React.useState({});
    const [address, setAddress] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [preview, setPreview] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [categoryId, setCategoryId] = React.useState({
        label: "",
        value: null
    });

    React.useMemo(
        () => {
            if (categories.length > 0) {
                let array = categories.map(el =>  ({
                    value: el.idCategoryClassifier,
                    label: el.classifierName
                }))
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
            if (props.lng && props.lat)
                apiGeocoding.reverseFromCoordsToAdress(props.lng, props.lat)
                    .then (result => setAddress(result.display_name));
        }, [props.lng, props.lat]
    )

    React.useEffect(
        () => {
            if (Object.keys(object).length > 0) {
                apiObjects.postObject(object);
                setTitle('');
                setPreview('');
                setDesc('');
                setCategoryId({label: "", value: null});
            }
        }, [object]
    )

    function formSubmit(e) {
        e.preventDefault();
        setObject({
            way: {
                type: "Point",
                coordinates: [
                    props.lng,
                    props.lat
                ]
            },
            title: title,
            previewDescription: preview,
            description: desc,
            categoryId: categoryId.value,
            private: false,
            address: address,
            price: 0,
            typeId: 1
        })
    }

    return (
        <form>
            <label>
                <p>Название</p>
                <input className={'input'} value={title} onChange={(e) => setTitle(e.target.value)}/>
            </label>
            <label>
                <p>Превью</p>
                <input className={'input'} value={preview} onChange={(e) => setPreview(e.target.value)}/>
            </label>
            <label>
                <p>Описание</p>
                <input className={'input'} value={desc} onChange={(e) => setDesc(e.target.value)}/>
            </label>
            <label>
                <p>Адрес</p>
                <input className={'input'} defaultValue={address}/>
            </label>
            <label>
                <p>Категория</p>
                <Select options={categoriesDOM} value={categoryId} onChange={(e) => setCategoryId(e)}/>
            </label>
            <button className={'button'} onClick={(e) => formSubmit(e)}>Создать</button>
        </form>
    )
}

export default GSideBarNewObjectForm;