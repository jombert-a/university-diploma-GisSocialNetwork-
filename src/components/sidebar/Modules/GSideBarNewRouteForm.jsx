import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {SET_SELECTED_ROUTE} from "../../../store/reducers/routesReducer";
import {apiRoutes} from "../../../api/Routes";

const GSideBarNewRouteForm = props => {
    const dispatch = useDispatch();

    const [route, setRoute] = React.useState({
        way: {
            type: 'LineString',
            coordinates: []
        },
        title: '',
        previewDescription: '',
        description: '',
        categoryId: 2,
        private: false,
        price: 0,
        distance: null,
        ageLimit: '0',
        typeId: 1
    })
    const [selectedPoint, setSelectedPoint] = React.useState(0);
    const [coordinates, setCoordinates] = React.useState([[0, 0],[0, 0]]);

    const clickedCoords = useSelector(state => state.global.clickedCoordinates);

    const checkEmpty = React.useCallback(() => {
        let flag = true;
        coordinates.forEach(el => {
            if (el[0] === 0 || el[1] === 0) flag = false;
        })
        return flag
    }, [coordinates]);

    React.useEffect(
        () => {
            if (clickedCoords.lng && clickedCoords.lat) {
                let buff = [...coordinates];
                buff.splice(selectedPoint, 1, [clickedCoords.lng, clickedCoords.lat])
                setCoordinates(buff)
            }
            // eslint-disable-next-line
        }, [clickedCoords]
    )

    React.useEffect(
        () => {
            return function cleanup() {
                dispatch({type: SET_SELECTED_ROUTE, payload: []})
            }
        }, [dispatch]
    )

    const coordinatesDOM = React.useMemo(
        () => {
            if (checkEmpty()) {
                dispatch({type: SET_SELECTED_ROUTE, payload: coordinates});
            }

            function deletePoint(index) {
                let buff  = [...coordinates];
                buff.splice(index, 1);
                setCoordinates(buff);
                setSelectedPoint(0);
            }

            function setCoordsHandler (i, pos, value) {
                let buff = [...coordinates];
                pos === 0 ?
                    buff.splice(i, 1, [value, coordinates[i][1]])
                    :
                    buff.splice(i, 1, [coordinates[i][0], value])
                setCoordinates(buff);
            }

            return Array(coordinates.length).fill(0).map((el, index) => {
                return (
                    <div className={`g-side-bar-new-route__coords-picker ${index}`} key={index}>
                        <div className={`g-side-bar-new-route__point-control`}>
                            <span>Точка {index}</span>
                            <span
                                onClick={() => setSelectedPoint(index)}
                                className={`${selectedPoint === index ? 'g-side-bar-new-route__selected-point' : ''}`}>Выбрать на карте</span>
                            {
                                index > 1 &&
                                <span onClick={() => deletePoint(index)}>Удалить</span>
                            }
                        </div>
                        <div className={`g-side-bar-new-route__coords`}>
                            <label>
                                <p>Долгота</p>
                                <input type="number" value={coordinates[index][0]}
                                       onChange={(e) => setCoordsHandler(index, 0, +e.target.value)} className={'input input--100w'}/>
                            </label>
                            <label>
                                <p>Широта</p>
                                <input type="number" value={coordinates[index][1]}
                                       onChange={(e) => setCoordsHandler(index, 1, +e.target.value)} className={'input input--100w'}/>
                            </label>
                        </div>
                    </div>
                )
            })
        }, [coordinates, selectedPoint, dispatch, checkEmpty]
    )

    function newPoint(e) {
        e.preventDefault();
        setCoordinates([...coordinates, [0, 0]]);
        setSelectedPoint(coordinates.length);
    }

    function addRoute(e) {
        e.preventDefault();
        let postedObject = {...route}
        postedObject.way.coordinates = coordinates;
        if (route.title && route.description && checkEmpty()) {
            apiRoutes.postRoute(postedObject)
                .then ( response => {
                    setRoute(
                        {
                            way: {
                                type: 'LineString',
                                coordinates: []
                            },
                            title: '',
                            previewDescription: '',
                            description: '',
                            categoryId: 2,
                            private: false,
                            price: 0,
                            distance: null,
                            ageLimit: '0',
                            typeId: 1
                        }
                    );
                    setCoordinates([[0, 0], [0, 0]])
                    dispatch({type: SET_SELECTED_ROUTE, payload: [[0, 0], [0, 0]]});
                })
        }
    }

    return (
        <form>
            <label>
                <p>Название</p>
                <input className={'input'} value={route.title} onChange={(e) => setRoute({...route, title: e.target.value})} />
            </label>
            <label>
                <p>Описание</p>
                <input className={'input'} value={route.description} onChange={(e) => setRoute({...route, description: e.target.value})}/>
            </label>
            {coordinatesDOM}
            <button className={'button'} onClick={(e) => newPoint(e)}>Добавить точку</button>
            <button className={'button button--tab'} onClick={(e) => addRoute(e)}>Добавить маршрут</button>
        </form>
    )
}

export default GSideBarNewRouteForm;