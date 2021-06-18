import React from 'react'
import style from '../style.module.css';
import {apiFavourites} from "../../../../api/Favourites";
import GAccountObjectFavs from "./GAccountObjectFavs";

const GAccountPageFavourites = props => {
    const [favourites, setFavourites] = React.useState([]);
    const [objectFavs, setObjectFavs] = React.useState([]);
    const [placeFavs, setPlaceFavs] = React.useState([]);
    const [eventFavs, setEventFavs] = React.useState([]);
    const [routeFavs, setRouteFavs] = React.useState([]);


    React.useEffect(
        () => {
            apiFavourites.getFavourites()
                .then(result => setFavourites(result));
        }, []
    )

    React.useMemo(
        () => {
            let oBuff = []; // pbuff, ebuff, rbuff = [];
            favourites.forEach(fav => {
                switch (fav.typeId) {
                    case 1:
                        oBuff.push(fav.entityId)
                        break
                    default:
                        oBuff.push(fav.entityId)
                }
            })
            setObjectFavs(oBuff);
            setPlaceFavs(oBuff);
            setEventFavs(oBuff);
            setRouteFavs(oBuff);
        }, [favourites]
    )

    return (
        <div className={style.favourites}>
            {
                objectFavs.length > 0 &&
                <GAccountObjectFavs ids={objectFavs} />
            }
            {placeFavs}
            {eventFavs}
            {routeFavs}
        </div>
    )
}

export default GAccountPageFavourites;