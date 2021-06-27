import React from 'react'
import {apiGeocoding} from "../../../api/Geocoding";
import {apiPlaces} from "../../../api/Places";


const GSideBarNewPlaceForm = props => {
    const [defaultState] = React.useState({
        way: {
            type: 'Point',
            coordinates: [props.lng, props.lat]
        },
        title: 'Default Title',
        previewDescription: 'Default Preview Description',
        description: 'Default Description',
        categoryId: 2,
        private: false,
        address: 'Default Address',
        typeId: props.typeId
    })

    const [place, setPlace] = React.useState(defaultState);

    React.useEffect(
        () => {
            if (props.lng && props.lat) {
                apiGeocoding.reverseFromCoordsToAdress(props.lng, props.lat)
                    .then (result => setPlace((place) => ({...place, address: result.display_name})));
                setPlace((place) => ({
                    ...place,
                    way: {
                        type: 'Point',
                        coordinates: [props.lng, props.lat]
                    }
                }))
            }
        }, [props.lng, props.lat]
    )

    React.useEffect(
        () => {
        }, [place]
    )

    function updateHandler(prop, value) {
        let tempObj = JSON.parse(JSON.stringify(place));
        tempObj[`${prop}`] = value;
        setPlace(tempObj);
    }

    function formSubmit (e) {
        e.preventDefault();
        apiPlaces.addNewPlace(place);
        setPlace(defaultState);
    }

    return (
        <form>
            <label>
                <p>Название</p>
                <input className={'input'} value={place.title} onChange={(e) => updateHandler('title', e.target.value)}/>
            </label>
            <label>
                <p>Превью</p>
                <input className={'input'} value={place.previewDescription} onChange={(e) => updateHandler('previewDescription', e.target.value)}/>
            </label>
            <label>
                <p>Описание</p>
                <input className={'input'} value={place.description} onChange={(e) => updateHandler('description', e.target.value)}/>
            </label>
            <label>
                <p>Адрес</p>
                <input className={'input'} value={place.address} readOnly={true}/>
            </label>
            <button className={'button'} onClick={(e) => formSubmit(e)}>Создать</button>
        </form>
    )
}

export default GSideBarNewPlaceForm;