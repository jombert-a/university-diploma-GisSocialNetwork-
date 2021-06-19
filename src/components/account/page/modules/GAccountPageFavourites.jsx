import React from 'react'
import style from '../style.module.css';
import {apiFavourites} from "../../../../api/Favourites";
import GAccountPageObjectFavs from "./GAccountPageObjectFavs";
import GAccountPageEventFavs from "./GAccountPageEventFavs";
import GAccountPagePlaceFavs from "./GAccountPagePlaceFavs";
import GAccountPageRouteFavs from "./GAccountPageRouteFavs";

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
            let pBuff = [];
            let eBuff = [];
            let rBuff = [];
            favourites.forEach(fav => {
                switch (fav.typeId) {
                    case 1:
                        oBuff.push(fav.entityId)
                        break
                    case 2:
                        pBuff.push(fav.entityId)
                        break
                    case 3:
                        eBuff.push(fav.entityId)
                        break
                    case 4:
                        rBuff.push(fav.entityId)
                        break
                    default:
                        break
                }
            })
            setObjectFavs(oBuff);
            setPlaceFavs(pBuff);
            setEventFavs(eBuff);
            setRouteFavs(rBuff);
        }, [favourites]
    )

    return (
        <div className={style.favourites}>
            {
                objectFavs.length > 0 &&
                <>
                    <h4>Объекты</h4>
                    <GAccountPageObjectFavs ids={objectFavs} />
                </>
            }
            {
                placeFavs.length > 0 &&
                <>
                    <h4>Места</h4>
                    <GAccountPagePlaceFavs ids={placeFavs} />
                </>
            }
            {
                eventFavs.length > 0 &&
                <>
                    <h4>События</h4>
                    <GAccountPageEventFavs ids={eventFavs} />
                </>
            }
            {
                routeFavs.length > 0 &&
                <>
                    <h4>Маршруты</h4>
                    <GAccountPageRouteFavs ids={routeFavs} />
                </>
            }
        </div>
    )
}

export default GAccountPageFavourites;